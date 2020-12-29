import React from 'react';

export default function Counter({
    value, min, max, updateListener,
}) {
    const incrementValue = () => {
        let currentValue = value;
        if (currentValue < max) {
            currentValue++;
            updateListener(currentValue);
        }
    };

    const decrementValue = () => {
        let currentValue = value;
        if (currentValue > min) {
            currentValue--;
            updateListener(currentValue);
        }
    };

    return (
        <div className="row counter">
            <div className="container">
                <div className="d-inline-block counter-minus" onClick={decrementValue}>
                    <i className="fas fa-minus" />
                </div>
                <div className="d-inline-block counter-number">{value}</div>
                <div className="d-inline-block counter-plus" onClick={incrementValue}>
                    <i className="fas fa-plus" />
                </div>
            </div>
        </div>
    );
}
