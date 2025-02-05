export const eventNewEditMessage = async () => {
  window.Store.Msg.on('change:body', async (editedMessage) => {
    if (!editedMessage) return;

    const serialized = await API.serializeMessageObj(editedMessage);

    if (editedMessage.body !== undefined) {
      if (typeof window.newEditMessage === 'function') {
        window.newEditMessage(serialized);
      }
    } else {
      if (typeof window.newDeleteMessage === 'function') {
        window.newDeleteMessage(serialized);
      }
    }
  });
};
