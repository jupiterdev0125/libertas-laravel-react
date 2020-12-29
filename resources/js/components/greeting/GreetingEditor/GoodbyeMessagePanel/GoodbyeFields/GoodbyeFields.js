import React, { Fragment, useContext } from 'react';
import ConfigContext from '../../../../../context/ConfigContext';
import { useTextChannels } from '../../../../../customHooks/useTextChannels';
import EmbedEditorFieldArea from '../../../../common/EmbedEditorFieldArea/EmbedEditorFieldArea';
import { SERVER_WELCOME_CHANNEL_FIELD } from '../../../../../utils/configs/fieldConfigs';
import SingleChannelPicker from '../../../../common/forms/SingleChannelPicker/SingleChannelPicker';
import { setValueForField } from '../../../../../utils/editorHelpers';
import DefaultFieldInputs from '../../../../common/default_fields/DefaultFieldsInputs/DefaultFieldInputs';
import WritingShortcuts from '../../../../common/WritingShortcuts/WritingShortcuts';

export default function GoodbyeFields({
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
