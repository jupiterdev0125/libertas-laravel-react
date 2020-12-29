import {
    CHANNEL,
    COLOR_FIELD,
    FIELD_FIELD,
    PLAIN_TEXT_FIELD,
    REDDIT,
    THUMBNAIL_FIELD,
} from '../utils/configs/fieldConfigs';
import { socialMediaFormHandler } from '../utils/FormHandler/FormHandler';
import { transformReddit } from '../utils/BackendTransformer/Transformer';

const fieldConfig = [CHANNEL, REDDIT, PLAIN_TEXT_FIELD, FIELD_FIELD, THUMBNAIL_FIELD, COLOR_FIELD];

export const REDDIT_EDITOR_CONFIG = {
    fields: fieldConfig,
    formHandler: socialMediaFormHandler,
    validators: [],
    editorSelections: [
        {
            config: {
                type: 'reddit',
                supportsMultiple: false,
            },
            title: 'Reddit',
        },
    ],
    fieldHandler: (editorConfig) => [...(editorConfig?.fields || []), ...fieldConfig],
    transformerCallback: transformReddit,
};
