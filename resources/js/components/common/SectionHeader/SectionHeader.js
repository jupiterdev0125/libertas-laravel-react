import React from 'react';
import classnames from 'classnames';
import HelpIcon from '../../moderation/HelpIcon/HelpIcon';

export default function SectionHeader({ title, withHelpIcon, noBottomMargins }) {
    const rowClassNames = classnames('col-12 col-lg-6 title md-text-center m-top-1', {
        'mob-m-bot-1 sm-m-bot-1 md-m-bot-1': !noBottomMargins,
    });

    return (
        <div className="row">
            <div className={rowClassNames}>
                <h1 className="vertical-middle font-600">{title}</h1>
            </div>
            {withHelpIcon && (
                <div className="col-lg-6 md-text-center lg-my-auto lg-text-right d-flex flex-row-reverse align-items-center">
                    <HelpIcon className="pb-2 pr-2" />
                </div>
            )}
        </div>
    );
}
