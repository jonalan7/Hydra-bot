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
  const infoMe = window?.Store?.Conn;
  const profilePicThumb = obj?.profilePicThumb?.attributes;
  Object.assign(newObj, {
    id: obj.id ? obj.id : null,
    platform: infoMe?.platform ? infoMe?.platform : null,
    name: obj.name ? obj.name : null,
    shortName: obj.shortName ? obj.shortName : null,
    isBusiness: obj.isBusiness ? obj.isBusiness : false,
    pushname: infoMe?.pushname ? infoMe?.pushname : null,
    eurl: profilePicThumb?.eurl ? profilePicThumb?.eurl : null,
    filehash: profilePicThumb?.filehash ? profilePicThumb?.filehash : null,
    fullDirectPath: profilePicThumb?.fullDirectPath
      ? profilePicThumb?.fullDirectPath
      : null,
    previewDirectPath: profilePicThumb?.previewDirectPath
      ? profilePicThumb?.previewDirectPath
      : null,
    previewEurl: profilePicThumb?.previewEurl
      ? profilePicThumb?.previewEurl
      : null,
    timestamp: profilePicThumb?.timestamp ? profilePicThumb?.timestamp : null,
    ips: profilePicThumb?.lastHostUsed?.ips
      ? profilePicThumb?.lastHostUsed?.ips
      : null,
    status: obj?.status?.status ? obj?.status?.status : null,
  });
  return newObj;
};
