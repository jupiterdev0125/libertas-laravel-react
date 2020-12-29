import React from 'react';

export default function TagInput({ value, setValue }) {
    return (
        <input
            type="text"
            className="form-control"
            required
            value={`@${value || ''}`}
            onChange={(e) => setValue(e.currentTarget.value.replace('@', ''))}
            style={{ paddingLeft: `${10}px` }}
        />
    );
}
