import React from 'react';
import { SelectedItem } from './SelectedItem';
import { BACKGROUND_COLOR } from './DropdownSelector';

export class SelectedView extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
        this.onHandleRemoveItem = this.onHandleRemoveItem.bind(this);
    }

    handleOpenDropdown(e) {
        if (e.target === e.currentTarget) {
            this.props.onDropdownVisibilityChange(!this.props.dropdownVisible);
        }
    }

    onHandleRemoveItem(item) {
        this.props.onHandleRemoveItem(item);
    }

    render() {
        return (
            <div
                style={{
                    backgroundColor: BACKGROUND_COLOR,
                    padding: '10px',
                    borderRadius: '10rem',
                    paddingLeft: '2rem',
                }}
            >
                {this.props.selected
                    // This filter is added for dualdropdown.
                    .filter((item) => !this.props.itemsNotToShow.some((itemNotToShow) => item.id === itemNotToShow.id))
                    .map((item) => (
                        <SelectedItem
                            data={item}
                            key={item.id}
                            onHandeRemoveItem={() => this.onHandleRemoveItem(item)}
                        />
                    ))}
                <a onClick={this.handleOpenDropdown} className="btn btn-dark">
                    +
                </a>
            </div>
        );
    }
}
