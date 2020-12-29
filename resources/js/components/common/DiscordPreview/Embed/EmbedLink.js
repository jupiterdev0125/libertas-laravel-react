import React from 'react';

export default function EmbedLink({ children, ...props }) {
    return (
        <a target="_blank" rel="noreferrer" {...props}>
            {children}
        </a>
    );
}
