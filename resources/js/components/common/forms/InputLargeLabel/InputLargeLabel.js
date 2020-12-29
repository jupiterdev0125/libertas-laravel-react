import React from 'react';

export default function InputLargeLabel({ text }) {
    return (
        <div className="row">
            <div className="col-12 col-lg-6 title md-text-center mob-m-bot-1 sm-m-bot-1 md-m-bot-1 m-top-1 text-uppercase font-600">
                {text}
            </div>
        </div>
    );
}
