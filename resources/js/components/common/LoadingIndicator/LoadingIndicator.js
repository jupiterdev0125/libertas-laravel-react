import React from 'react';
import './loading-indicator.css';

export default function LoadingIndicator({ error, isLoaded, content }) {
    if (error) {
        return (
            <div>
                Error:
                {error.message}
            </div>
        );
    } if (!isLoaded) {
        return (
            <div>
                <div className="spinner" />
            </div>
        );
    }
    return content !== undefined ? content : <div />;
}
