import PermissionInput from '../../components/common/editor_inputs/inputs/PermissionInput/PermissionInput';
import TextInput from '../../components/common/editor_inputs/inputs/TextInput';
import FieldInput from '../../components/common/editor_inputs/inputs/FieldInput';
import TextArea from '../../components/common/editor_inputs/inputs/TextArea';
import FileInput from '../../components/common/editor_inputs/inputs/FileInput';
import ColorPicker from '../../components/common/editor_inputs/inputs/ColorPicker/ColorPicker';
import FooterInput from '../../components/common/editor_inputs/inputs/FooterInput';
import CommandInput from '../../components/common/editor_inputs/inputs/CommandInput';
import TextChannelInput from '../../components/common/editor_inputs/inputs/TextChannelInput/TextChannelInput';
import AutoRole from '../../components/common/editor_inputs/inputs/AutoRole/AutoRole';
import IntervalInput from '../../components/common/editor_inputs/inputs/IntervalInput/IntervalInput';
import ReactionRoles from '../../components/common/editor_inputs/inputs/ReactionRoles';
import TagInput from '../../components/common/editor_inputs/inputs/TagInput';
import RedditInput from '../../components/common/editor_inputs/inputs/RedditInput';

export const COMMAND_FIELD = {
    name: 'commandName',
    hideDescriptionForInput: true,
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: CommandInput,
    formDataHandler: (currentValue) => [['invocation', currentValue]],
};

export const COMMAND_PREFIX_FIELD = {
    name: 'commandPrefix',
    hideDescriptionForInput: true,
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: CommandInput,
    formDataHandler: (currentValue) => [['prefix', currentValue]],
};

export const SERVER_WELCOME_CHANNEL_FIELD = {
    name: 'channel',
    description: 'Server welcome channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const AUTO_ROLE_FIELD = {
    name: 'role',
    description: 'Auto-role',
    input: AutoRole,
    formDataHandler: (currentValues) => {
        if (currentValues.length === 0) {
            return [];
        }

        return [['roles', currentValues.map((x) => x.id)]];
    },
};

export const AUTO_ROLE_ACTION_FIELD = {
    name: 'roleAction',
    formDataHandler: (currentValue) => [['role_action', currentValue]],
};

export const SETTINGS_FIELD = {
    name: 'settings',
    description: 'Command Settings',
    alwaysDisplayInEditArea: true,
};

export const DELETE_COMMAND_USAGE_FIELD = {
    name: 'deleteCommandUsage',
    description: 'Delete Usage',
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValues) => {
        if (currentValues.deleteCommandUsage) {
            return [
                ['delete_command_usage', currentValues.deleteCommandUsage],
                ['delete_usage_period_count', currentValues.dcuPeriodCount || 0],
                ['delete_usage_period', currentValues.dcuPeriod || 'seconds'],
            ];
        }
        return [
            ['delete_command_usage', currentValues.deleteCommandUsage],
        ];
    },
};

export const DELETE_COMMAND_RESPONSE_FIELD = {
    name: 'deleteCommandResponse',
    description: 'Delete Response',
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValues) => {
        if (currentValues.deleteCommandResponse) {
            return [
                ['delete_command_response', currentValues.deleteCommandResponse],
                ['delete_response_period_count', currentValues.dcrPeriodCount || 0],
                ['delete_response_period', currentValues.dcrPeriod || 'seconds'],
            ];
        }
        return [
            ['delete_command_response', currentValues.deleteCommandResponse],
        ];
    },
};

export const RESPONSE_CHANNEL_FIELD = {
    name: 'responseChannel',
    description: 'Response Channel',
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValues) => [['response_channel', currentValues.id]],
};

export const TIMED_CHANNEL_FIELD = {
    name: 'timedChannel',
    description: 'Channel',
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValue) => [['timed_channel', currentValue.id]],
};

export const DISPLAY_HELP_FIELD = {
    name: 'displayHelp',
    description: 'Display in help',
    alwaysDisplayInEditArea: true,
    options: [
        {
            id: 1,
            name: 'Do not show',
        },
        {
            id: 2,
            name: 'Do show',
        },
    ],
    formDataHandler: (currentValues) => [['display_help', currentValues.id]],
};

export const COOLDOWN_FIELD = {
    name: 'cooldown',
    description: 'Cooldown',
    options: [
        {
            id: 1,
            name: 'No Cooldown',
        },
        {
            id: 2,
            name: 'User Cooldown',
        },
        {
            id: 3,
            name: 'Server Cooldown',
        },
    ],
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValues) => {
        if (currentValues.cooldown.id === 1) {
            return [['cooldown', currentValues.cooldown.id]];
        }
        return [
            ['cooldown', currentValues.cooldown.id],
            ['cooldown_period_count', currentValues.periodCount || 0],
            ['cooldown_period', currentValues.period || 'seconds'],
        ];
    },
};

export const BANNED_CHANNEL_FIELD = {
    name: 'bannedChannel',
    description: 'Banned Channel',
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValues) => [['banned_channel', currentValues.map((x) => x.id)]],
};

export const MESSAGE_TYPE_FIELD = {
    name: 'messageType',
    description: 'Message Type',
    alwaysDisplayInEditArea: true,
    formDataHandler: (currentValues) => [['message_type', currentValues]],
};

export const SERVER_GOODBYE_CHANNEL_FIELD = {
    name: 'channel',
    description: 'Server goodbye channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const TIMED_MESSAGE_NAME = {
    name: 'messageName',
    description: 'Message name',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextInput,
    formDataHandler: (currentValue) => [['message_name', currentValue]],
};

export const RANDOM_TIMED_MESSAGE_CHANNEL = {
    name: 'channel',
    description: 'Random timer channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const SINGLE_TIMED_MESSAGE_CHANNEL = {
    name: 'channel',
    description: 'Single timer channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const REACTION_ROLES = {
    name: 'reactionRoles',
    description: 'Reaction',
    input: ReactionRoles,
    formDataHandler: (currentValue) => {
        const out = [['roles', currentValue.roles?.map((x) => x.id)]];
        if (currentValue.reaction) {
            Object.keys(currentValue.reaction).forEach((key) => {
                if (currentValue.reaction[key] && typeof currentValue.reaction[key] !== 'object') {
                    out.push([`reaction[${key}]`, currentValue.reaction[key]]);
                }
            });
        }

        return out;
    },
};

export const REACTION_ROLE_NAME = {
    name: 'reactionRoleName',
    description: 'Reaction role name',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextInput,
    formDataHandler: (currentValue) => [['role_name', currentValue]],
};

export const ADD_ROLE_CHANNEL = {
    name: 'channel',
    description: 'Add role channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const REMOVE_ROLE_CHANNEL = {
    name: 'channel',
    description: 'Remove role channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const CHANNEL = {
    name: 'channel',
    description: 'channel',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextChannelInput,
    formDataHandler: (currentValue) => [['channel_id', currentValue.id]],
};

export const TIKTOK = {
    name: 'tiktok',
    description: 'tiktok',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TagInput,
    formDataHandler: (currentValue) => [['tiktok', currentValue]],
};

export const TWITTER = {
    name: 'twitter',
    description: 'twitter',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TagInput,
    formDataHandler: (currentValue) => [['twitter', currentValue]],
};

export const TWITCH = {
    name: 'twitch',
    description: 'twitch',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextInput,
    formDataHandler: (currentValue) => [['twitch', currentValue]],
};

export const YOUTUBE = {
    name: 'youtube',
    description: 'youtube',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: TextInput,
    formDataHandler: (currentValue) => [['youtube', currentValue]],
};

export const REDDIT = {
    name: 'reddit',
    description: 'reddit',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: RedditInput,
    formDataHandler: (currentValue) => [['reddit', currentValue]],
};

export const INTERVAL_FIELD = {
    name: 'interval',
    description: 'Interval',
    ignoreInElementOverview: true,
    alwaysDisplayInEditArea: true,
    input: IntervalInput,
    formDataHandler: (currentValue) => [['interval', currentValue]],
};

export const PERMISSION_FIELD = {
    name: 'permissions',
    description: 'permissions',
    hideDescriptionForInput: true,
    input: PermissionInput,
    formDataHandler: (currentValue) => {
        const out = [];
        if (currentValue.banned) {
            out.push(['banned_roles', currentValue.banned.map((x) => x.id)]);
        }
        if (currentValue.allowed) {
            out.push(['allowed_roles', currentValue.allowed.map((x) => x.id)]);
        }

        return out;
    },
};

export const PLAIN_TEXT_FIELD = {
    name: 'plainText',
    description: 'plain text',
    infoText: '{user.mention}, {user.id}, {user.roles}, and {guild} (supports markdown)',
    input: TextArea,
    formDataHandler: (currentValue) => [['plain_text', currentValue]],
};

export const TITLE_FIELD = {
    name: 'title',
    description: 'title',
    input: TextInput,
    formDataHandler: (currentValue) => [['title', currentValue]],
};

export const BODY_FIELD = {
    name: 'body',
    description: 'body',
    infoText: '{user.mention}, {user.id}, {user.roles}, and {guild} (supports markdown)',
    input: TextArea,
    formDataHandler: (currentValue) => [['description', currentValue]],
};

export const FIELD_FIELD = {
    name: 'field',
    description: 'field',
    hideDescriptionForInput: true,
    alwaysDisplayInEditArea: true,
    input: FieldInput,
    formDataHandler: (fields) => {
        const out = [];
        fields.forEach((field, i) => {
            out.push([`fields][${i}][name`, field.title]);
            out.push([`fields][${i}][value`, field.value]);
            out.push([`fields][${i}][inline`, field.inline]);
        });

        return out;
    },
};

export const THUMBNAIL_FIELD = {
    name: 'thumbnail',
    description: 'thumbnail',
    input: FileInput,
    formDataHandler: (currentValue) => {
        if (currentValue instanceof FormData) {
            return [['thumbnail', currentValue.get('image')]];
        }

        return [];
    },
};

export const TITLE_IMAGE_FIELD = {
    name: 'titleImage',
    description: 'title image',
    input: FileInput,
    formDataHandler: (currentValue) => {
        if (currentValue instanceof FormData) {
            return [['author', currentValue.get('image')]];
        }

        return [];
    },
};

export const BODY_IMAGE_FIELD = {
    name: 'bodyImage',
    description: 'body image',
    input: FileInput,
    formDataHandler: (currentValue) => {
        if (currentValue instanceof FormData) {
            return [['image', currentValue.get('image')]];
        }

        return [];
    },
};

export const FOOTER_FIELD = {
    name: 'footer',
    description: 'footer',
    hideDescriptionForInput: true,
    input: FooterInput,
    formDataHandler: (currentValue) => {
        if (currentValue instanceof FormData) {
            return [
                ['footer_text', currentValue.get('text')],
                ['footer_image', currentValue.get('image')],
            ];
        }

        return [];
    },
};

export const COLOR_FIELD = {
    name: 'color',
    description: 'color',
    input: ColorPicker,
    formDataHandler: (currentValue) => [['color', currentValue]],
};

export const DEFAULT_EMBED_FIELDS = [
    PLAIN_TEXT_FIELD,
    TITLE_FIELD,
    BODY_FIELD,
    FIELD_FIELD,
    THUMBNAIL_FIELD,
    TITLE_IMAGE_FIELD,
    BODY_IMAGE_FIELD,
    FOOTER_FIELD,
    COLOR_FIELD,
];
