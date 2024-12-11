/**
 * Function to check if the number exists and return the chat
 * @param {*} chatId
 * @param {*} returnChat
 * @param {*} Send
 * @returns
 */
export const sendExist = async (chatId, returnChat = true, Send = true) => {
  try {
    const checkContact = API.getContact(chatId);
    if (checkContact) {
      return await API.returnChat(chatId);
    }

    const checkType = await API.sendCheckType(chatId);
    if (!!checkType && checkType.status === 404) {
      return checkType;
    }

    let ck = await API.checkNumberStatus(chatId, false);
    if (
      (ck.status === 404 &&
        !chatId.includes('@g.us') &&
        !chatId.includes('@broadcast')) ||
      (ck &&
        ck.text &&
        typeof ck.text.includes === 'function' &&
        ck.text.includes('XmppParsingFailure'))
    ) {
      throw API.scope(chatId, true, ck.status, 'The number does not exist');
    }

    const chatWid = new Store.WidFactory.createWid(chatId);

    let chat =
      ck && ck.id && ck.id._serialized
        ? await API.getChat(ck.id._serialized)
        : undefined;

    if (ck.numberExists && chat === undefined) {
      var idUser = new Store.UserConstructor(chatId, {
        intentionallyUsePrivateConstructor: true,
      });
      chat = await Store.Chat.find(idUser);
    }

    if (!chat) {
      const storeChat = await Store.Chat.find(chatWid);
      if (storeChat) {
        chat =
          storeChat && storeChat.id && storeChat.id._serialized
            ? await API.getChat(storeChat.id._serialized)
            : undefined;
      }
    }

    if (!ck.numberExists && !chat.t && chat.isUser) {
      throw API.scope(chatId, true, ck.status, 'The number does not exist');
    }

    if (!ck.numberExists && !chat.t && chat.isGroup) {
      throw API.scope(
        chatId,
        true,
        ck.status,
        'The group number does not exist on your chat list, or it does not exist at all!'
      );
    }

    if (!chat) {
      throw API.scope(chatId, true, 404);
    }

    if (Send) {
      await Store.ReadSeen.sendSeen(chat, false);
    }

    if (returnChat) {
      return chat;
    }
    return API.scope(chatId, false, 200);
  } catch (error) {
    throw error;
  }
};
