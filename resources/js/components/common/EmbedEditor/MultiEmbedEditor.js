import React, { useState } from 'react';
import EmbedEditor from './EmbedEditor';
import Navigation from '../Navigation/Navigation';

export default function MultiEmbedEditor({
    editorValues,
    setEditorValues,
    validators,
    submitForm,
    submissionStatus,
    config,
    deleteEmbed,
    light,
}) {
    const [fieldIndex, _setFieldIndex] = useState(0);

    const setFieldValues = (values, i) => {
        const clone = [...editorValues];
        clone[i] = values;

        if (Array.isArray(config.fieldsToKeepInSync)) {
            config.fieldsToKeepInSync.forEach((field) => {
                clone.forEach((x) => (x[field.name] = values[field.name]));
            });
        }

        setEditorValues(clone, i);
    };

    const setFieldIndex = (newIndex) => {
        if (newIndex < 0) {
            return;
        }
        _setFieldIndex(newIndex);
    };

    // If we save something with multiple responses
    // and reset the form this crashes if we don't set the fieldIndex
    // to the last index of the array (should be 0)
    if (fieldIndex >= editorValues.length) {
        console.error('field index too big, it to length - 1', editorValues.length, fieldIndex);
        setFieldIndex(editorValues.length - 1);
        // Returning null here should barely be noticable by the user
        // But we need to return so this component doesn't crash because of out of bounds errors
        return null;
    }

    return (
        <EmbedEditor
            values={editorValues[fieldIndex]}
            setValues={(values) => setFieldValues(values, fieldIndex)}
            config={config}
            deleteEmbed={deleteEmbed}
            validators={validators || []}
            navigation={
                config.supportsMultiple === true ? (
                    <Navigation
                        embedIndex={fieldIndex}
                        setEmbedIndex={setFieldIndex}
                        embedValues={editorValues}
                        setEmbedValues={setEditorValues}
                        fieldsToKeepInSync={config.fieldsToKeepInSync}
                    />
                ) : null
            }
            submitForm={submitForm || (() => {})}
            submissionStatus={submissionStatus}
            light={light}
        />
    );
}
