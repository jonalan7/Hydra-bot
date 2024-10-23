/**
 * returns a list of contacts
 * @returns contacts
 */
export const getAllContacts = function () {
    const filterIsContact = Store.Contact._models.filter(
        (e) => e.isAddressBookContact
      );
      return filterIsContact.map((contact) => WAPI._serializeContactObj(contact));
};

