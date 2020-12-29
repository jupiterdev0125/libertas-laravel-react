import {
    AUTO_ROLE_FIELD,
    AUTO_ROLE_ACTION_FIELD,
    COMMAND_FIELD,
    DEFAULT_EMBED_FIELDS,
    PERMISSION_FIELD,
    MESSAGE_TYPE_FIELD,
    BANNED_CHANNEL_FIELD,
    COOLDOWN_FIELD,
    DISPLAY_HELP_FIELD,
    RESPONSE_CHANNEL_FIELD,
    DELETE_COMMAND_RESPONSE_FIELD,
    DELETE_COMMAND_USAGE_FIELD,
    COMMAND_PREFIX_FIELD,
} from '../utils/configs/fieldConfigs';

export const SINGLE_COMMAND_CONFIG = {
    type: 'single',
    supportsMultiple: false,
};

export const RANDOM_COMMAND_CONFIG = {
    type: 'random',
    supportsMultiple: true,
};

export const FLIPBOOK_COMMAND_CONFIG = {
    type: 'flipbook',
    supportsMultiple: true,
};

const fieldConfig = [...DEFAULT_EMBED_FIELDS];
const staticFieldConfig = [
    COMMAND_FIELD,
    COMMAND_PREFIX_FIELD,
    PERMISSION_FIELD,
    AUTO_ROLE_FIELD,
    AUTO_ROLE_ACTION_FIELD,
    MESSAGE_TYPE_FIELD,
    BANNED_CHANNEL_FIELD,
    COOLDOWN_FIELD,
    DISPLAY_HELP_FIELD,
    RESPONSE_CHANNEL_FIELD,
    DELETE_COMMAND_RESPONSE_FIELD,
    DELETE_COMMAND_USAGE_FIELD,
    {
        name: 'commandId',
    },
];

export const CUSTOM_COMMANDS_EDITOR_CONFIG = {
    fields: fieldConfig,
    staticFields: staticFieldConfig,
    fieldsToKeepInSync: [
        // {
        //     name: 'commandId',
        // },
    ],
    editorSelections: [
        {
            config: SINGLE_COMMAND_CONFIG,
            title: 'Single response',
        },
        {
            config: RANDOM_COMMAND_CONFIG,
            title: 'Random response',
        },
        {
            config: FLIPBOOK_COMMAND_CONFIG,
            title: 'Flipbook response',
        },
    ],
    roles: [],
    formFieldToPopulateWithData: 'command',
};
