import {
    BODY_FIELD, FIELD_FIELD, FOOTER_FIELD, PLAIN_TEXT_FIELD, TITLE_FIELD,
} from '../configs/fieldConfigs';

const GLOBAL_CHAR_COUNT_LIMIT = 6000;

export const validateGlobalCharCount = (values, isGlobalCharCountReached) => {
    let currentCount = 0;

    currentCount += values[BODY_FIELD.name]?.length || 0;
    currentCount += values[PLAIN_TEXT_FIELD.name]?.length || 0;
    currentCount += values[TITLE_FIELD.name]?.length || 0;

    if (values[FIELD_FIELD.name]) {
        values[FIELD_FIELD.name].forEach((field) => {
            currentCount += field.title?.length || 0;
            currentCount += field.value?.length || 0;
        });
    }
    const footerValue = values[FOOTER_FIELD.name];
    if (footerValue && footerValue instanceof FormData) {
        currentCount += (footerValue.get('text') && footerValue.get('text').length) || 0;
    }

    if (currentCount >= GLOBAL_CHAR_COUNT_LIMIT) {
        isGlobalCharCountReached(true);
    } else {
        isGlobalCharCountReached(false);
    }
};
