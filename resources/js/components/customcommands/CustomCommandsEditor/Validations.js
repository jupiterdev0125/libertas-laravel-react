import {
    FIELD_FIELD,
    COMMAND_FIELD,
    DELETE_COMMAND_RESPONSE_FIELD,
    DELETE_COMMAND_USAGE_FIELD,
    COOLDOWN_FIELD,
    AUTO_ROLE_ACTION_FIELD,
} from '../../../utils/configs/fieldConfigs';
import { FieldValidationConstants } from '../../../utils/validation/fieldValidation';

function validateRemaining(values, validationIssues) {
    Object.entries(values).forEach((entry) => {
        const [key, value] = entry;
        if (key !== FIELD_FIELD.name) {
            if (key === DELETE_COMMAND_RESPONSE_FIELD.name) {
                if (!!(values[DELETE_COMMAND_RESPONSE_FIELD.name] || {})[DELETE_COMMAND_RESPONSE_FIELD.name] && (!value.dcrPeriodCount || value.dcrPeriodCount === '0')) {
                    validationIssues.push(key);
                }
            } else if (key === DELETE_COMMAND_USAGE_FIELD.name) {
                if (!!(values[DELETE_COMMAND_USAGE_FIELD.name] || {})[DELETE_COMMAND_USAGE_FIELD.name] && (!value.dcuPeriodCount || value.dcuPeriodCount === '0')) {
                    validationIssues.push(key);
                }
            } else if (key === COOLDOWN_FIELD.name) {
                if (value.cooldown && value.cooldown.id !== 1 && (!value.periodCount || value.periodCount === '0')) {
                    validationIssues.push(key);
                }
            } else if (key !== AUTO_ROLE_ACTION_FIELD.name && !value && value !== undefined) {
                validationIssues.push(key);
            }
        } else {
            // eslint-disable-next-line no-unused-expressions
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

export const validate = (values) => {
    const validationIssues = [];
    // eslint-disable-next-line no-prototype-builtins
    if (!values.hasOwnProperty(COMMAND_FIELD.name)) {
        validationIssues.push(COMMAND_FIELD.name);
    }
    return validateRemaining(values, validationIssues);
};

export default validate;
