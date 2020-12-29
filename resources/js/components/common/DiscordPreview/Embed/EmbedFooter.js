import React from 'react';

export default function EmbedFooter({ text, iconUrl }) {
    if (!text) {
        return null;
    }

    const footerIcon = text && iconUrl ? (
        <img src={iconUrl} className="embed-footer-icon" role="presentation" width="20" height="20" />
    ) : null;

    return (
        <div>
            {footerIcon}
            <span className="embed-footer">{text}</span>
        </div>
    );
}
