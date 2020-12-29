import React from 'react';
import classnames from 'classnames';

export const ADD = 'add';
export const EDIT = 'edit';

export default function Selection({ title, onClick, icon }) {
    const iconClasses = classnames('fas', 'mb-1', 'libertas-green-new', {
        'fa-plus-circle': !icon || icon === ADD,
        'fa-edit': icon && icon === EDIT,
    });

    return (
        <a onClick={onClick} className="cursor-pointer">
            <div className="enabled text-center">
                <div className="row h-100">
                    <div className="col-12 my-auto libertas-green font-600">
                        <i className={iconClasses} />
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </a>
    );
}
