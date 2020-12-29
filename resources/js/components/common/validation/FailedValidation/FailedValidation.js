import React from 'react';
import './failed-validation.css';

export default function FailedValidation({ message }) {
    return (
        <div className="invalid-feedback d-block failed-validation">
            {message}
        </div>
    );
}
