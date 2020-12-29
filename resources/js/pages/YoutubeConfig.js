import {
    CHANNEL,
    COLOR_FIELD,
    FIELD_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    YOUTUBE,
} from '../utils/configs/fieldConfigs';
import { socialMediaFormHandler } from '../utils/FormHandler/FormHandler';
import { transformYoutube } from '../utils/BackendTransformer/Transformer';

const fieldConfig = [CHANNEL, YOUTUBE, PLAIN_TEXT_FIELD, FIELD_FIELD, THUMBNAIL_FIELD, COLOR_FIELD];

export const YOUTUBE_EDITOR_CONFIG = {
    fields: fieldConfig,
    formHandler: socialMediaFormHandler,
    validators: [],
    editorSelections: [
        {
            config: {
                type: 'youtube',
                supportsMultiple: false,
            },
            title: 'Youtube',
        },
    ],
    fieldHandler: (editorConfig) => [...(editorConfig?.fields || []), ...fieldConfig],
    transformerCallback: transformYoutube,
};
