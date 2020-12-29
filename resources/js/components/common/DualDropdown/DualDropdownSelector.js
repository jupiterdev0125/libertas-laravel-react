import React from 'react';
import ReactDOM from 'react-dom';
import { fixJSONIDIntParse, fixJSONIDIntStringify } from './utils';
import { SelectedView } from './SelectedView';
import { DropdownView } from './DropdownView';

export class DualDropdownSelector extends React.Component {
    constructor(props) {
        super(props);
        this.listItems = props.allList;

        this.state = {
            dropdownAllowedVisible: false,
            dropdownBannedVisible: false,
            selectedAllowedItems: props.selectedAllowed || [],
            selectedBannedItems: props.selectedBanned || [],
        };

        this.handleChangeDropdownVisible = this.handleChangeDropdownVisible.bind(this);
        this.onHandleAddItem = this.onHandleAddItem.bind(this);
        this.onHandleRemoveItem = this.onHandleRemoveItem.bind(this);
    }

    handleChangeDropdownVisible(isVisible, isAllowedDropdown) {
        if (isAllowedDropdown) {
            this.setState({
                dropdownAllowedVisible: isVisible,
                dropdownBannedVisible: this.state.dropdownBannedVisible,
                selectedAllowedItems: this.state.selectedAllowedItems,
                selectedBannedItems: this.state.selectedBannedItems,
            });
        } else {
            this.setState({
                dropdownAllowedVisible: this.state.dropdownAllowedVisible,
                dropdownBannedVisible: isVisible,
                selectedAllowedItems: this.state.selectedAllowedItems,
                selectedBannedItems: this.state.selectedBannedItems,
            });
        }
    }

    onHandleAddItem(itemToBeAdded, isAllowedDropdown) {
        const item = this.listItems.find((listItem) => listItem.id === itemToBeAdded.id);
        if (isAllowedDropdown) {
            this.setState({
                dropdownAllowedVisible: false,
                dropdownBannedVisible: this.state.dropdownBannedVisible,
                selectedAllowedItems: this.state.selectedAllowedItems.concat([item]),
                selectedBannedItems: this.state.selectedBannedItems,
            });
        } else {
            this.setState({
                dropdownAllowedVisible: this.state.dropdownAllowedVisible,
                dropdownBannedVisible: false,
                selectedAllowedItems: this.state.selectedAllowedItems,
                selectedBannedItems: this.state.selectedBannedItems.concat([item]),
            });
        }
    }

    onHandleRemoveItem(itemToBeRemoved, isAllowedDropdown) {
        if (isAllowedDropdown) {
            const items = this.state.selectedAllowedItems.filter((item) => item.id !== itemToBeRemoved.id);
            this.setState({
                dropdownAllowedVisible: this.state.dropdownAllowedVisible,
                dropdownBannedVisible: this.state.dropdownBannedVisible,
                selectedAllowedItems: items,
                selectedBannedItems: this.state.selectedBannedItems,
            });
        } else {
            const items = this.state.selectedBannedItems.filter((item) => item.id !== itemToBeRemoved.id);
            this.setState({
                dropdownAllowedVisible: this.state.dropdownAllowedVisible,
                dropdownBannedVisible: this.state.dropdownBannedVisible,
                selectedAllowedItems: this.state.selectedAllowedItems,
                selectedBannedItems: items,
            });
        }
    }

    render() {
        const { dropdownAllowedVisible } = this.state;
        const { dropdownBannedVisible } = this.state;
        const { selectedAllowedItems } = this.state;
        const { selectedBannedItems } = this.state;
        return (
            <>
                <div className="container">
                    <p>Allowed roles</p>
                    <span>Anyone with these roles can use this command. Adding @everyone means everyone!</span>
                    <input
                        type="hidden"
                        name="dualdropdown-allowed-data"
                        value={fixJSONIDIntStringify(selectedAllowedItems)}
                    />
                    <SelectedView
                        data={this.listItems}
                        selected={selectedAllowedItems}
                        itemsNotToShow={selectedBannedItems}
                        dropdownVisible={dropdownAllowedVisible}
                        onDropdownVisibilityChange={(isVisible) => this.handleChangeDropdownVisible(isVisible, true)}
                        onHandleRemoveItem={(itemToBeRemoved) => this.onHandleRemoveItem(itemToBeRemoved, true)}
                    />
                    <DropdownView
                        data={this.listItems}
                        selected={selectedAllowedItems}
                        itemsNotToShow={selectedBannedItems}
                        dropdownVisible={dropdownAllowedVisible}
                        onHandleAddItem={(itemToBeAdded) => this.onHandleAddItem(itemToBeAdded, true)}
                    />
                </div>
                <br />
                <br />
                <div className="container">
                    <p>Banned roles</p>
                    <span>Anyone with these roles can not use this command.</span>
                    <input
                        type="hidden"
                        name="dualdropdown-banned-data"
                        value={fixJSONIDIntStringify(selectedBannedItems)}
                    />
                    <SelectedView
                        data={this.listItems}
                        selected={selectedBannedItems}
                        itemsNotToShow={selectedAllowedItems}
                        dropdownVisible={dropdownBannedVisible}
                        onDropdownVisibilityChange={(isVisible) => this.handleChangeDropdownVisible(isVisible, false)}
                        onHandleRemoveItem={(itemToBeRemoved) => this.onHandleRemoveItem(itemToBeRemoved, false)}
                    />
                    <DropdownView
                        data={this.listItems}
                        selected={selectedBannedItems}
                        itemsNotToShow={selectedAllowedItems}
                        dropdownVisible={dropdownBannedVisible}
                        onHandleAddItem={(itemToBeAdded) => this.onHandleAddItem(itemToBeAdded, false)}
                    />
                </div>
            </>
        );
    }
}

const dropdowns = document.getElementsByName('dual-dropdown-selector');
dropdowns.forEach((dropdown) => {
    const allList = fixJSONIDIntParse(dropdown.dataset.all_types);
    const selectedAllowed = fixJSONIDIntParse(dropdown.dataset.already_selected_allowed_types);
    const selectedBanned = fixJSONIDIntParse(dropdown.dataset.already_selected_banned_types);
    ReactDOM.render(
        <DualDropdownSelector allList={allList} selectedAllowed={selectedAllowed} selectedBanned={selectedBanned} />,
        dropdown,
    );
});
