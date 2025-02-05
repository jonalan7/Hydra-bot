export const eventNewDeleteMessage = async () => {
  window.Store.Msg.on('remove remove_msgs', async (deletedMessage) => {
    if (deletedMessage) {
      const serialized = await API.serializeMessageObj(deletedMessage);
      if (typeof window.newDeleteMessage === 'function') {
        window.newDeleteMessage(serialized);
      }
    }
  });
};
