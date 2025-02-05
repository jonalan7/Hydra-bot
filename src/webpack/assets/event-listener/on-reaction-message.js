export const eventOnReactionMessage = async () => {
  window.Store.Reactions.on('add', (reaction) => {
    reaction.reactions.on('add remove', async (...eventArgs) => {
      const [emoji, collections, type] = eventArgs;
      const serialized = await API.serializeReactions(emoji, collections, type);
      if (typeof window.onReactionMessage === 'function') {
        window.onReactionMessage(serialized);
      }
    });
  });
};
