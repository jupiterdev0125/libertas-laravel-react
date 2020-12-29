import React from 'react';
import SingleFieldInput from './SingleFieldInput/SingleFieldInput';

export default function FieldInput({
    value,
    setValue,
    validationIssues,
    globalCharLimitReached,
    light,
}) {
    const deleteField = (fieldIndex) => {
        const newValue = [...value];
        newValue.splice(fieldIndex, 1);
        setValue(newValue);
    };

    return (value || []).map((val, i) => (
        <SingleFieldInput
            key={i}
            val={val}
            fieldsValue={value}
            index={i}
            validationIssues={validationIssues}
            setValue={setValue}
            deleteField={deleteField}
            globalCharLimitReached={globalCharLimitReached}
            light={light}
        />
    ));
}
