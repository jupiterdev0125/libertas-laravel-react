import React from 'react';
import classnames from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import DropdownSearchableMenu from '../DropdownSearchableMenu/DropdownSearchableMenu';
import FailedValidation from '../../validation/FailedValidation/FailedValidation';
import { useValidation } from '../../../../customHooks/useValidation';

export default function SingleChannelPicker({
    selectedChannel,
    searchChannels,
    channelSelectedListener,
    labelProperty,
    valueProperty,
    validationIssues,
    validationKey,
    light,
}) {
    const getLabel = (value) => (value?.id && searchChannels?.length > 0
        ? `# ${searchChannels?.filter((channel) => channel.id === value.id)[0].name}`
        : 'Choose a channel...');

    const buttonComponent = (
        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {getLabel(selectedChannel)}
        </button>
    );

    const [valid] = useValidation(validationIssues, validationKey);
    const selectClasses = classnames('col-12 col-lg-12 m-bot-1 libertas-green single-channel-select has-drop-down', {
        'single-channel-select-light-background': light,
    });

    return (
        <div className="row">
            <div className="container">
                {
                    !valid && (
                        <FailedValidation message="Please choose a channel." />
                    )
                }

                <div className={selectClasses}>
                    <DropdownSearchableMenu
                        buttonComponent={buttonComponent}
                        items={[{ name: 'No Specific Channel', id: nanoid() }, ...(searchChannels || [])]}
                        currentSelected={selectedChannel}
                        keyProp="id"
                        searchPlaceholder="Channels..."
                        itemsPrefix="#"
                        itemSelectedListener={channelSelectedListener}
                        labelProperty={labelProperty}
                        valueProperty={valueProperty}
                        single
                    />
                </div>

            </div>
        </div>
    );
}
