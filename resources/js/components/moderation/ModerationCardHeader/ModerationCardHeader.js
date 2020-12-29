import React from 'react';
import classnames from 'classnames';
import HelpIcon from '../HelpIcon/HelpIcon';

export default function ModerationCardHeader({
    text,
    uppercase,
    handleToggling,
    isEnabled,
    setSelectedCommand,
    command,
    withHelpIcon,
    noButtons,
}) {
    const textClassNames = classnames(
        'col-6',
        'title',
        'text-left',
        'font-600',
        'section-header-text',
        {
            'text-uppercase': uppercase,
            'no-help-icon': !withHelpIcon,
        },
    );

    const btnClasses = classnames('btn', {
        'btn-enabled': isEnabled,
        'btn-disabled': !isEnabled,
    });

    const rowClassNames = classnames('row', {
        'row-padding-no-help-icon': !withHelpIcon,
    });

    const onClickExpand = (event) => {
        event.preventDefault();
        // Only capture the event if it was in the empty areas in the header
        if (event.target.id === 'header-left' || event.target.id === 'header-right') {
            // handle
            setSelectedCommand(command);
        }
    };

    return (
        <div className={rowClassNames} onClick={onClickExpand}>
            <div className={textClassNames} id="header-left">
                {text}
            </div>
            {!noButtons && (
                <div
                    id="header-right"
                    className="col-6 md-text-center lg-my-auto lg-text-right d-flex align-items-center justify-content-end"
                >
                    {withHelpIcon && <HelpIcon className="p-2" />}
                    <button className={btnClasses} onClick={handleToggling}>
                        {isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                </div>
            )}
        </div>
    );
}
