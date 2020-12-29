import {
    CHANNEL,
    COLOR_FIELD,
    FIELD_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    TIKTOK,
} from '../utils/configs/fieldConfigs';
import { socialMediaFormHandler } from '../utils/FormHandler/FormHandler';
import { transformTiktok } from '../utils/BackendTransformer/Transformer';

const fieldConfig = [CHANNEL, TIKTOK, PLAIN_TEXT_FIELD, FIELD_FIELD, THUMBNAIL_FIELD, COLOR_FIELD];

export const TIKTOK_EDITOR_CONFIG = {
    fields: fieldConfig,
    formHandler: socialMediaFormHandler,
    validators: [],
    editorSelections: [
        {
            config: {
                type: 'tiktok',
                supportsMultiple: false,
            },
            title: 'TikTok',
        },
    ],
    fieldHandler: (editorConfig) => [...(editorConfig?.fields || []), ...fieldConfig],
    transformerCallback: transformTiktok,
};
