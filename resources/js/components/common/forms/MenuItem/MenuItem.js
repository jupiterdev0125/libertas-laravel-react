import React from 'react';

export default function MenuItem({ value, label, removeItemListener }) {
    return (
        <div className="multi-select-item">
            <button className="btn" onClick={() => removeItemListener(value)}>
                <i className="fas fa-times-circle" />
            </button>
            <div className="d-inline-block">{label}</div>
        </div>
    );
}
