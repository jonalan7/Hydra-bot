/**
 * Serializes a chat object
 * @param rawChat Chat object
 * @returns {Chat}
 */
export const serializeChatObj = (obj) => {
  if (obj == undefined) {
    return null;
  }
  return Object.assign(API.serializeRawObj(obj), {
    kind: obj?.kind,
    contact: obj?.contact ? API.serializeContactObj(obj?.contact) : null,
    groupMetadata: obj?.groupMetadata
      ? API.serializeRawObj(obj?.groupMetadata)
      : null,
    presence: obj?.presence ? API.serializeRawObj(obj?.presence) : null,
    msgs: null,
    tcToken: null,
    isOnline: obj?.__x_presence?.attributes?.isOnline,
    lastSeen: obj?.previewMessage?.__x_ephemeralStartTimestamp
      ? obj.previewMessage.__x_ephemeralStartTimestamp * 1000
      : null,
  });
};
