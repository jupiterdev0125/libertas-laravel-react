import ReactDOM from 'react-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { TIMED_MESSAGE_EDITOR_CONFIG } from './TimedMessageConfig';
import {
    transformCommand,
    transformMessage,
    transformReddit,
    transformTiktok,
    transformTimedMessage,
    transformTwitch,
    transformTwitter,
    transformYoutube,
} from '../utils/BackendTransformer/Transformer';
import { REACTION_ROLES_EDITOR_CONFIG } from './ReactionRolesConfig';
import { CUSTOM_COMMANDS_EDITOR_CONFIG } from './CustomCommandsConfig';
import { DEFAULT_EMBED_FIELDS } from '../utils/configs/fieldConfigs';
import { welcomeGoodbyeFormHandler } from '../utils/FormHandler/FormHandler';
import { getBaseConfigFromElement } from './Config';
import LoadingIndicator from '../components/common/LoadingIndicator/LoadingIndicator';
import BasePageLayout from './BasePageLayout/BasePageLayout';
import { YOUTUBE_EDITOR_CONFIG } from './YoutubeConfig';
import { REDDIT_EDITOR_CONFIG } from './RedditConfig';
import { TWITTER_EDITOR_CONFIG } from './TwitterConfig';
import { TWITCH_EDITOR_CONFIG } from './TwitchConfig';
import { TIKTOK_EDITOR_CONFIG } from './TiktokConfig';
import TimedMessagePage from './TimedMessage/TimedMessagePage'
import ModerationPage from './Moderation/ModerationPage';
import GreetingPage from './Greeting/GreetingPage';
import CustomCommandsPage from './CustomCommands/CustomCommandsPage';
import ConfigContext from '../context/ConfigContext';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const REACTION_ROLES = {
    id: 'reaction-roles-page',
    type: 'reaction-roles',
    title: 'Reaction roles',
    entryName: 'reactionRoles',
    editorConfig: REACTION_ROLES_EDITOR_CONFIG,
    responseListTransformer: (x) => x,
};

const TIMED_MESSAGES = {
    id: 'timed-messages-page',
    type: 'timed-messages',
    title: 'Timed messages',
    entryName: 'timer',
    editorConfig: TIMED_MESSAGE_EDITOR_CONFIG,
    component: TimedMessagePage,
    responseListTransformer: transformTimedMessage,
};

const CUSTOM_COMMANDS = {
    id: 'custom-commands-page',
    type: 'custom-commands',
    title: 'Custom commands',
    entryName: 'command',
    editorConfig: CUSTOM_COMMANDS_EDITOR_CONFIG,
    component: CustomCommandsPage,
    responseListTransformer: transformCommand,
};

const GREETING = {
    id: 'greeting-page',
    type: 'greeting',
    pluginName: 'welcome-goodbye',
    editorConfig: {
        fields: DEFAULT_EMBED_FIELDS,
        formHandler: welcomeGoodbyeFormHandler,
    },
    responseListTransformer: transformMessage,
    component: GreetingPage,
    componentPropListName: 'messages',
};

const MODERATION = {
    id: 'moderation-page',
    type: 'moderation',
    editorConfig: {},
    responseListTransformer: (x) => x,
    component: ModerationPage,
    componentPropListName: '',
};

const REDDIT = {
    id: 'reddit-page',
    type: 'reddit',
    title: 'Reddit',
    entryName: 'reddit',
    editorConfig: REDDIT_EDITOR_CONFIG,
    responseListTransformer: transformReddit,
};

const YOUTUBE = {
    id: 'youtube-page',
    type: 'youtube',
    title: 'Youtube',
    entryName: 'youtube',
    editorConfig: YOUTUBE_EDITOR_CONFIG,
    responseListTransformer: transformYoutube,
};

const TWITTER = {
    id: 'twitter-page',
    type: 'twitter',
    title: 'Twitter',
    entryName: 'twitter',
    editorConfig: TWITTER_EDITOR_CONFIG,
    responseListTransformer: transformTwitter,
};

const TWITCH = {
    id: 'twitch-page',
    type: 'twitch',
    title: 'Twitch',
    entryName: 'twitch',
    editorConfig: TWITCH_EDITOR_CONFIG,
    responseListTransformer: transformTwitch,
};

const TIKTOK = {
    id: 'tiktok-page',
    type: 'tiktok',
    title: 'TikTok',
    entryName: 'tiktok',
    editorConfig: TIKTOK_EDITOR_CONFIG,
    responseListTransformer: transformTiktok,
};

[
    REACTION_ROLES,
    TIMED_MESSAGES,
    CUSTOM_COMMANDS,
    GREETING,
    REDDIT,
    YOUTUBE,
    TWITCH,
    TWITTER,
    TIKTOK,
    MODERATION,
].forEach((pageConfig) => {
    const element = document.getElementById(pageConfig.id);
    if (element) {
        const editorConfig = {
            ...getBaseConfigFromElement(element),
            ...pageConfig.editorConfig,
        };

        ReactDOM.render(<LoadingIndicator isLoaded={false} />, element);

        const pluginName = pageConfig.pluginName || pageConfig.type;

        axios.get(`/api/plugins/${element.dataset.guild_id}/${pluginName}`).then((response) => {
            if (Array.isArray(response.data)) {
                const props = {
                    config: editorConfig,
                    entries: response.data.map(pageConfig.responseListTransformer),
                    entryTypeName: pageConfig.entryName,
                };
                if (!pageConfig.component) {
                    props.pageType = pageConfig.type;
                    props.pageTitle = pageConfig.title;
                    pageConfig.component = BasePageLayout;
                } else {
                    props[pageConfig.componentPropListName] = response.data.map(pageConfig.responseListTransformer);
                }
                ReactDOM.render(
                    <ConfigContext.Provider value={{ config: editorConfig }}>
                        <pageConfig.component {...props} />
                        <ToastContainer />
                    </ConfigContext.Provider>,
                    element,
                );
            } else {
                console.log(`${pageConfig.type} list is not an array: `, response.data);
            }
        });
    }
});
