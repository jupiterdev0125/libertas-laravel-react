import React from 'react';
import './automated_action_dropdown.css';

const getDisplayLabelForValue = (items, search, labelProp, keyProp) => items.find((item) => item[keyProp] === search)[labelProp];

export default function ActionDropdown({
    value,
    items,
    itemSelectedListener,
    typeText,
    labelProp,
    keyProp,
}) {
    const isItemActive = (item) => {
        if (keyProp) {
            return value === item[keyProp];
        }
        return item === value;
    };

    return (
        <div className="mr-2 ml-2 pt-2 pt-lg-0">
            <button
                type="button"
                className="btn btn-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {labelProp ? getDisplayLabelForValue(items, value, labelProp, keyProp) : value}
                {' '}
                {typeText}
            </button>
            <div className="dropdown-menu max-height-dropdown ">
                {items.map((item) => (
                    <a
                        key={keyProp ? item[keyProp] : item}
                        className={`dropdown-item cursor-pointer ${isItemActive(item) ? 'active' : ''}`}
                        onClick={() => itemSelectedListener(keyProp ? item[keyProp] : item)}
                    >
                        {labelProp ? item[labelProp] : item}
                        {' '}
                        {typeText}
                    </a>
                ))}
            </div>
        </div>
    );
}
