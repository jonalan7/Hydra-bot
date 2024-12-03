/**
 * returns a list of contacts
 * @returns contacts
 */
export const getAllContacts = () => {
  try {
    const filterIsContact = Store.Contact._models.filter(
      (e) => e.isAddressBookContact
    );
    const result = filterIsContact.map((contact) =>
      API.serializeContactObj(contact)
    );
    return result;
  } catch (e) {
    throw error;
  }
};
