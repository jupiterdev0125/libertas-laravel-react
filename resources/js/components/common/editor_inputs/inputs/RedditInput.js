import React from 'react';

export default function RedditInput({ value, setValue }) {
    return (
        <input
            type="text"
            className="form-control"
            required
            value={`/r/${value || ''}`}
            onChange={(e) => setValue(e.currentTarget.value.replace('/r/', ''))}
            style={{ paddingLeft: `${10}px` }}
        />
    );
}
