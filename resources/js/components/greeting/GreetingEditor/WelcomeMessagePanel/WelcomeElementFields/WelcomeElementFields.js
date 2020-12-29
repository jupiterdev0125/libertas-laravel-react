import React from 'react';
import ElementField from '../../../../common/ElementFields/ElementField';
import { AUTO_ROLE_FIELD } from '../../../../../utils/configs/fieldConfigs';
import DefaultFieldElements from '../../../../common/default_fields/DefaultFieldElements/DefaultFieldElements';

export default function WelcomeElementField({
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
