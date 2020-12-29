import React from 'react';

export default function ErrorToast({ error }) {
    return (
        <div className="d-flex align-items-stretch">
            <div className="col-1 toast-icon">
                <i className="fas fa-exclamation-triangle" />
            </div>
            <div className="col-11">
                <span>{error}</span>
            </div>
        </div>
    );
}
