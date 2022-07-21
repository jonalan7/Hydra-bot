/**
 * Get information from the connected number
 */
export async function getHost() {
  const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();
  if (fromwWid) {
    const idUser = await API.sendExist(fromwWid._serialized);
    if (idUser && idUser.status !== 404) {
      const infoUser = await Store.MyStatus.getStatus(idUser);
      if (infoUser) {
        return await API.serializeMeObj(infoUser);
      }
    }
  }
}
