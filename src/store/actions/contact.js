export const CONTACT_REQUEST = 'CONTACT_REQUEST';
export const CONTACT_SUCCESS = 'CONTACT_SUCCESS';
export const CONTACT_FAIL = 'CONTACT_FAIL';

export function ContactRequest(formData, cb) {
    return {
        type: CONTACT_REQUEST,
        payload: {
            formData, cb
        }
    }
}
