/**
 * Serializes a chat object
 * @param rawChat Chat object
 * @returns {Chat}
 */
export const serializeChatObj = (obj) => {
  if (obj == undefined) {
    return null;
  }
  return Object.assign(window.API.serializeRawObj(obj), {
    kind: obj?.kind,
    isGroup: obj?.isGroup,
    contact: obj?.contact
      ? window.API.serializeContactObj(obj?.contact)
      : null,
    groupMetadata: obj?.groupMetadata
      ? window.API.serializeRawObj(obj?.groupMetadata)
      : null,
    presence: obj?.presence
      ? window.API.serializeRawObj(obj?.presence)
      : null,
    msgs: null,
    tcToken: null,
    isOnline: obj?.__x_presence?.attributes?.isOnline || null,
    lastSeen: obj?.previewMessage?.__x_ephemeralStartTimestamp
      ? obj.previewMessage.__x_ephemeralStartTimestamp * 1000
      : null,
  });
};