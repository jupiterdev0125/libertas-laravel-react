import React, { useContext } from 'react';
import CustomCommandsSetting from '../../CustomCommandsSettings/CustomCommandsSetting';
import DefaultFieldInputs from '../../../common/default_fields/DefaultFieldsInputs/DefaultFieldInputs';
import ConfigContext from '../../../../context/ConfigContext';
import {
    AUTO_ROLE_FIELD,
    COMMAND_FIELD,
    MESSAGE_TYPE_FIELD,
    SETTINGS_FIELD,
    AUTO_ROLE_ACTION_FIELD,
    COMMAND_PREFIX_FIELD,
} from '../../../../utils/configs/fieldConfigs';
import AutoRole from '../../../common/editor_inputs/inputs/AutoRole/AutoRole';
import { setValueForField } from '../../../../utils/editorHelpers';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import EmbedEditorFieldArea from '../../../common/EmbedEditorFieldArea/EmbedEditorFieldArea';
import WritingShortcuts from '../../../common/WritingShortcuts/WritingShortcuts';
import CommandNameInput from '../../CommandNameInput/CommandNameInput';

export default function CustomCommandsFields({
    values,
    isFieldActive,
    setValues,
    light,
    staticFields,
    setStaticFields,
    validationIssues,
    activePanel,
}) {
    const configContext = useContext(ConfigContext);
    const commandNameDescription = staticFields.type ? `${staticFields.type} Command` : `${activePanel} Command`;

    const onMessageTypeChange = (value) => {
        if (staticFields.messageType?.includes(value)) {
            setStaticFields({
                ...staticFields,
                messageType: staticFields.messageType.filter((mt) => mt !== value),
            });
        } else {
            setStaticFields({
                ...staticFields,
                messageType: [
                    ...(staticFields.messageType || []),
                    value,
                ],
            });
        }
    };

    const commandNameChangedListener = (value) => {
        setStaticFields({
            ...staticFields,
            commandName: value,
        });
    };

    const commandPrefixChangedListener = (value) => {
        setStaticFields({
            ...staticFields,
            commandPrefix: value,
        });
    };

    const onAutoRoleActionChange = () => {
        setStaticFields({
            ...staticFields,
            roleAction: !staticFields.roleAction,
        });
    };

    return (
        <>
            <WritingShortcuts light={light} />
            <EmbedEditorFieldArea
                description={commandNameDescription}
                alwaysDisplay
                field={
                    (
                        <CommandNameInput
                            commandName={staticFields[COMMAND_FIELD.name]}
                            commandPrefix={staticFields[COMMAND_PREFIX_FIELD.name]}
                            validationIssues={validationIssues}
                            validationKey={COMMAND_FIELD.name}
                            validationPrefixKey={COMMAND_PREFIX_FIELD.name}
                            nameChangedListener={commandNameChangedListener}
                            prefixChangedListener={commandPrefixChangedListener}
                            light={light}
                        />
                    )
                }
            />
            <EmbedEditorFieldArea
                description={MESSAGE_TYPE_FIELD.description}
                infoText=""
                field={(
                    <div className="row m-bot-1">
                        <div className="col-12 col-lg-6 mt-2">
                            <RadioButton
                                label="Server Message"
                                checked={!!staticFields.messageType?.includes('server_message')}
                                valueChangedListener={() => onMessageTypeChange('server_message')}
                                light={light}
                                fontLight
                            />
                        </div>
                        <div className="col-12 col-lg-6 mt-2">
                            <RadioButton
                                label="Direct Message"
                                checked={!!staticFields.messageType?.includes('direct_message')}
                                valueChangedListener={() => onMessageTypeChange('direct_message')}
                                light={light}
                                fontLight
                            />
                        </div>
                    </div>
                )}
                alwaysDisplay={MESSAGE_TYPE_FIELD.alwaysDisplayInEditArea}
            />
            <EmbedEditorFieldArea
                description={SETTINGS_FIELD.description}
                infoText=""
                showOptional
                field={(
                    <CustomCommandsSetting
                        values={staticFields}
                        isFieldActive={isFieldActive}
                        setValues={setStaticFields}
                        validationIssues={validationIssues}
                        light={light}
                    />
                )}
                isActive={SETTINGS_FIELD.alwaysDisplayInEditArea}
            />
            <EmbedEditorFieldArea
                description={AUTO_ROLE_FIELD.description}
                infoText={AUTO_ROLE_FIELD.infoText}
                showOptional
                field={(
                    <>
                        <AutoRole
                            value={staticFields[AUTO_ROLE_FIELD.name]}
                            setValue={(value) => setValueForField(
                                staticFields,
                                AUTO_ROLE_FIELD.name,
                                value,
                                setStaticFields,
                            )}
                            useProvidedRoles
                            selectableRoles={configContext.config.roles}
                            light={light}
                        />
                        {staticFields[AUTO_ROLE_FIELD.name] && (
                            <div className="row">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                onChange={onAutoRoleActionChange}
                                                checked={staticFields[AUTO_ROLE_ACTION_FIELD.name]}
                                            />
                                            <span className="slider round" />
                                        </label>
                                        <label className="pl-2"> Add Roles </label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                onChange={onAutoRoleActionChange}
                                                checked={!staticFields[AUTO_ROLE_ACTION_FIELD.name]}
                                            />
                                            <span className="slider round" />
                                        </label>
                                        <label className="pl-2"> Remove Roles </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                isActive
            />

            <DefaultFieldInputs
                isFieldActive={isFieldActive}
                values={values}
                setValues={setValues}
                csrfToken={configContext.config.csrfToken}
                light={light}
                validationIssues={validationIssues}
            />
        </>
    );
}
