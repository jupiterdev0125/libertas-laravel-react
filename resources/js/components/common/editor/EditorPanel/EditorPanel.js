import React from 'react';
import { CommandTypes } from '../../../../pages/CustomCommands/commandTypes';
import { shouldShowPreview } from '../../../../utils/editorHelpers';
import PreviewContainer from '../../PreviewContainer/PreviewContainer';

export default function EditorPanel({
    values,
    elementFieldsComponent,
    fieldsComponent,
    activeFieldNames,
    multi,
    embedIndex,
    setEmbedIndex,
    embedValues,
    setEmbedValues,
    fieldsToKeepInSync,
    activePanel,
}) {
    return (
        <>
            <div className="embed-fields">
                <div className="element-fields">
                    {elementFieldsComponent}
                </div>
            </div>
            <div className="edit-area">
                {fieldsComponent}
            </div>
            <div>
                <PreviewContainer
                    showShowPreview={shouldShowPreview(activeFieldNames, values)}
                    values={values}
                    multi={multi}
                    embedIndex={embedIndex}
                    setEmbedIndex={setEmbedIndex}
                    fieldsToKeepInSync={fieldsToKeepInSync}
                    embedValues={embedValues}
                    setEmbedValues={setEmbedValues}
                    isResponse={activePanel === CommandTypes.RANDOM}
                />
            </div>
        </>
    );
}
