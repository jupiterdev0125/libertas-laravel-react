import { toast } from 'react-toastify';
import React from 'react';
import ErrorToast from '../../components/common/toasts/ErrorToast/ErrorToast';
import SuccessToast from '../../components/common/toasts/SuccessToast/SuccessToast';

export const validateImageResult = (validationsStatus) => {
    if (Object.keys(validationsStatus).length !== 0) {
        if (!validationsStatus.valid) {
            let message;
            switch (validationsStatus.status) {
            case 422: {
                message = validationsStatus.message.errors.image[0];
                break;
            }
            case 413: {
                message = 'Image is too large, image size must be under 4 mb.';
                break;
            }
            default: {
                message = 'Failed to validate image, please try again later.';
            }
            }
            toast.error(<ErrorToast error={message} />, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
};
