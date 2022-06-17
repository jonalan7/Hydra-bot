/**
 * returns a list of contacts
 * @returns contacts
 */
export const getAllContacts = function () {
    const allContacts = window.Store.Contact.map((contact) =>
        API.serializeContactObj(contact)
    );
    return allContacts.filter((result) =>
        result.isUser === true
    );
};

