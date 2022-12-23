/**
 * Get information from the connected number
 */
export async function getHost() {
  const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();
  if (fromwWid) {
    const idUser = await API.sendExist(fromwWid._serialized);
    if (idUser && idUser.status !== 404) {
      const infoUser = await Store.Contacts.ContactCollection.get(
        fromwWid?._serialized
      );
      if (infoUser) {
        return await API.serializeMeObj(infoUser);
      }
    }
  }
  return {};
}
