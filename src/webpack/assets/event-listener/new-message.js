export const eventNewMessage = async () => {
  window.Store.Msg.on('add', async (newMessage) => {
    if (newMessage?.isNewMsg) {
      const serialized = await API.serializeMessageObj(newMessage);
      if (typeof window.newMessage === 'function') {
        window.newMessage(serialized);
      }
    }
  });
};
