import {
    ADD_ROLE_CHANNEL,
    DEFAULT_EMBED_FIELDS,
    REACTION_ROLE_NAME,
    REACTION_ROLES,
    REMOVE_ROLE_CHANNEL,
} from '../utils/configs/fieldConfigs';
import { reactionRoleFormHandler } from '../utils/FormHandler/FormHandler';
import { transformCommand } from '../utils/BackendTransformer/Transformer';

const ADD_ROLES_CONFIG = {
    type: 'add',
    supportsMultiple: false,
    extraFields: [ADD_ROLE_CHANNEL],
};

const REMOVE_ROLES_CONFIG = {
    type: 'remove',
    supportsMultiple: false,
    extraFields: [REMOVE_ROLE_CHANNEL],
};

const fieldConfig = [REACTION_ROLES, ...DEFAULT_EMBED_FIELDS];

export const REACTION_ROLES_EDITOR_CONFIG = {
    fields: fieldConfig,
    fieldHandler: (editorConfig) => [REACTION_ROLE_NAME, ...(editorConfig?.fields || []), ...fieldConfig],
    fieldsToKeepInSync: [REACTION_ROLE_NAME],
    validators: [],
    formHandler: reactionRoleFormHandler,
    editorSelections: [
        {
            config: ADD_ROLES_CONFIG,
            title: 'Add role',
        },
        {
            config: REMOVE_ROLES_CONFIG,
            title: 'Remove role',
        },
    ],
    transformerCallback: transformCommand,
    formFieldToPopulateWithData: 'reactionRole',
};
