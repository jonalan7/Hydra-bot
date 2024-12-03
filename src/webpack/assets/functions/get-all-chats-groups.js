/**
 * get all chats groups
 * @returns
 */
export const getAllChatsGroups = async () => {
  try {
    const chats = await API.getAllChats();
    return chats.filter(
      (chat) =>
        chat.kind === 'group' ||
        chat.isGroup === true ||
        chat.id.server === 'g.us'
    );
  } catch (error) {
    throw error;
  }
};
