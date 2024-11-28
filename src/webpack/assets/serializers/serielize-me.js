/**
 * Function to serialize the me object
 * @param {*} obj
 * @returns
 */
export const serializeMeObj = async (obj) => {
  if (obj == undefined) {
    return null;
  }
  const newObj = {};
  const infoMe = Store?.Conn;
  const profilePicThumb = obj?.profilePicThumb?.attributes;
  Object.assign(newObj, {
    id: obj?.id,
    platform: infoMe?.platform,
    name: obj?.name,
    shortName: obj?.shortName,
    isBusiness: obj?.isBusiness,
    pushname: infoMe?.pushname,
    eurl: profilePicThumb?.eurl,
    filehash: profilePicThumb?.filehash,
    fullDirectPath: profilePicThumb?.fullDirectPath,
    previewDirectPath: profilePicThumb?.previewDirectPath,
    previewEurl: profilePicThumb?.previewEurl,
    timestamp: profilePicThumb?.timestamp,
    ips: profilePicThumb?.lastHostUsed?.ips,
    status: obj?.status?.status,
  });
  return newObj;
};
