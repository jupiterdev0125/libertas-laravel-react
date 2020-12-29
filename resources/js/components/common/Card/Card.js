import React from 'react';
import classnames from 'classnames';

export default function Card({ children, className, containerClassNames }) {
    const classNames = classnames('card', 'm-bot-1', 'card-smaller-radius', className);

    const containerClasses = classnames('container', containerClassNames);

    return (
        <div className={classNames}>
            <div className={containerClasses}>{children}</div>
        </div>
    );
}
