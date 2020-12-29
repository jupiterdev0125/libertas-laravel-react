import React from 'react';
import EmbedLink from './EmbedLink';

export default function EmbedAuthor({ name, url, iconUrl }) {
    if (!name) {
        return null;
    }

    let authorName;
    if (name) {
        authorName = <span className="embed-author-name">{name}</span>;
        if (url) {
            authorName = (
                <EmbedLink href={url} className="embed-author-name">
                    {name}
                </EmbedLink>
            );
        }
    }

    const authorIcon = iconUrl ? <img src={iconUrl} role="presentation" className="embed-author-icon" /> : null;

    return (
        <div className="embed-author">
            {authorIcon}
            {authorName}
        </div>
    );
}
