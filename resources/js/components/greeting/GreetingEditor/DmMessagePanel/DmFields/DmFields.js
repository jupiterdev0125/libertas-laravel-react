import React, { Fragment, useContext } from 'react';
import ConfigContext from '../../../../../context/ConfigContext';
import DefaultFieldInputs from '../../../../common/default_fields/DefaultFieldsInputs/DefaultFieldInputs';
import { AUTO_ROLE_FIELD } from '../../../../../utils/configs/fieldConfigs';
import AutoRole from '../../../../common/editor_inputs/inputs/AutoRole/AutoRole';
import { setValueForField } from '../../../../../utils/editorHelpers';
import EmbedEditorFieldArea from '../../../../common/EmbedEditorFieldArea/EmbedEditorFieldArea';
import WritingShortcuts from '../../../../common/WritingShortcuts/WritingShortcuts';

export default function DmFields({
    isFieldActive,
    values,
    setValues,
    validationIssues,
    globalCharLimitReached,
}) {
    const configContext = useContext(ConfigContext);
    return (
        <>
            <WritingShortcuts />
            <EmbedEditorFieldArea
                description={AUTO_ROLE_FIELD.description}
                infoText={AUTO_ROLE_FIELD.infoText}
                field={(
                    <AutoRole
                        value={values[AUTO_ROLE_FIELD.name]}
                        setValue={(value) => setValueForField(values, AUTO_ROLE_FIELD.name, value, setValues)}
                        guildId={configContext.config.guildId}
                        validationIssues={validationIssues}
                        validationKey={AUTO_ROLE_FIELD.name}
                    />
                )}
                isActive={isFieldActive(AUTO_ROLE_FIELD.name)}
            />
            <DefaultFieldInputs
                isFieldActive={isFieldActive}
                values={values}
                setValues={setValues}
                validationIssues={validationIssues}
                csrfToken={configContext.config.csrfToken}
                globalCharLimitReached={globalCharLimitReached}
            />
        </>
    );
}
