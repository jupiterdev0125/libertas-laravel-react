import React from 'react';
import classnames from 'classnames';
import MenuItem from '../MenuItem/MenuItem';
import DropdownSearchableMenu from '../DropdownSearchableMenu/DropdownSearchableMenu';

export default function MultiDropdownSelect({
    selectedItems,
    searchItems,
    menuClasses,
    itemSelectedListener,
    itemDeletedListener,
    labelProp,
    valueProp,
    keyProp,
}) {
    const menuClassNames = classnames(
        'col-12',
        'col-lg-12',
        'm-bot-1',
        'libertas-green',
        'multi-select',
        'has-drop-down',
        'input-min-height',
        menuClasses,
    );

    return (
        <div className="row">
            <div className="container">
                <div className={menuClassNames}>
                    {selectedItems.map((item) => (
                        <MenuItem
                            key={item[keyProp]}
                            label={item[labelProp]}
                            value={valueProp ? item[valueProp] : item}
                            removeItemListener={itemDeletedListener}
                        />
                    ))}
                    <DropdownSearchableMenu
                        useDefaultButton
                        items={searchItems}
                        searchPlaceholder="Search..."
                        itemSelectedListener={itemSelectedListener}
                        currentSelected={selectedItems}
                        keyProp={keyProp}
                        labelProperty={labelProp}
                        valueProperty={valueProp}
                    />
                </div>
            </div>
        </div>
    );
}
