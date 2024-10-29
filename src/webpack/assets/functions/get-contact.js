/**
 * Function to get contact by id
 * @param {*} id 
 * @returns 
 */
export const getContact = (id) => {
    const found = window.Store.Contact.get(id);
    if (found) {
        return window.API.serializeContactObj(found);
    }
    return false;
};
