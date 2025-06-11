/**
 * Function to get a chat by its ID or serialized chat object.
 * @param {*} id - Chat ID or serialized chat object
 * @returns - {Object|boolean} - Returns the serialized chat object if found, otherwise false.
 */
export const getChatById = async (id) => {
  try {
    if (id) {
      let found = await API.getChat(id);
      if (found) {
        return API.serializeChatObj(found);
      }
    }
    return false;
  } catch {
    return false;
  }
};
