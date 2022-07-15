export async function sendExist(chatId, returnChat = true, Send = true) {
    const checkType = await API.sendCheckType(chatId);
    if (!!checkType && checkType.status === 404) {
        return checkType;
    }

    let ck = await window.API.checkNumberStatus(chatId, false);
    if (
        ck.status === 404 ||
        ck &&
        ck.text &&
        typeof ck.text.includes === 'function' &&
        ck.text.includes('XmppParsingFailure')
    ) {
        return API.scope(chatId, true, ck.status, 'The number does not exist');
    }

    const chatWid = new window.Store.WidFactory.createWid(chatId);

    let chat =
        ck && ck.id && ck.id._serialized ?
        await window.API.getChat(ck.id._serialized) :
        undefined;

    if (ck.numberExists && chat === undefined) {
        var idUser = new window.Store.UserConstructor(chatId, {
            intentionallyUsePrivateConstructor: true,
        });
        chat = await window.Store.Chat.find(idUser);
    }

    if (!chat) {
        const storeChat = await window.Store.Chat.find(chatWid);
        if (storeChat) {
            chat =
                storeChat && storeChat.id && storeChat.id._serialized ?
                await window.API.getChat(storeChat.id._serialized) :
                undefined;
        }
    }

    if (!ck.numberExists && !chat.t && chat.isUser) {
        return window.API.scope(chatId, true, ck.status, 'The number does not exist');
    }

    if (!ck.numberExists && !chat.t && chat.isGroup) {
        return window.API.scope(
            chatId,
            true,
            ck.status,
            'The group number does not exist on your chat list, or it does not exist at all!'
        );
    }

    if (!chat) {
        return window.API.scope(chatId, true, 404);
    }

    if (Send) {
        await window.Store.ReadSeen.sendSeen(chat, false);
    }

    if (returnChat) {
        return chat;
    }
    return window.API.scope(chatId, false, 200);
}