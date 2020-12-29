import React from 'react';
import { BACKGROUND_COLOR } from './DropdownSelector';

export class DropdownList extends React.Component {
    onItemClickedHandler(item) {
        this.props.onHandleAddItem(item);
    }

    getItemsNotSelected() {
        return (
            this.props.data
                // This filter is added for dualdropdown.
                .filter((item) => !this.props.itemsNotToShow.some((itemNotToShow) => item.id === itemNotToShow.id))
                .filter((item) => !this.props.selected.map((selectedItem) => selectedItem.id).includes(item.id))
        );
    }

    filterItems(list) {
        const text = this.props.searchString;
        if (text == null || text === '') {
            return list;
        }
        return list.filter((item) => item.name.toLowerCase().startsWith(text.toLowerCase()));
    }

    render() {
        const toBeDisplayed = this.filterItems(this.getItemsNotSelected());
        return (
            <div className="list-group" style={{ maxHeight: '300px', overflow: 'auto' }}>
                {toBeDisplayed.map((item) => (
                    <a
                        href="javascript:void(0)" // TODO: can this be removed? => I assumed this was to make the mouseicon a hand.
                        className="list-group-item list-group-item-action list-group-item-dark"
                        onClick={() => this.onItemClickedHandler(item)}
                        style={{ color: '#FFF', backgroundColor: BACKGROUND_COLOR }}
                        key={item.id}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        );
    }
}
