import React from 'react';
import { DropdownList } from './DropdownList';
import { BACKGROUND_COLOR } from './DropdownSelector';

export class DropdownView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
        };
        this.onTypingInSearch = this.onTypingInSearch.bind(this);
        this.onHandleAddItem = this.onHandleAddItem.bind(this);
    }

    onTypingInSearch(e) {
        this.setState({
            searchString: e.target.value,
        });
    }

    onHandleAddItem(item) {
        this.props.onHandleAddItem(item);
        this.setState({
            searchString: '',
        });
    }

    getItemsNotSelected() {
        return (
            this.props.data
                // This filter is added for dualdropdown.
                .filter((item) => !this.props.itemsNotToShow.some((itemNotToShow) => item.id === itemNotToShow.id))
                .filter((item) => !this.props.selected.map((seletedItem) => seletedItem.id).includes(item.id))
        );
    }

    render() {
        const { dropdownVisible } = this.props;
        const selectedItems = this.props.selected;

        if (this.props.dropdownVisible && this.getItemsNotSelected().length > 0) {
            return (
                <div
                    className="card"
                    style={{
                        maxWidth: '300px',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        marginLeft: '30px',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: BACKGROUND_COLOR,
                            padding: '10px',
                        }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onTypingInSearch}
                            placeholder="Filter"
                            style={{ margin: '5px' }}
                        />
                        <DropdownList
                            data={this.props.data}
                            selected={selectedItems}
                            itemsNotToShow={this.props.itemsNotToShow}
                            dropdownVisible={dropdownVisible}
                            searchString={this.state.searchString}
                            onHandleAddItem={this.onHandleAddItem}
                        />
                    </div>
                </div>
            );
        } if (this.props.dropdownVisible && this.getItemsNotSelected().length === 0) {
            return (
                <div className="card" style={{ maxWidth: '300px', height: '0px' }}>
                    All roles have been asigned
                </div>
            );
        }
        if (this.state.searchString !== '') {
            this.setState({
                searchString: '',
            });
        }
        return <></>;
    }
}
