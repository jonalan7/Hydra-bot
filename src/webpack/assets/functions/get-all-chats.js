/**
 * Function to get all chats
 * @returns - Array of chats
 */
export const getAllChats = async () => {
  const fromwWid = await Store.MaybeMeUser.getMaybeMePnUser();
  if (fromwWid) {
    const idUser = await API.returnChat(fromwWid._serialized);
    if (idUser && idUser.status !== 404) {
      const chats = Store.Chat.map((chat) => API.serializeChatObj(chat));
      return chats;
    }
  }
  return false;
};
