import React, { useContext } from 'react';
import ConfigContext from '../../../../context/ConfigContext';
import SingleChannelPicker from '../../../common/forms/SingleChannelPicker/SingleChannelPicker';
import DefaultFieldInputs from '../../../common/default_fields/DefaultFieldsInputs/DefaultFieldInputs';
import EmbedEditorFieldArea from '../../../common/EmbedEditorFieldArea/EmbedEditorFieldArea';
import WritingShortcuts from '../../../common/WritingShortcuts/WritingShortcuts';
import TextInput from '../../../common/editor_inputs/inputs/TextInput';
import {
    TIMED_MESSAGE_NAME,
    TIMED_CHANNEL_FIELD,
} from '../../../../utils/configs/fieldConfigs';

export default function TimedMessageFields({
    values,
    isFieldActive,
    setValues,
    light,
    staticFields,
    setStaticFields,
    validationIssues,
    activePanel,
}) {
    const { config } = useContext(ConfigContext);
    const timerNameDescription = staticFields.type ? `${staticFields.type} TIMER NAME` : `${activePanel} TIMER NAME`;

    const onStaticFieldChange = (value, key) => {
        setStaticFields({
            ...staticFields,
            [key]: value,
        });
    };

    return (
        <>
            <WritingShortcuts light={light} />
            <EmbedEditorFieldArea
                description={timerNameDescription}
                alwaysDisplay
                field={
                    (
                        <TextInput
                            value={staticFields[TIMED_MESSAGE_NAME.name]}
                            setValue={(value) => onStaticFieldChange(
                                value,
                                TIMED_MESSAGE_NAME.name,
                            )}
                            validationIssues={validationIssues}
                            validationKey={TIMED_MESSAGE_NAME.name}
                            light={light}
                        />
                    )
                }
            />
            <EmbedEditorFieldArea
                description={TIMED_CHANNEL_FIELD.description}
                field={(
                    <SingleChannelPicker
                        channelSelectedListener={(value) => onStaticFieldChange(
                            value,
                            TIMED_CHANNEL_FIELD.name,
                        )}
                        searchChannels={config.channels}
                        selectedChannel={staticFields[TIMED_CHANNEL_FIELD.name]}
                        labelProperty="name"
                        light={light}
                    />
                )}
                alwaysDisplay
                subField
            />
            <DefaultFieldInputs
                isFieldActive={isFieldActive}
                values={values}
                setValues={setValues}
                csrfToken={config.csrfToken}
                light={light}
                validationIssues={validationIssues}
            />
        </>
    );
}
