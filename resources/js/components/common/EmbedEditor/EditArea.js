import React, { Fragment } from 'react';

export default function EditArea({
    config, activeFieldNames, values, setValues, light,
}) {
    return config.fields.map((fieldConfig) => {
        if (fieldConfig.alwaysDisplayInEditArea !== true && !activeFieldNames.includes(fieldConfig.name)) {
            return null;
        }

        const setter = (value) => setValues({
            ...values,
            [fieldConfig.name]: value,
        });

        return (
            <div className="m-bot-1" key={fieldConfig.name}>
                {fieldConfig.hideDescriptionForInput === true ? null : (
                    <>
                        <p className="d-inline text-uppercase">{fieldConfig.description}</p>
                    </>
                )}
                <fieldConfig.input value={values[fieldConfig.name]} setValue={setter} {...config} light={light} />
            </div>
        );
    });
}
