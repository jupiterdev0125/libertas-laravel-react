import React, { Fragment, useState } from 'react';

import './color-picker.css';
import { Swatch } from 'react-color/lib/components/common/Swatch';
import { Hue, Saturation } from 'react-color/lib/components/common';
import { CustomPicker } from 'react-color';
import PopoverColorPicker from './PopoverColorPicker/PopoverColorPicker';
import { useValidation } from '../../../../../customHooks/useValidation';
import FailedValidation from '../../../validation/FailedValidation/FailedValidation';

const fixedColors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#e91e63',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#95a5a6',
    '#11806a',
    '#1f8b4c',
    '#206694',
    '#71368a',
    '#ad1457',
    '#c27c0e',
    '#a84300',
    '#992d22',
    '#979c9f',
];

const DEFAULT_COLOR = '#b2ddce';

export default function ColorPicker({
    value,
    setValue,
    validationIssues,
    validationKey,
}) {
    const [popoverOpen, isPopoverOpen] = useState(false);
    const [valid] = useValidation(validationIssues, validationKey);

    const openPopover = () => {
        isPopoverOpen(true);
    };

    return (
        <>
            {
                !valid && (
                    <FailedValidation message="Please choose a color." />
                )
            }
            <div className="color-picker">
                <div
                    style={{ background: DEFAULT_COLOR }}
                    title="Default color"
                    className="cursor-pointer mr-2 color-picker-default-color "
                    onClick={() => setValue(DEFAULT_COLOR)}
                />
                <div className="mr-2 position-relative">
                    <button
                        onClick={openPopover}
                        className="btn color-picker-popover-btn"
                        style={{ background: value || DEFAULT_COLOR }}
                    >
                        <i className="fas fa-eye-dropper" />
                    </button>
                    <PopoverColorPicker
                        popoverOpen={popoverOpen}
                        isPopoverOpen={isPopoverOpen}
                        color={value}
                        onChangeComplete={(color) => setValue(color.hex)}
                    />
                </div>

                <div className="flex color-options">
                    {fixedColors.map((colorOption) => {
                        const focused = value && value === colorOption;
                        return (
                            <div key={colorOption} className="color-field">
                                <Swatch
                                    onClick={() => setValue(colorOption)}
                                    style={{ borderRadius: '0.1rem' }}
                                    color={colorOption}
                                    focus={focused}
                                    focusStyle={{ boxShadow: `0 0 0.5rem${colorOption}` }}
                                />
                                {focused && <i className="fas fa-check selected-color-check-mark" />}
                            </div>
                        );
                    })}
                </div>
                <div>&nbsp;</div>
            </div>

        </>
    );
}
