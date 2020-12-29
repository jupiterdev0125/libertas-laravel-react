import {
    CHANNEL,
    COLOR_FIELD,
    FIELD_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    TWITTER,
} from '../utils/configs/fieldConfigs';
import { socialMediaFormHandler } from '../utils/FormHandler/FormHandler';
import { transformTwitter } from '../utils/BackendTransformer/Transformer';

const fieldConfig = [CHANNEL, TWITTER, PLAIN_TEXT_FIELD, FIELD_FIELD, THUMBNAIL_FIELD, COLOR_FIELD];

export const TWITTER_EDITOR_CONFIG = {
    fields: fieldConfig,
    formHandler: socialMediaFormHandler,
    validators: [],
    editorSelections: [
        {
            config: {
                type: 'twitter',
                supportsMultiple: false,
            },
            title: 'Twitter',
        },
    ],
    fieldHandler: (editorConfig) => [...(editorConfig?.fields || []), ...fieldConfig],
    transformerCallback: transformTwitter,
};
