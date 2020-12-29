import React, { Fragment, useState } from 'react';
import EditorSelection from '../../components/common/EditorSelection/EditorSelection';
import BaseEntryEditor from './BaseEntryEditor';

export default function BasePageInput({
    validators, config, entries, setEntries, pageType,
}) {
    const [editorConfig, _setEditorConfig] = useState(undefined);
    const [editorValues, setEditorValues] = useState([{}]);

    const setEditorConfig = (value) => {
        setEditorValues([{}]);
        _setEditorConfig(value);
    };
    return (
        <>
            <EditorSelection
                selections={config.editorSelections.map((editorSelection) => ({
                    ...editorSelection,
                    onClick: () => setEditorConfig(editorSelection.config),
                }))}
            />
            <BaseEntryEditor
                validators={validators}
                config={{
                    ...config,
                    fields: config.fieldHandler(editorConfig),
                }}
                editorConfig={editorConfig}
                setEditorConfig={setEditorConfig}
                editorValues={editorValues}
                setEditorValues={setEditorValues}
                entries={entries}
                setEntries={setEntries}
                pageType={pageType}
            />
        </>
    );
}
