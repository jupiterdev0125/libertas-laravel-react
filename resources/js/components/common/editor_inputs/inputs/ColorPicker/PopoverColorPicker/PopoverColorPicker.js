import React, { useEffect, useRef } from 'react';
import { CustomPicker } from 'react-color';
import { EditableInput, Hue, Saturation } from 'react-color/lib/components/common';
import './popover-picker-classes.css';
import classnames from 'classnames';

const PopoverColorPicker = (props) => {
    const ref = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.isPopoverOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    const containerClasses = classnames('position-absolute popover-picker-container', {
        'd-none': !props.popoverOpen,
    });

    return (
        <div ref={ref} className={containerClasses}>
            <div className="popover-picker-saturation">
                <Saturation {...props} onChange={props.onChange} />
            </div>
            <div className="popover-picker-hue">
                <Hue {...props} onChange={props.onChange} />
            </div>
            <div className="popover-picker-input">
                <EditableInput {...props} value={props.hex} />
            </div>
        </div>
    );
};

export default CustomPicker(PopoverColorPicker);
