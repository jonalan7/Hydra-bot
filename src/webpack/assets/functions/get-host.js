/**
 * Get information from the connected number
 */
export async function getHost() {
  return new Promise(async (resolve, reject) => {
    try {
      const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();
      if (fromwWid) {
        const infoUser = await Store.Contacts.ContactCollection.get(
          fromwWid._serialized
        );
        if (infoUser) {
          const result = await API.serializeMeObj(infoUser);
          return resolve(result);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}
