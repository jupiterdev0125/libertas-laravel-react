import {
    FIELD_FIELD,
    SERVER_GOODBYE_CHANNEL_FIELD,
    SERVER_WELCOME_CHANNEL_FIELD,
} from '../../../../utils/configs/fieldConfigs';
import { FieldValidationConstants } from '../../../../utils/validation/fieldValidation';

export const validateWelcome = (values) => {
    const validationIssues = [];
    if (!values.hasOwnProperty(SERVER_WELCOME_CHANNEL_FIELD.name)) {
        validationIssues.push(SERVER_WELCOME_CHANNEL_FIELD.name);
    }
    return validateRemaining(values, validationIssues);
};

export const validateDM = (values) => {
    const validationIssues = [];
    return validateRemaining(values, validationIssues);
};

export const validateGoodbye = (values) => {
    const validationIssues = [];
    if (!values.hasOwnProperty(SERVER_GOODBYE_CHANNEL_FIELD.name)) {
        validationIssues.push(SERVER_GOODBYE_CHANNEL_FIELD.name);
    }
    return validateRemaining(values, validationIssues);
};

function validateRemaining(values, validationIssues) {
    Object.entries(values).forEach((entry) => {
        const [key, value] = entry;
        if (key !== FIELD_FIELD.name) {
            if (!value && value !== undefined) {
                validationIssues.push(key);
            }
        } else {
            value && value.map((field, i) => {
                if (!field.title) {
                    validationIssues.push(FieldValidationConstants.TITLE + i);
                }
                if (!field.value) {
                    validationIssues.push(FieldValidationConstants.VALUE + i);
                }
            });
        }
    });
    return validationIssues;
}
