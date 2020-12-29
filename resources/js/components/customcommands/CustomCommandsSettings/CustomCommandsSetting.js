import React, { Fragment, useContext } from 'react';
import SingleChannelPicker from '../../common/forms/SingleChannelPicker/SingleChannelPicker';
import EmbedEditorFieldArea from '../../common/EmbedEditorFieldArea/EmbedEditorFieldArea';
import SingleOptionPicker from '../../common/forms/SingleOptionPicker/SingleOptionPicker';
import MultiChannelPicker from '../../common/forms/MultiChannelPicker/MultiChannelPicker';
import FailedValidation from '../../common/validation/FailedValidation/FailedValidation';
import { setValueForField } from '../../../utils/editorHelpers';
import {
    DELETE_COMMAND_USAGE_FIELD,
    DELETE_COMMAND_RESPONSE_FIELD,
    RESPONSE_CHANNEL_FIELD,
    DISPLAY_HELP_FIELD,
    COOLDOWN_FIELD,
    BANNED_CHANNEL_FIELD,
} from '../../../utils/configs/fieldConfigs';
import ConfigContext from '../../../context/ConfigContext';
import ActionDropdown from './ActionDropdown/ActionDropdown';
import { useValidation } from '../../../customHooks/useValidation';
import './CustomCommandsSettings.css';
import PermissionInput from '../../common/editor_inputs/inputs/PermissionInput/PermissionInput';

const generateNumbers = (N) => [...Array(N).keys()].map((i) => i + 1);

const CustomCommandsSettings = ({
    values,
    setValues,
    validationIssues,
    light,
}) => {
    const [deleteResponseValid] = useValidation(
        validationIssues,
        DELETE_COMMAND_RESPONSE_FIELD.name,
    );
    const [deleteUsageValid] = useValidation(validationIssues, DELETE_COMMAND_USAGE_FIELD.name);
    const [cooldownValid] = useValidation(validationIssues, COOLDOWN_FIELD.name);
    const { config } = useContext(ConfigContext);
    const availablePeriods = [
        'seconds',
        'minutes',
    ];

    const onSettingsChange = (fieldName, value) => {
        setValueForField(values, fieldName, value, setValues);
    };

    const onCooldownChange = (fieldName, value) => {
        setValues({
            ...values,
            cooldown: {
                ...(values.cooldown || {}),
                [fieldName]: value,
            },
        });
    };

    const onDcrChange = (fieldName, value) => {
        setValues({
            ...values,
            deleteCommandResponse: {
                ...(values.deleteCommandResponse || {}),
                [fieldName]: value,
            },
        });
    };

    const onDcuChange = (fieldName, value) => {
        setValues({
            ...values,
            deleteCommandUsage: {
                ...(values.deleteCommandUsage || {}),
                [fieldName]: value,
            },
        });
    };

    const onPermissionsChange = (newValue) => {
        setValues({
            ...values,
            permissions: {
                ...(values.permissions || {}),
                ...newValue,
            },
        });
    };

    const ignoredChannelAdded = (channel) => {
        setValues({
            ...values,
            [BANNED_CHANNEL_FIELD.name]: [
                ...(values[BANNED_CHANNEL_FIELD.name] || []),
                channel,
            ],
        });
    };

    const ignoredChannelRemoved = (channel) => {
        setValues({
            ...values,
            [BANNED_CHANNEL_FIELD.name]:
                values[BANNED_CHANNEL_FIELD.name]?.filter((c) => c.id !== channel.id) || [],
        });
    };

    return (
        <>
            <div className="row m-bot-1">
                <div className="col-6">
                    <p className="vertical-middle text-uppercase">{DELETE_COMMAND_USAGE_FIELD.description}</p>
                    <div className="d-flex align-items-center">
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={(e) => onDcuChange(
                                    DELETE_COMMAND_USAGE_FIELD.name,
                                    e.currentTarget.checked,
                                )}
                                checked={!!(
                                    values[DELETE_COMMAND_USAGE_FIELD.name] || {}
                                )[DELETE_COMMAND_USAGE_FIELD.name]}
                            />
                            <span className="slider round" />
                        </label>
                        <label className="pl-2"> Delete </label>
                    </div>
                    {
                        !deleteUsageValid && (
                            <FailedValidation message="Please selete a value." />
                        )
                    }
                    {values.deleteCommandUsage?.deleteCommandUsage
                        && (
                            <div className="d-flex">
                                <ActionDropdown
                                    value={values.deleteCommandUsage.dcuPeriodCount || '0'}
                                    items={generateNumbers(60)}
                                    itemSelectedListener={(value) => onDcuChange('dcuPeriodCount', value)}
                                />
                                <ActionDropdown
                                    value={values.deleteCommandUsage.dcuPeriod || 'seconds'}
                                    items={availablePeriods}
                                    itemSelectedListener={(value) => onDcuChange('dcuPeriod', value)}
                                />
                            </div>
                        )}
                </div>
                <div className="col-6">
                    <p className="vertical-middle text-uppercase">{DELETE_COMMAND_RESPONSE_FIELD.description}</p>
                    <div className="d-flex align-items-center">
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={(e) => onDcrChange(
                                    DELETE_COMMAND_RESPONSE_FIELD.name,
                                    e.currentTarget.checked,
                                )}
                                checked={!!(
                                    values[DELETE_COMMAND_RESPONSE_FIELD.name] || {}
                                )[DELETE_COMMAND_RESPONSE_FIELD.name]}
                            />
                            <span className="slider round" />
                        </label>
                        <label className="pl-2"> Delete </label>
                    </div>
                    {
                        !deleteResponseValid && (
                            <FailedValidation message="Please selete a value." />
                        )
                    }
                    {values.deleteCommandResponse?.deleteCommandResponse
                        && (
                            <div className="d-flex">
                                <ActionDropdown
                                    value={values.deleteCommandResponse.dcrPeriodCount || '0'}
                                    items={generateNumbers(60)}
                                    itemSelectedListener={(value) => onDcrChange('dcrPeriodCount', value)}
                                />
                                <ActionDropdown
                                    value={values.deleteCommandResponse.dcrPeriod || 'seconds'}
                                    items={availablePeriods}
                                    itemSelectedListener={(value) => onDcrChange('dcrPeriod', value)}
                                />
                            </div>
                        )}
                </div>
            </div>
            <EmbedEditorFieldArea
                description={RESPONSE_CHANNEL_FIELD.description}
                infoText=""
                field={(
                    <SingleChannelPicker
                        channelSelectedListener={(value) => onSettingsChange(
                            RESPONSE_CHANNEL_FIELD.name,
                            value,
                        )}
                        searchChannels={config.channels}
                        selectedChannel={values[RESPONSE_CHANNEL_FIELD.name]}
                        labelProperty="name"
                        light={light}
                    />
                )}
                alwaysDisplay
                subField
            />
            <EmbedEditorFieldArea
                description={DISPLAY_HELP_FIELD.description}
                infoText=""
                field={(
                    <SingleOptionPicker
                        optionSelectedListener={(value) => onSettingsChange(
                            DISPLAY_HELP_FIELD.name,
                            value,
                        )}
                        searchOptions={DISPLAY_HELP_FIELD.options}
                        selectedOption={values[DISPLAY_HELP_FIELD.name]}
                        labelProperty="name"
                        light={light}
                    />
                )}
                alwaysDisplay
                subField
            />
            <EmbedEditorFieldArea
                description={COOLDOWN_FIELD.description}
                infoText=""
                field={(
                    <SingleOptionPicker
                        optionSelectedListener={(value) => onCooldownChange(
                            COOLDOWN_FIELD.name,
                            value,
                        )}
                        searchOptions={COOLDOWN_FIELD.options}
                        selectedOption={(values[COOLDOWN_FIELD.name] || {})[COOLDOWN_FIELD.name]}
                        labelProperty="name"
                        light={light}
                    />
                )}
                alwaysDisplay
                subField
            />
            {values.cooldown?.cooldown && values.cooldown?.cooldown.id !== 1 && (
                <div className="row mb-4 customcommands-cooldown">
                    <div className="col-6">
                        {
                            !cooldownValid && (
                                <FailedValidation message="Please selete a value." />
                            )
                        }
                        <div className="d-flex">
                            <ActionDropdown
                                value={values.cooldown.periodCount || '0'}
                                items={generateNumbers(60)}
                                itemSelectedListener={(value) => onCooldownChange('periodCount', value)}
                            />
                            <ActionDropdown
                                value={values.cooldown.period || 'seconds'}
                                items={availablePeriods}
                                itemSelectedListener={(value) => onCooldownChange('period', value)}
                            />
                        </div>
                    </div>
                </div>
            )}
            <PermissionInput
                guildId={config.guildId}
                value={values.permissions || {}}
                setValue={onPermissionsChange}
                light={light}
            />
            <EmbedEditorFieldArea
                description={BANNED_CHANNEL_FIELD.description}
                infoText=""
                field={(
                    <MultiChannelPicker
                        searchChannels={config.channels}
                        currentChannels={values[BANNED_CHANNEL_FIELD.name] || []}
                        labelProperty="name"
                        keyProp="id"
                        channelSelectedListener={ignoredChannelAdded}
                        channelRemovedListener={ignoredChannelRemoved}
                        light={light}
                    />
                )}
                alwaysDisplay
                subField
            />
        </>
    );
};

export default CustomCommandsSettings;
