/**
 * building a chat number
 * @param {string} chatId Contact number
 * @returns {(Object|undefined)}
 */
export const getChat = async (chatId) => {
  if (!chatId) return false;

  chatId = typeof chatId == 'string' ? chatId : chatId._serialized;
  let found = window.Store.Chat.get(chatId);

  if (!found) {
    if (Store.CheckWid.validateWid(chatId)) {
      const ConstructChat = new window.Store.UserConstructor(chatId, {
        intentionallyUsePrivateConstructor: !0,
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
      found = Store.Chat.find(ConstructChat) || false;
    }
  }
  if (found) {
    found.sendMessage = found.sendMessage
      ? found.sendMessage
      : function () {
          return window.Store.sendMessage.apply(this, arguments);
        };
  }
  return found;
};
