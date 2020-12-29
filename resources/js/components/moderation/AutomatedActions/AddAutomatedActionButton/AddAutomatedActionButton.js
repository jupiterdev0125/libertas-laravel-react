import React from 'react';

export default function AddAutomatedActionButton({ addActionListener }) {
    const handleClicked = (event) => {
        event.preventDefault();
        addActionListener();
    };

    return (
        <div className="row plugin-card mb-3">
            <div className="container">
                <a className="cursor-pointer" onClick={handleClicked}>
                    <div className="enabled text-center">
                        <div className="row h-100">
                            <div className="col-12 my-auto libertas-green">
                                <i className="fas  fa-plus-circle" />
                                <br />
                                <p className="text-uppercase">add automated response</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
