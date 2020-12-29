import React from 'react';
import './navigation.css';

export default function Navigation({
    embedValues, setEmbedValues, embedIndex, setEmbedIndex, fieldsToKeepInSync, isResponse,
}) {
    const addEmptyEmbed = () => {
        const values = embedValues[embedIndex];
        const clone = [embedValues.slice(0, embedIndex + 1),
            {},
            embedValues.slice(embedIndex + 1)].flat();

        if (Array.isArray(fieldsToKeepInSync)) {
            fieldsToKeepInSync.forEach((field) => {
                clone.forEach((clonedValues) => (clonedValues[field.name] = values[field.name]));
            });
        }
        setEmbedValues(clone);
        setEmbedIndex(embedIndex + 1);
    };

    const deleteFieldValue = () => {
        if (embedValues.length === 1) {
            // Do not delete last fieldValue
            return;
        }

        const newValues = [...embedValues];
        newValues.splice(embedIndex, 1);
        setEmbedValues(newValues);
        setEmbedIndex(embedIndex > 0 ? embedIndex - 1 : embedIndex);
    };

    const getFirstEmbed = () => {
        setEmbedIndex(0);
    };

    const getPrevious = () => {
        if (embedIndex > 0) {
            setEmbedIndex(embedIndex - 1);
        }
    };

    const getNext = () => {
        if (embedIndex < embedValues.length - 1) {
            setEmbedIndex(embedIndex + 1);
        }
    };

    const getLastEmbed = () => {
        setEmbedIndex(embedValues.length - 1);
    };

    return (
        <div className="navigation">
            <div className={embedValues.length > 1 ? 'grid-5' : 'grid-4'}>
                <button type="button" key="<<" className="btn btn-enabled" onClick={getFirstEmbed}>
                    {'<<'}
                </button>
                <button type="button" key="<" className="btn btn-enabled" onClick={getPrevious}>
                    {'<'}
                </button>
                <button type="button" key=">" className="btn btn-enabled" onClick={getNext}>
                    {'>'}
                </button>
                <button type="button" key=">>" className="btn btn-enabled" onClick={getLastEmbed}>
                    {'>>'}
                </button>
                <div className="vertical-center">
                    {embedValues.length > 1 ? (
                        <span className="text-center">
                            {embedIndex + 1}
                            {' '}
                            /
                            {embedValues.length}
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="grid-2">
                <button type="button" className="btn btn-enabled" onClick={addEmptyEmbed}>
                    Add
                    {' '}
                    {isResponse ? 'Response' : 'Page'}
                </button>
                <button type="button" className="btn btn-disabled" onClick={deleteFieldValue}>
                    Delete
                    {' '}
                    {isResponse ? 'Response' : 'Page'}
                </button>
            </div>
        </div>
    );
}
