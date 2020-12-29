import React, { useEffect, useState } from 'react';
import EditorPanel from '../EditorPanel/EditorPanel';

export default function MultiEmbedsEditorPanel({
    allEmbedValues,
    fieldsToKeepInSync,
    elementFieldsComponent,
    fieldsComponent,
    activeFieldNames,
}) {
    return (
        <EditorPanel
            values={currentValues}
            fieldsComponent={fieldsComponent}
            elementFieldsComponent={elementFieldsComponent}
            activeFieldNames={activeFieldNames}
            fieldsToKeepInSync={fieldsToKeepInSync}
            multi
            embedIndex={embedIndex}
            setEmbedIndex={setEmbedIndex}
        />
    );
}
