import React from 'react';
import { parseAllowLinks } from '../Markdown';

export default function EmbedDescription({ content }) {
    if (!content) {
        return null;
    }

    return <div className="embed-description markup">{parseAllowLinks(content)}</div>;
}
