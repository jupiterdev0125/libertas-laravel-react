export const ajaxPost = (actionUrl, csrfToken, formData) => fetch(actionUrl, {
    method: 'POST',
    headers: {
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
    },
    body: formData,
});
