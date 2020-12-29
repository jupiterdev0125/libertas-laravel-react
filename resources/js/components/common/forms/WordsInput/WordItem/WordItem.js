import React from 'react';

export default function WordItem({ value, wordRemovedListener }) {
    return (
        <div className="words-input-item">
            <div className="d-inline-block font-600 words-item-text">{value}</div>
            <button className="btn words-input-btn" onClick={() => wordRemovedListener(value)}>
                <i className="fas fa-times " />
            </button>
        </div>
    );
}
