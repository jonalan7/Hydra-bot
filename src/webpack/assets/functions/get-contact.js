/**
 * Function to get contact by id
 * @param {*} id
 * @returns
 */
export const getContact = (id) => {
  const found = Store.Contact.get(id);
  if (found) {
    return API.serializeContactObj(found);
  }
  return false;
};
