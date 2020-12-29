import React from 'react';

export default function ElementField({ onClick, active, innerText }) {
    return (
        <button className={`btn element-field ${active ? 'btn-disabled' : 'btn-enabled'}`} onClick={onClick}>
            {innerText}
        </button>
    );
}
