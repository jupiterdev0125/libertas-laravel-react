import React from 'react';

export class SelectedItem extends React.Component {
    constructor(props) {
        super(props);
        this.onRemove = this.onRemove.bind(this);
    }

    onRemove() {
        this.props.onHandeRemoveItem(this.props.data);
    }

    render() {
        return (
            <span
                className="container"
                style={{
                    backgroundColor: '#8ec5c5',
                    borderRadius: '1rem',
                    marginRight: '1rem',
                    padding: '0.2rem 1rem 0.2rem 0rem',
                    color: '#FFF',
                }}
            >
                <a className="btn" style={{ color: '#FFF', marginBottom: '0.2rem' }} onClick={this.onRemove}>
                    x
                </a>
                {' '}
                {this.props.data.name}
            </span>
        );
    }
}
