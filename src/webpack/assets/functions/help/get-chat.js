export function getChat(chatId) {

    if (!chatId) return false;

    chatId = typeof chatId == 'string' ? chatId : chatId._serialized;
    let found = window.Store.Chat.get(chatId);

    if (!found) {
        if (Store.CheckWid.validateWid(chatId)) {
            const ConstructChat = new window.Store.UserConstructor(chatId, {
                intentionallyUsePrivateConstructor: !0,
            });
            found = window.Store.Chat.find(ConstructChat) || false;
        }
    }

    return found;
}