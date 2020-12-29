import React from 'react';
import ReactDOM from 'react-dom';
import { fixJSONIDIntParse, fixJSONIDIntStringify } from './utils';
import { DropdownView } from './DropdownView';
import { SelectedView } from './SelectedView';

export const BACKGROUND_COLOR = '#141e29';

class DropdownSelector extends React.Component {
    constructor(props) {
        super(props);
        this.listItems = props.allList;

        this.state = {
            dropdownVisible: false,
            selectedItems: props.selected,
        };

        this.handleChangeDropdownVisible = this.handleChangeDropdownVisible.bind(this);
        this.onHandleAddItem = this.onHandleAddItem.bind(this);
        this.onHandleRemoveItem = this.onHandleRemoveItem.bind(this);
    }

    handleChangeDropdownVisible(isVisible) {
        this.setState({
            dropdownVisible: isVisible,
            selectedItems: this.state.selectedItems,
        });
    }

    onHandleAddItem(itemToBeAdded) {
        const item = this.listItems.find((listItem) => listItem.id === itemToBeAdded.id);
        this.setState({
            dropdownVisible: false,
            selectedItems: this.state.selectedItems.concat([item]),
        });
    }

    onHandleRemoveItem(itemToBeRemoved) {
        const items = this.state.selectedItems.filter((item) => item.id !== itemToBeRemoved.id);

        this.setState({
            dropdownVisible: this.state.dropdownVisible,
            selectedItems: items,
        });
    }

    render() {
        const { dropdownVisible } = this.state;
        const { selectedItems } = this.state;
        return (
            <div>
                <input type="hidden" name="dropdown-data" value={fixJSONIDIntStringify(selectedItems)} />
                <SelectedView
                    data={this.listItems}
                    selected={selectedItems}
                    itemsNotToShow={[]}
                    dropdownVisible={dropdownVisible}
                    onDropdownVisibilityChange={(isVisible) => this.handleChangeDropdownVisible(isVisible)}
                    onHandleRemoveItem={this.onHandleRemoveItem}
                />
                <DropdownView
                    data={this.listItems}
                    selected={selectedItems}
                    itemsNotToShow={[]}
                    dropdownVisible={dropdownVisible}
                    onHandleAddItem={this.onHandleAddItem}
                />
            </div>
        );
    }
}

const dropdowns = document.getElementsByName('dropdown-selector');
dropdowns.forEach((dropdown) => {
    const allList = fixJSONIDIntParse(dropdown.dataset.all_types);
    const selected = fixJSONIDIntParse(dropdown.dataset.already_selected_types);
    ReactDOM.render(<DropdownSelector allList={allList} selected={selected} />, dropdown);
});

// TODO: https://stackoverflow.com/questions/47634287/laravel-5-5-render-a-react-component-in-a-blade-view-with-data-from-the-controll
