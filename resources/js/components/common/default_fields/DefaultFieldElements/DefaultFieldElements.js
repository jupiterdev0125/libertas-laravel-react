import React, { Fragment } from 'react';
import ElementField from '../../ElementFields/ElementField';
import {
    BODY_FIELD,
    BODY_IMAGE_FIELD,
    COLOR_FIELD,
    FIELD_FIELD,
    FOOTER_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    TITLE_FIELD,
    TITLE_IMAGE_FIELD,
} from '../../../../utils/configs/fieldConfigs';
import { isFieldsAtLimit } from '../../../../utils/editorHelpers';

export default function DefaultFieldElements({
    toggleField,
    isFieldActive,
    addField,
    values,
}) {
    return (
        <>
            <ElementField
                onClick={() => toggleField(PLAIN_TEXT_FIELD.name)}
                active={isFieldActive(PLAIN_TEXT_FIELD.name)}
                innerText={PLAIN_TEXT_FIELD.description}
            />
            <ElementField
                onClick={() => toggleField(TITLE_FIELD.name)}
                active={isFieldActive(TITLE_FIELD.name)}
                innerText={TITLE_FIELD.description}
            />
            <ElementField
                onClick={() => toggleField(BODY_FIELD.name)}
                active={isFieldActive(BODY_FIELD.name)}
                innerText={BODY_FIELD.description}
            />
            <ElementField
                onClick={addField}
                innerText={FIELD_FIELD.description}
                active={isFieldsAtLimit(values)}
            />
            <ElementField
                onClick={() => toggleField(THUMBNAIL_FIELD.name)}
                active={isFieldActive(THUMBNAIL_FIELD.name)}
                innerText={THUMBNAIL_FIELD.description}
            />
            <ElementField
                onClick={() => toggleField(TITLE_IMAGE_FIELD.name)}
                active={isFieldActive(TITLE_IMAGE_FIELD.name)}
                innerText={TITLE_IMAGE_FIELD.description}
            />
            <ElementField
                onClick={() => toggleField(BODY_IMAGE_FIELD.name)}
                active={isFieldActive(BODY_IMAGE_FIELD.name)}
                innerText={BODY_IMAGE_FIELD.description}
            />
            <ElementField
                onClick={() => toggleField(FOOTER_FIELD.name)}
                active={isFieldActive(FOOTER_FIELD.name)}
                innerText={FOOTER_FIELD.description}
            />
            <ElementField
                onClick={() => toggleField(COLOR_FIELD.name)}
                active={isFieldActive(COLOR_FIELD.name)}
                innerText={COLOR_FIELD.description}
            />
        </>
    );
}
