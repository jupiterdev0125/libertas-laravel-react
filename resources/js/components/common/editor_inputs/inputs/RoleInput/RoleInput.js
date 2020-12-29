import React, { Fragment, useState } from 'react';
import SelectedRole from './SelectedRole';
import RoleDropdown from './RoleDropdown/RoleDropdown';
import './role-input.css';

export default function RoleInput({ roles, addableRoles, setRoles }) {
    const [dropdownActive, setDropdownActive] = useState(false);

    const deleteRole = (role) => setRoles(roles.filter((allowedRole) => role.id !== allowedRole.id));

    const setRolesAndHideDropdown = (x) => {
        setDropdownActive(false);
        setRoles(x);
    };

    return (
        <>
            <div className="form-control selected-roles">
                {roles.map((role) => (
                    <SelectedRole role={role} onRemove={() => deleteRole(role)} key={role.id} />
                ))}
                <i onClick={() => setDropdownActive(!dropdownActive)} className="fas fa-plus-circle" />
            </div>
            <div>
                {dropdownActive ? (
                    <RoleDropdown roles={roles} addableRoles={addableRoles} setRoles={setRolesAndHideDropdown} />
                ) : null}
            </div>
        </>
    );
}
