import React from 'react';
import { toast } from 'react-toastify';
import ErrorToast from '../components/common/toasts/ErrorToast/ErrorToast';

export const fireErrorToast = (message) => {
    toast.error(<ErrorToast error={message} />, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });
};
