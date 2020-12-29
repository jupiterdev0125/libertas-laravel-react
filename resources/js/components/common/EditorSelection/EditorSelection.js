import React from 'react';
import Selection from './Selection';

export default function EditorSelection({ selections }) {
    let responsiveClasses = 'col-md-6 col-lg-3';

    if (selections.length === 3) {
        responsiveClasses = 'col-md-4 col-lg-4';
    }

    if (selections.length === 2) {
        responsiveClasses = 'col-md-6 col-lg-6';
    }

    if (selections.length === 1) {
        responsiveClasses = '';
    }

    return (
        <div className="row m-bot-4 add-buttons">
            {selections.map((selection, i) => (
                <div key={i} className={`${responsiveClasses} col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1`}>
                    <Selection {...selection} />
                </div>
            ))}
        </div>
    );
}
