/**
 * Get information from the connected number
 */
export async function getHost() {
  try {
    const fromwWid = await Store.MaybeMeUser.getMaybeMePnUser();
    if (fromwWid) {
      const infoUser = await Store.Contacts.ContactCollection.get(
        fromwWid._serialized
      );
      if (infoUser) {
        const result = await API.serializeMeObj(infoUser);
        return result;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}
