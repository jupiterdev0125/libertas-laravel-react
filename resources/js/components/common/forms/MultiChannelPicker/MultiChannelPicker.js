import React from 'react';
import classnames from 'classnames';
import DropdownSearchableMenu from '../DropdownSearchableMenu/DropdownSearchableMenu';
import MenuItem from '../MenuItem/MenuItem';

export default function MultiChannelPicker({
    channelSelectedListener,
    channelRemovedListener,
    currentChannels,
    searchChannels,
    labelProperty,
    valueProperty,
    keyProp,
    light,
}) {
    const rowClasses = classnames(
        'col-12 col-lg-12 m-bot-1 libertas-green multi-channel-select has-drop-down',
        {
            light,
        },
    );

    const getLabel = (item) => (item?.id && searchChannels?.length > 0
        ? searchChannels?.filter((channel) => channel.id === item.id)[0][labelProperty]
        : '');

    return (
        <div className="row">
            <div className="container">
                <div className={rowClasses}>
                    {currentChannels.map((item) => (
                        <MenuItem
                            value={item}
                            key={item[keyProp]}
                            label={labelProperty ? getLabel(item) : item}
                            removeItemListener={channelRemovedListener}
                        />
                    ))}
                    <DropdownSearchableMenu
                        useDefaultButton
                        items={searchChannels}
                        currentSelected={currentChannels}
                        keyProp="id"
                        searchPlaceholder="Channels..."
                        itemsPrefix="#"
                        itemSelectedListener={channelSelectedListener}
                        labelProperty={labelProperty}
                        valueProperty={valueProperty}
                    />
                </div>
            </div>
        </div>
    );
}
