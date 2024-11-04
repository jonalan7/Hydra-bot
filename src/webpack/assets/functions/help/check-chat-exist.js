/**
 * Function to check if a number is registered on WhatsApp chat
 * @param {*} id - The phone number
 * @returns - Return the status of the number
 */
export const checkChatExist = async (id) => {
  try {
    const chat = await Store.Chat.find(id);
    if (chat?.chatEntryPoint === 'Chatlist') {
      return chat.id;
    }
  } catch {
    return false;
  }
};
