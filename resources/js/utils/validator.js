import {
    BODY_FIELD, FIELD_FIELD, FOOTER_FIELD, TITLE_FIELD,
} from './configs/fieldConfigs';

export const validate = (values) => {
    const DESCRIPTION_LIMIT = 2048;
    const FIELD_COUNT_LIMIT = 25;
    const FIELD_NAME_LIMIT = 256;
    const FIELD_VALUE_LIMIT = 1024;
    const FOOTER_TEXT_LIMIT = 2048;
    const AUTHOR_NAME_LIMIT = 256;
    // title, description, field.name, field.values, footer.name, author.name
    const TOTAL_LIMIT = 6000;

    const violations = [];
    if (values[TITLE_FIELD.name]?.length > AUTHOR_NAME_LIMIT) {
        violations.push(
            `Your title is too long. It can be ${
                AUTHOR_NAME_LIMIT
            } characters at most but you currently have ${
                values[TITLE_FIELD.name].length}`,
        );
    }

    if (values[BODY_FIELD.name]?.length > DESCRIPTION_LIMIT) {
        violations.push(
            `Your description is too long. It can be ${
                DESCRIPTION_LIMIT
            } characters at most but you currently have ${
                values[BODY_FIELD.name].length}`,
        );
    }

    if (values[FIELD_FIELD.name]?.length > FIELD_COUNT_LIMIT) {
        violations.push(
            `You have too many fields. You can only have ${
                FIELD_COUNT_LIMIT
            } fields at most but you currently have ${
                values[FIELD_FIELD.name].length}`,
        );
    }

    if (values[FIELD_FIELD.name]?.length > 0) {
        values[FIELD_FIELD.name].forEach((field, i) => {
            if (field?.title?.length > FIELD_NAME_LIMIT) {
                violations.push(
                    `Field name of field #${
                        i + 1
                    } is too long. It can be ${
                        FIELD_NAME_LIMIT
                    } characters at most but you currently have ${
                        field.title.length}`,
                );
            }
            if (field?.value?.length > FIELD_VALUE_LIMIT) {
                violations.push(
                    `Field value of field #${
                        i + 1
                    } is too long. It can be ${
                        FIELD_VALUE_LIMIT
                    } characters at most but you currently have ${
                        field.value.length}`,
                );
            }
        });
    }

    if (
        values[FOOTER_FIELD.name] instanceof FormData
        && values[FOOTER_FIELD.name]?.get('text')?.length > FOOTER_TEXT_LIMIT
    ) {
        violations.push(
            `Your footer text is too long. It can be ${
                FOOTER_TEXT_LIMIT
            } characters at most but you currently have ${
                values[FOOTER_FIELD.name].get('text').length}`,
        );
    }

    const characterCount = getTotalCharacterCount(values);
    if (characterCount > TOTAL_LIMIT) {
        violations.push(
            `Your total character count is too large. It can be ${
                TOTAL_LIMIT
            } characters at most but you currently have ${
                characterCount}`,
        );
    }

    return violations;
};

const getTotalCharacterCount = (values) => {
    let characterCount = 0;
    [TITLE_FIELD.name, BODY_FIELD.name].forEach((fieldName) => {
        if (values[fieldName]) {
            characterCount += values[fieldName].length;
        }
    });
    if (values[FOOTER_FIELD.name] instanceof FormData && values[FOOTER_FIELD.name]?.get('text')) {
        characterCount += values[FOOTER_FIELD.name].get('text').length || 0;
    }

    values[FIELD_FIELD.name]?.forEach((field) => {
        characterCount += field?.title?.length || 0;
        characterCount += field?.value?.length || 0;
    });

    return characterCount;
};
