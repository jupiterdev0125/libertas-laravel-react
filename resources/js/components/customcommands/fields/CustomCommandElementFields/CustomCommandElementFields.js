import React from 'react';
import DefaultFieldElements from '../../../common/default_fields/DefaultFieldElements/DefaultFieldElements';

export default function CustomCommandElementFields({
    toggleField,
    isFieldActive,
    addField,
    values,
}) {
    return (
        <>
            <DefaultFieldElements
                toggleField={toggleField}
                isFieldActive={isFieldActive}
                addField={addField}
                values={values}
            />
        </>
    );
}
