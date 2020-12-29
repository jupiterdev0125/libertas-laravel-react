import {
    CHANNEL,
    COLOR_FIELD,
    FIELD_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    TWITCH,
} from '../utils/configs/fieldConfigs';
import { socialMediaFormHandler } from '../utils/FormHandler/FormHandler';
import { transformTwitch } from '../utils/BackendTransformer/Transformer';

const fieldConfig = [CHANNEL, TWITCH, PLAIN_TEXT_FIELD, FIELD_FIELD, THUMBNAIL_FIELD, COLOR_FIELD];

export const TWITCH_EDITOR_CONFIG = {
    fields: fieldConfig,
    formHandler: socialMediaFormHandler,
    validators: [],
    editorSelections: [
        {
            config: {
                type: 'twitch',
                supportsMultiple: false,
            },
            title: 'Twitch',
        },
    ],
    fieldHandler: (editorConfig) => [...(editorConfig?.fields || []), ...fieldConfig],
    transformerCallback: transformTwitch,
};
