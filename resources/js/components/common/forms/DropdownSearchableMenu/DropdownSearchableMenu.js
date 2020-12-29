import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import './dropdown_searchable_menu.css';

const filterValue = (term, list, labelProperty) => list.filter((item) => {
    const label = labelProperty ? item[labelProperty] : item;
    return label.toLowerCase().includes(term.toLowerCase());
});

export default function DropdownSearchableMenu({
    items,
    currentSelected,
    keyProp,
    searchPlaceholder,
    useDefaultButton,
    buttonIcon,
    buttonComponent,
    itemsPrefix,
    itemSelectedListener,
    labelProperty,
    valueProperty,
    single,
    hideSearch = false,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSearchItems, setFilteredSearchItems] = useState(items);
    const [allUsed, isAllUsed] = useState(false);

    const filterAllButCurrentItems = (itemsToFilter, selectedItems) => {
        if (!selectedItems || (!single && selectedItems.length === 0)) {
            return itemsToFilter;
        }
        if (itemsToFilter) {
            const filteredItems = itemsToFilter.filter((item) => {
                if (single) {
                    return item[keyProp] !== selectedItems[keyProp];
                }
                return !selectedItems.some((currentOne) => item[keyProp] === currentOne[keyProp]);
            });
            if (filteredItems.length === 0) {
                isAllUsed(true);
            } else {
                isAllUsed(false);
            }
            return filteredItems;
        }
        return [];
    };

    useEffect(() => {
        setFilteredSearchItems(filterAllButCurrentItems(items, currentSelected));
    }, [items, currentSelected]);

    const searchTermChanged = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setFilteredSearchItems(filterValue(value,
            filterAllButCurrentItems(items, currentSelected), labelProperty));
    };

    const itemSelected = (item) => {
        setSearchTerm('');
        itemSelectedListener(valueProperty ? item[valueProperty] : item);
    };

    const getItemsComponent = () => {
        if (filteredSearchItems && filteredSearchItems.length > 0) {
            return filteredSearchItems.map((item) => (
                <a
                    className="dropdown-item cursor-pointer"
                    onClick={() => itemSelected(item)}
                    key={item[keyProp]}
                >
                    {itemsPrefix && <div className="d-inline-block">{itemsPrefix}</div>}
                    {' '}
                    {labelProperty ? item[labelProperty] : item}
                </a>
            ));
        } if (searchTerm.length > 0 || allUsed) {
            return (
                <div className="dropdown-no-results">No results found...</div>
            );
        }
        return (
            <LoadingIndicator isLoaded={false} />
        );
    };

    return (
        <div className="btn-group">
            {useDefaultButton ? (
                <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {buttonIcon || <i className="fas fa-plus-circle " />}
                </button>
            ) : (
                buttonComponent
            )}

            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {!hideSearch && (
                    <form className="px-4 py-2">
                        <input
                            type="search"
                            className="form-control search"
                            placeholder={searchPlaceholder}
                            autoFocus="autofocus"
                            onChange={searchTermChanged}
                            value={searchTerm}
                        />
                    </form>
                )}
                <div className="menu-items-container">
                    {getItemsComponent()}
                </div>

            </div>
        </div>
    );
}
