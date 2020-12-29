import React from 'react';

export default function SuccessToast({ message }) {
    return (
        <div className="d-flex align-items-stretch">
            <div className="col-1 toast-icon">
                <i className="fas fa-check-circle" />
            </div>
            <div className="col-11">
                <span>{message}</span>
            </div>
        </div>
    );
}
