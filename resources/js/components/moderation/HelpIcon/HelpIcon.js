import React from 'react';
import classnames from 'classnames';

export default function HelpIcon({ className }) {
    const classNames = classnames('help-icon', className);
    return (
        <div className={classNames}>
            <i className="far fa-question-circle fa-w-16" />
        </div>
    );
}
