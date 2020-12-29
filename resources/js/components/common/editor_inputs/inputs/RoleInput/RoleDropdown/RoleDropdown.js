import React, { useState } from 'react';
import LoadingIndicator from '../../../../LoadingIndicator/LoadingIndicator';
import './role-dropdown.css';

export default function RoleDropdown({ roles, setRoles, addableRoles }) {
    const [filter, setFilter] = useState('');

    const addRole = (role) => setRoles([...roles, role]);

    const filterAddableRoles = () => {
        if (filter === '') {
            return addableRoles;
        }

        return addableRoles.filter((addableRole) => addableRole.name.toLowerCase().startsWith(filter.toLowerCase()));
    };

    if (addableRoles?.length === 0) {
        return 'All roles have been assigned';
    }

    return (
        <div className="role-dropdown no-scrollbar">
            <input
                type="text"
                className="form-control"
                value={filter}
                onChange={(e) => setFilter(e.currentTarget.value)}
                placeholder="Filter"
            />
            {addableRoles === undefined ? (
                <LoadingIndicator isLoaded={false} />
            ) : (
                filterAddableRoles().map((role) => (
                    <a className="role-item" onClick={() => addRole(role)} style={{ color: '#fff' }} key={role.id}>
                        {role.name}
                    </a>
                ))
            )}
        </div>
    );
}
