import React, { Fragment } from 'react';
import DefaultFieldElements from '../../../../common/default_fields/DefaultFieldElements/DefaultFieldElements';
import { AUTO_ROLE_FIELD } from '../../../../../utils/configs/fieldConfigs';
import ElementField from '../../../../common/ElementFields/ElementField';

export default function DmElementFields({
    toggleField,
    isFieldActive,
    addField,
    values,
}) {
    return (
        <>
            <ElementField
                onClick={() => toggleField(AUTO_ROLE_FIELD.name)}
                active={isFieldActive(AUTO_ROLE_FIELD.name)}
                innerText={AUTO_ROLE_FIELD.description}
            />
            <DefaultFieldElements
                toggleField={toggleField}
                isFieldActive={isFieldActive}
                addField={addField}
                values={values}
            />
        </>
    );
}
