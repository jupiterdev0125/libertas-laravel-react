import {
    DEFAULT_EMBED_FIELDS,
    INTERVAL_FIELD,
    RANDOM_TIMED_MESSAGE_CHANNEL,
    SINGLE_TIMED_MESSAGE_CHANNEL,
    TIMED_MESSAGE_NAME,
} from '../utils/configs/fieldConfigs';
import { timedMessageFormHandler } from '../utils/FormHandler/FormHandler';
import { transformTimedMessage } from '../utils/BackendTransformer/Transformer';

export const SINGLE_TIMED_MESSAGE_CONFIG = {
    type: 'single',
    supportsMultiple: false,
    extraFields: [SINGLE_TIMED_MESSAGE_CHANNEL],
};

export const RANDOM_TIMED_MESSAGE_CONFIG = {
    type: 'random',
    supportsMultiple: true,
    extraFields: [RANDOM_TIMED_MESSAGE_CHANNEL],
};

const fieldConfig = [INTERVAL_FIELD, ...DEFAULT_EMBED_FIELDS];

// const messageNameValidator = (values, messages) => {
//     const violations = [];

//     if (!values[TIMED_MESSAGE_NAME.name]) {
//         violations.push('The timed message name field cannot be empty!');
//     }
//     const filtered = messages.filter((x) => x.name === values[TIMED_MESSAGE_NAME.name]);
//     if (values[TIMED_MESSAGE_NAME.name] && filtered.length !== 0 && filtered[0].id !== values.messageId) {
//         violations.push('A timed message with the name "' + values[TIMED_MESSAGE_NAME.name] + '" already exists!');
//     }

//     return violations;
// };

// const intervalCannotBeEmptyValidator = (values) => {
//     if (!values[INTERVAL_FIELD.name] || values[INTERVAL_FIELD.name] === 0) {
//         return ['A timed message must have an interval'];
//     }

//     return [];
// };

// const channelCannotBeEmptyValidator = (values) => {
//     if (!values[SINGLE_TIMED_MESSAGE_CHANNEL.name] && !values[RANDOM_TIMED_MESSAGE_CHANNEL.name]) {
//         return ['A timed message must have a channel selected'];
//     }

//     return [];
// };

// const embedCannotBeEmptyValidator = (values) => {
//     const nonEmbedFieldNames = [
//         TIMED_MESSAGE_NAME,
//         INTERVAL_FIELD,
//         SINGLE_TIMED_MESSAGE_CHANNEL,
//         RANDOM_TIMED_MESSAGE_CHANNEL,
//     ].map((x) => x.name);
//     if (
//         Object.keys(values)
//             .filter((x) => !nonEmbedFieldNames.includes(x))
//             .filter((x) => !!values[x]).length === 0
//     ) {
//         return ['A timed message must have an embed!'];
//     }

//     return [];
// };

export const TIMED_MESSAGE_EDITOR_CONFIG = {
    fields: fieldConfig,
    fieldsToKeepInSync: [
        TIMED_MESSAGE_NAME,
        RANDOM_TIMED_MESSAGE_CHANNEL,
        SINGLE_TIMED_MESSAGE_CHANNEL,
        INTERVAL_FIELD,
        {
            name: 'messageId',
        },
    ],
    fieldHandler: (editorConfig) => [
        TIMED_MESSAGE_NAME,
        ...(editorConfig?.extraFields || []),
        ...fieldConfig,
    ],
    formHandler: timedMessageFormHandler,
    editorSelections: [
        {
            config: SINGLE_TIMED_MESSAGE_CONFIG,
            title: 'Single timer',
        },
        {
            config: RANDOM_TIMED_MESSAGE_CONFIG,
            title: 'Random timer',
        },
    ],
    transformerCallback: transformTimedMessage,
    formFieldToPopulateWithData: 'message',
    displayOverview: true,
};
