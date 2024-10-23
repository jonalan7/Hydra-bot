export const serializeMessageObj = (obj) => {
    if (obj === undefined) {
        return null;
    }

    const serializedObj = window.API.serializeRawObj(obj);

    const chat = obj.chat ? API.serializeChatObj(obj.chat) : {};
    if (obj.quotedMsg) obj.quotedMsgObj();

    return {
        ...serializedObj,
        id: obj.id._serialized,
        from: obj.from._serialized,
        quotedParticipant: obj.quotedParticipant ? obj.quotedParticipant._serialized : undefined,
        author: obj.author ? obj.author._serialized : undefined,
        chatId: obj.id && obj.id.remote ? obj.id.remote : obj.chatId && obj.chatId._serialized ? obj.chatId._serialized : undefined,
        to: obj.to ? obj.to._serialized : undefined,
        isSentByMe: obj.isSentByMe,
        fromMe: obj.id.fromMe,
        sender: obj.senderObj ? API.serializeContactObj(obj.senderObj) : null,
        timestamp: obj.t,
        content: obj.body,
        body: obj.body,
        isGroupMsg: obj.isGroupMsg,
        isLink: obj.isLink,
        isMMS: obj.isMMS,
        isMedia: obj.isMedia,
        isNotification: obj.isNotification,
        isPSA: obj.isPSA,
        type: obj.type,
        chat: chat,
        isOnline: chat.isOnline,
        lastSeen: chat.lastSeen,
        quotedMsgObj: obj.quotedMsg,
        quotedStanzaId: obj.quotedStanzaID ? obj.quotedStanzaID : undefined,
        mediaData: window.API.serializeRawObj(obj.mediaData),
        caption: obj.caption,
        deprecatedMms3Url: obj.deprecatedMms3Url,
        directPath: obj.directPath,
        encFilehash: obj.encFilehash,
        filehash: obj.filehash,
        filename: obj.filename,
        mimetype: obj.mimetype,
        clientUrl: obj.clientUrl,
        mediaKey: obj.mediaKey,
        size: obj.size,
        t: obj.t,
        isNewMsg: obj.isNewMsg,
        linkPreview: obj.linkPreview,
        text: obj.text,
        height: obj.height,
        width: obj.width,
        self: obj.self,
        initialPageSize: obj.initialPageSize,
        lat: obj.lat ? obj.lat : undefined,
        lng: obj.lng ? obj.lng : undefined,
        ack: obj.ack,
        scanLengths: undefined,
        scansSidecar: undefined,
        streamingSidecar: undefined,
        waveform: undefined,
        replyButtons: undefined,
        dynamicReplyButtons: undefined,
        buttons: undefined,
        hydratedButtons: undefined,
        isGroupMsg: obj?.to?.server === 'g.us' || obj?.from?.server === 'g.us',
        groupInfo: (obj?.to?.server === 'g.us' || obj?.from?.server === 'g.us') ? chats.find((chat) => chat.id._serialized === obj.from._serialized).contact : null
    };
};
