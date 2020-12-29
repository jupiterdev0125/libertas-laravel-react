import React, { Fragment } from 'react';
import classnames from 'classnames';

export default function EmbedEditorFieldArea({
    hideDescription,
    description,
    infoText,
    field,
    isActive,
    alwaysDisplay,
    subField,
    showOptional = false,
}) {
    const selectedClass = classnames('d-inline text-uppercase d-flex m-0 align-items-center', {
        'vertical-middle': subField,
        'font-600': !subField,
    });
    return isActive || alwaysDisplay ? (
        <div className="m-bot-1">
            {!hideDescription && (
                <>
                    <p className={selectedClass}>
                        {description}
                        {showOptional && <span className="libertas-bot-label ml-1 mb-1"> optional </span>}
                    </p>
                </>
            )}
            {field}
        </div>
    ) : null;
}
