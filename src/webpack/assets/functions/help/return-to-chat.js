/**
 * Function to return to chat or create a new chat
 * @param {*} chatId - Chat ID
 * @param {*} returnChat - Return Chat
 * @param {*} Send - Seen to message
 * @returns
 */
export const returnChat = async (chatId, returnChat = true, Send = true) => {
  const checkType = API.sendCheckType(chatId);
  if (!!checkType && checkType.status === 404) {
    return checkType;
  }

  let chat = await window.API.getChat(chatId);
  if (!chat) {
    var idUser = new Store.UserConstructor(chatId, {
      intentionallyUsePrivateConstructor: true,
    });
    const chatWid = new Store.WidFactory.createWid(chatId);
    await Store.Chat.add(
      {
        createdLocally: true,
        id: chatWid,
      },
      {
        merge: true,
      }
    );
    chat = await Store.Chat.find(idUser);
  }

  if (chat === undefined) {
    const chatWid = new Store.WidFactory.createWid(chatId);
    await Store.Chat.add(
      {
        createdLocally: true,
        id: chatWid,
      },
      {
        merge: true,
      }
    );
    const storeChat = await Store.Chat.find(chatId);
    if (storeChat) {
      chat =
        storeChat && storeChat.id && storeChat.id._serialized
          ? await window.API.getChat(storeChat.id._serialized)
          : undefined;
    }
  }

  if (!chat) {
    return API.scope(chatId, true, 404);
  }

  if (Send) {
    await window.Store.ReadSeen.sendSeen(chat, false);
  }

  if (returnChat) {
    return chat;
  }

  return API.scope(chatId, false, 200);
};
