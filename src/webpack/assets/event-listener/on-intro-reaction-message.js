export const eventOnIntroReactionMessage = async () => {
  window.Store.Reactions.on('add', async (...eventArgs) => {
    const [emoji, , type] = eventArgs;
    const serialized = await API.serializeIntroReactions(emoji, type);
    if (!Array.isArray(serialized)) {
      if (typeof window.onIntroReactionMessage === 'function') {
        window.onIntroReactionMessage(serialized);
      }
    }
  });
};
