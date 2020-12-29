import React from 'react';
import ElementField from './ElementField';
import './element-fields.css';

export default function ElementFields({
    activateField, deactivateField, activeFieldNames, fieldConfigs,
}) {
    return (
        <div className="element-fields">
            {fieldConfigs.map((fieldConfig) => {
                if (fieldConfig.ignoreInElementOverview) {
                    return null;
                }

                const isActive = activeFieldNames.includes(fieldConfig.name);
                return (
                    <ElementField
                        key={fieldConfig.name}
                        onClick={() => {
                            if (isActive) {
                                deactivateField(fieldConfig.name);
                            } else {
                                activateField(fieldConfig.name);
                            }
                        }}
                        active={isActive}
                        innerText={fieldConfig.description}
                    />
                );
            })}
        </div>
    );
}
