import React, { useEffect } from 'react';
import ElementFields from '../ElementFields/ElementFields';
import DiscordPreview from '../DiscordPreview/DiscordPreview';
import { FIELD_FIELD } from '../../../utils/configs/fieldConfigs';
import EditArea from './EditArea';
import './embed-editor.css';
import embedExampleImage from './Embed_Example.png';
import { validate } from '../../../utils/validator';

export default function EmbedEditor({
    config,
    validators,
    values,
    setValues,
    deleteEmbed,
    submitForm,
    navigation,
    submissionStatus,
    light,
}) {
    config.fields = config.fields || [];
    const violations = [...validators, validate].map((callback) => callback(values)).flat();

    const getActiveFieldNames = () => config.fields
        .filter(
            (configField) => values
                    && values[configField.name] !== undefined
                    && values[configField.name] !== null
                    && configField.name !== FIELD_FIELD.name,
        )
        .map((field) => field.name);

    const activateField = (fieldName) => {
        if (fieldName === FIELD_FIELD.name) {
            setValues({
                ...values,
                field: [
                    ...(values.field || []),
                    {
                        title: '',
                        value: '',
                        inline: false,
                    },
                ],
            });
        } else {
            setValues({
                ...values,
                [fieldName]: '',
            });
        }
    };

    const deactivateField = (fieldName) => {
        // "field" cannot be "deactivated"
        if (fieldName !== FIELD_FIELD.name) {
            setValues({
                ...values,
                [fieldName]: undefined,
            });
        }
    };

    const initFields = () => {
        const initialFieldValues = {};
        Object.keys(values).forEach((key) => {
            if (values && values[key] !== undefined) {
                initialFieldValues[key] = values[key];
            }
        });
        setValues(initialFieldValues);
    };

    useEffect(initFields, []);

    const clearForm = () => {
        const newFieldValues = {
            ...values,
        };
        config.fields.forEach((configField) => {
            if (newFieldValues[configField.name] !== undefined) {
                newFieldValues[configField.name] = undefined;
            }
        });
        setValues(newFieldValues);
    };

    const shouldShowPreview = () => getActiveFieldNames().length > 0 || values[FIELD_FIELD.name]?.length > 0;

    const submitFormIfNoViolations = (e) => {
        if (violations.length === 0) {
            submitForm(e);
        }
    };

    const renderSubmissionStatus = () => {
        if (!submissionStatus) {
            return null;
        }

        if (submissionStatus === 'error') {
            return <span className="libertas-orange">Save failed!</span>;
        }

        return <span className="libertas-green">Save successful!</span>;
    };

    return (
        <div className="container">
            {violations.length > 0 ? (
                <div className="p-bot-1">
                    {violations.map((violation) => (
                        <span key={violation} className="libertas-orange">
                            {violation}
                            <br />
                        </span>
                    ))}
                </div>
            ) : null}
            <div className="embed-editor">
                <div className="embed-fields-heading">
                    <h2>Elements</h2>
                </div>
                <div>{/** spacer */}</div>
                <div className="discord-preview-heading">
                    <h2>Live Embed example</h2>
                </div>
                <div className="embed-fields">
                    <ElementFields
                        fieldConfigs={config.fields}
                        activateField={activateField}
                        deactivateField={deactivateField}
                        activeFieldNames={getActiveFieldNames()}
                    />
                </div>
                <div className="edit-area">
                    <EditArea
                        config={config}
                        activeFieldNames={getActiveFieldNames()}
                        values={values}
                        setValues={setValues}
                        light={light}
                    />
                </div>
                <div className="discord-preview">
                    {shouldShowPreview() ? (
                        <DiscordPreview data={values} />
                    ) : (
                        <img style={{ backgroundColor: '#36393e' }} alt="Embed example" src={embedExampleImage} />
                    )}
                    {navigation}
                </div>
            </div>
            <div className="embed-editor-control m-top-2">
                <div>{/** spacer */}</div>
                <button className="btn btn-enabled" onClick={submitFormIfNoViolations}>
                    Save
                </button>
                {deleteEmbed !== undefined ? (
                    <button className="btn btn-disabled" onClick={() => deleteEmbed()}>
                        Delete
                    </button>
                ) : (
                    <button className="btn btn-disabled" onClick={clearForm}>
                        Clear
                    </button>
                )}
                <div>{/** spacer */}</div>
            </div>
            <div className="text-center m-bot-4 m-top-1">{renderSubmissionStatus()}</div>
        </div>
    );
}
