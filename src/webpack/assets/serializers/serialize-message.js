/**
 * Function to serialize a message object
 * @param {*} obj
 * @param {*} groupInfo
 * @returns
 */
export const serializeMessageObj = async (obj, groupInfo = true) => {
  if (obj === undefined) {
    return null;
  }

  let objGroup = null;
  if (groupInfo) {
    let chats = await API.getAllChats();
    if (chats) {
      objGroup =
        obj?.to?.server === 'g.us' || obj?.from?.server === 'g.us'
          ? chats.find(
              (chat) => chat?.id?._serialized === obj?.from?._serialized
            ).contact
          : null;
    }
  }

  const obkAds = {
    conversionSource: obj?.ctwaContext?.conversionSource,
    description: obj?.ctwaContext?.description,
    isSuspiciousLink: obj?.ctwaContext?.isSuspiciousLink,
    mediaType: obj?.ctwaContext?.mediaType,
    mediaUrl: obj?.ctwaContext?.mediaUrl,
    sourceUrl: obj?.ctwaContext?.sourceUrl,
    thumbnail: obj?.ctwaContext?.thumbnail,
    thumbnailUrl: obj?.ctwaContext?.thumbnailUrl,
    title: obj?.ctwaContext?.title,
  };

  const _chat = obj?.chat ? await API.serializeChatObj(obj?.chat) : {};

  const isMedia =
    obj.clientUrl !== undefined ? obj.clientUrl : obj.deprecatedMms3Url;

  const quotedStanzaId = obj?.quotedStanzaID || obj?.quotedStanzaID;

  if (obj?.quotedMsg && obj?.quotedMsg.messageSecret) {
    obj.quotedMsg.messageSecret = null;
  }

  return {
    ...window.API.serializeRawObj(obj),
    id: obj?.id?._serialized,
    msgKey: obj?.id,
    from: obj?.from?._serialized,
    quotedParticipant:
      obj?.quotedParticipant?._serialized ||
      obj?.quotedParticipant?._serialized,
    author: obj?.author?._serialized || obj?.author?._serialized,
    chatId: obj?.id?.remote || obj?.chatId?._serialized,
    to: obj?.to?._serialized,
    fromMe: obj?.id?.fromMe,
    sender: obj?.senderObj
      ? await API.serializeContactObj(obj?.senderObj)
      : null,
    timestamp: obj?.t,
    description: obj?.description,
    content: obj?.body,
    body: obj?.body,
    isLink: obj?.isLink,
    isMedia: isMedia ? true : false,
    isNotification: obj?.isNotification,
    isPSA: obj?.isPSA,
    type: obj?.type,
    chat: _chat,
    isOnline: _chat?.isOnline,
    lastSeen: _chat?.lastSeen,
    quotedMsgObj: obj?.quotedMsg,
    quotedStanzaId: quotedStanzaId,
    mediaData: API.serializeRawObj(obj?.mediaData),
    caption: obj?.caption,
    deprecatedMms3Url: obj?.deprecatedMms3Url,
    directPath: obj?.directPath,
    encFilehash: obj?.encFilehash,
    filehash: obj?.filehash,
    filename: obj?.filename,
    mimetype: obj?.mimetype,
    clientUrl: obj?.clientUrl,
    mediaKey: obj?.mediaKey,
    size: obj?.size,
    t: obj?.t,
    isNewMsg: obj?.isNewMsg,
    linkPreview: obj?.linkPreview,
    text: obj?.text,
    height: obj?.height,
    width: obj?.width,
    self: obj?.self,
    initialPageSize: obj?.initialPageSize,
    lat: obj?.lat,
    lng: obj?.lng,
    ack: obj?.ack,
    scanLengths: null,
    scansSidecar: null,
    streamingSidecar: null,
    waveform: null,
    replyButtons: obj?.replyButtons,
    dynamicReplyButtons: obj?.dynamicReplyButtons,
    buttons: obj?.buttons,
    hydratedButtons: obj?.hydratedButtons,
    subtype: obj?.subtype,
    thumbnail: obj?.thumbnail,
    isGroupMsg: obj?.to?.server === 'g.us' || obj?.from?.server === 'g.us',
    groupInfo: objGroup,
    title: obj?.title,
    ctwaContext: obj?.ctwaContext || obkAds,
    messageSecret: null,
  };
};
