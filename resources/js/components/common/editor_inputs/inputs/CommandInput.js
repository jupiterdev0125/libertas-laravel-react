import React, { Fragment } from 'react';

export default function CommandInput({ value, setValue, command }) {
    return (
        <>
            <p className="d-inline text-uppercase">
                {command.type}
                {' '}
                command
            </p>
            <div>
                <input
                    type="text"
                    className="form-control"
                    required
                    value={`!${value || ''}`}
                    onChange={(e) => setValue(e.currentTarget.value.replace('!', ''))}
                    style={{ paddingLeft: `${10}px` }}
                />
            </div>
        </>
    );
}
