import React, { useState } from 'react';
import classnames from 'classnames';

export default function RadioButton({
    label, checked, valueChangedListener, light = true, fontLight = false,
}) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheck = () => {
        // setIsChecked(!isChecked);
        valueChangedListener(!isChecked);
    };

    const checkBoxClasses = classnames('radio-button-box', {
        'libertas-radio-button-dark': !light,
        checked,
    });

    return (
        <div className="d-flex libertas-radio-button">
            <span className={checkBoxClasses} onClick={handleCheck} />
            <div className={`pl-2 radio-button-label ${!fontLight ? 'font-600' : 'font-400'}`}>{label}</div>
        </div>
    );
}
