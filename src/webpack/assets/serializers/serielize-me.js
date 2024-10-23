export const serializeMeObj = async (obj) => {
  if (!obj) {
    return null;
  }

  const newObj = {};
  const { platform, pushname } = window?.Store?.Conn || {};
  const {
    eurl,
    filehash,
    fullDirectPath,
    previewDirectPath,
    previewEurl,
    timestamp,
    lastHostUsed: { ips } = {}
  } = obj?.profilePicThumb?.attributes || {};
  
  Object.assign(newObj, {
    id: obj.id || null,
    platform: platform || null,
    name: obj.name || null,
    shortName: obj.shortName || null,
    isBusiness: obj.isBusiness || false,
    pushname: pushname || null,
    eurl: eurl || null,
    filehash: filehash || null,
    fullDirectPath: fullDirectPath || null,
    previewDirectPath: previewDirectPath || null,
    previewEurl: previewEurl || null,
    timestamp: timestamp || null,
    ips: ips || null,
    status: obj?.status?.status || null,
  });

  return newObj;
};
