import React from 'react';

export default function SelectedRole({ onRemove, role }) {
    return (
        <div className="selected-role">
            <span className="container">
                <a className="btn" onClick={onRemove}>
                    x
                </a>
                <span className="role-name" style={{ color: '#fff' }}>
                    {role.name}
                </span>
            </span>
        </div>
    );
}
