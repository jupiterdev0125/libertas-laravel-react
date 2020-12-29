import React from 'react';
import { FIELD_FIELD } from './configs/fieldConfigs';

export const activateField = (fieldName, values, setValues) => {
    if (fieldName === FIELD_FIELD.name) {
        setValues({
            ...values,
            field: [
                ...(values.field || []),
                {
                    title: '',
                    value: '',
                    inline: false,
                },
            ],
        });
    } else {
        setValues({
            ...values,
            [fieldName]: '',
        });
    }
};

export const deactivateField = (fieldName, values, setValues) => {
    // "field" cannot be "deactivated"
    if (fieldName !== FIELD_FIELD.name) {
        setValues({
            ...values,
            [fieldName]: undefined,
        });
    }
};

export const initiateFields = (fieldNames, values) => fieldNames.filter(
    (name) => values && values[name] !== undefined && values[name] !== null && name !== FIELD_FIELD.name,
);

export const setValueForField = (values, fieldName, value, setValues) => {
    setValues({
        ...values,
        [fieldName]: value,
    });
};

export const createFieldNames = (fields) => {
    const names = [];
    for (const [key, value] of Object.entries(fields)) {
        names.push(value.name);
    }
    return names;
};

export const renderSubmissionStatusSpan = (submissionStatus) => {
    if (!submissionStatus) {
        return null;
    }

    if (submissionStatus === 'error') {
        return <span className="libertas-orange">Save failed!</span>;
    }

    return <span className="libertas-green">Save successful!</span>;
};

export const clearForm = (values, fieldNames, setValues) => {
    const newFieldValues = {
        ...values,
    };
    fieldNames.forEach((field) => {
        if (newFieldValues[field] !== undefined) {
            newFieldValues[field] = undefined;
        }
    });
    setValues({}, true);
};

export const toggleField = (
    fieldName,
    activeFieldNames,
    setActiveFieldNames,
    values,
    setValues,
) => {
    const temp = [...activeFieldNames];
    const index = activeFieldNames.indexOf(fieldName);
    if (index !== -1) {
        deactivateField(fieldName, values, setValues);
        temp.splice(index, 1);
    } else {
        activateField(fieldName, values, setValues);
        temp.push(fieldName);
    }
    setActiveFieldNames(temp);
};

export const isFieldsAtLimit = (values) => {
    const fieldList = values[FIELD_FIELD.name];
    return fieldList && fieldList.length === 25;
};

export const addField = (values, setValues) => {
    const fieldList = values[FIELD_FIELD.name];
    if (!fieldList || fieldList.length < 25) {
        activateField(FIELD_FIELD.name, values, setValues);
    }
};

export const isFieldActive = (activeFieldNames, fieldName) => activeFieldNames.includes(fieldName);

export const shouldShowPreview = (
    activeFieldNames,
    values,
) => activeFieldNames.length > 0 || values[FIELD_FIELD.name]?.length > 0;
