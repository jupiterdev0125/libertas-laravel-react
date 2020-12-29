import React, { Fragment, useContext } from 'react';
import EmbedEditorFieldArea from '../../../../common/EmbedEditorFieldArea/EmbedEditorFieldArea';
import { AUTO_ROLE_FIELD, SERVER_WELCOME_CHANNEL_FIELD } from '../../../../../utils/configs/fieldConfigs';
import AutoRole from '../../../../common/editor_inputs/inputs/AutoRole/AutoRole';
import { setValueForField } from '../../../../../utils/editorHelpers';
import ConfigContext from '../../../../../context/ConfigContext';
import SingleChannelPicker from '../../../../common/forms/SingleChannelPicker/SingleChannelPicker';
import { useTextChannels } from '../../../../../customHooks/useTextChannels';
import DefaultFieldInputs from '../../../../common/default_fields/DefaultFieldsInputs/DefaultFieldInputs';
import WritingShortcuts from '../../../../common/WritingShortcuts/WritingShortcuts';

export default function WelcomeFields({
    isFieldActive,
    values,
    setValues,
    validationIssues,
    globalCharLimitReached,
}) {
    const configContext = useContext(ConfigContext);
    const [textChannels] = useTextChannels(configContext.config.guildId);
    return (
        <>
            <WritingShortcuts />
            <EmbedEditorFieldArea
                description={SERVER_WELCOME_CHANNEL_FIELD.description}
                alwaysDisplay
                field={(
                    <SingleChannelPicker
                        channelSelectedListener={(value) => setValueForField(values, SERVER_WELCOME_CHANNEL_FIELD.name, value, setValues)}
                        searchChannels={textChannels}
                        selectedChannel={values[SERVER_WELCOME_CHANNEL_FIELD.name]}
                        labelProperty="name"
                        validationIssues={validationIssues}
                        validationKey={SERVER_WELCOME_CHANNEL_FIELD.name}
                    />
                )}
            />
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
                csrfToken={configContext.config.csrfToken}
                validationIssues={validationIssues}
                globalCharLimitReached={globalCharLimitReached}
            />
        </>
    );
}
