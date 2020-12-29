import React from 'react';
import './char_count.css';

export default function CharCount({ count, max }) {
    return (
        <div className="d-flex justify-content-end">
            <span className="char-count">
                {count > 0 && `${count} / `}
                {' '}
                {max}
            </span>
        </div>
    );
}
