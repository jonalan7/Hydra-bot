const validateObject = (obj, name) => {
  if (!obj || typeof obj !== 'object') {
    throw new Error(`Invalid ${name} object`);
  }
};

const mapSender = (sender) => ({
  msgKey: sender?.msgKey ?? null,
  read: sender?.read ?? false,
  senderUserJid: sender?.senderUserJid ?? null,
  timestamp: sender?.timestamp ?? null,
  reactionText: sender?.reactionText ?? '',
  parentMsgKey: sender?.parentMsgKey ?? null,
  orphan: sender?.orphan ?? false,
  isSendFailure: sender?.isSendFailure ?? false,
  isFailed: sender?.isFailed ?? false,
  id: sender?.id ?? null,
  ack: sender?.ack ?? 0,
});

const getInfoSender = async (collections) => {
  validateObject(collections, 'collections');

  return Object.values(collections)
    .filter((coll) => coll?.senders?._index)
    .map((coll) => {
      const senders = Object.values(coll.senders._index).map(mapSender);
      return {
        aggregateEmoji: coll.__x_aggregateEmoji ?? null,
        hasReactionByMe: coll.__x_hasReactionByMe ?? false,
        sender: senders,
      };
    });
};

/**
 * Function to serialize reactions
 */
export const serializeReactions = async (emoji, collections, type) => {
  validateObject(emoji, 'emoji');
  validateObject(collections, 'collections');
  validateObject(type, 'type');

  const typeReaction = type.add ? 'add' : 'remove';
  const senders = collections._index
    ? await getInfoSender(collections._index)
    : [];

  return {
    hasReactionByMe: emoji.__x_hasReactionByMe ?? null,
    aggregateEmoji: emoji.__x_aggregateEmoji ?? null,
    id: collections?.parent?.__x_id ?? null,
    index: collections._index ? Object.keys(collections._index) : null,
    typeReaction,
    senders,
  };
};

/**
 * Serialize intro reactions
 */
export const serializeIntroReactions = async (emoji, type) => {
  validateObject(emoji, 'emoji');
  validateObject(type, 'type');

  const sendersIndex = emoji?.reactions?._index;

  const senders = sendersIndex ? await getInfoSender(sendersIndex) : [];
  const reactionByMe = emoji?.__x_reactionByMe;
  const index = sendersIndex ? Object.keys(sendersIndex) : null;
  if (!index.length) {
    return [];
  }
  return {
    id: emoji?.__x_id,
    senders,
    reactionByMe: {
      ack: reactionByMe?.ack,
      msgKey: reactionByMe?.msgKey,
      orphan: reactionByMe?.orphan,
      parentMsgKey: reactionByMe?.parentMsgKey,
      reactionText: reactionByMe?.reactionText,
      read: reactionByMe?.read,
      senderUserJid: reactionByMe?.senderUserJid,
      timestamp: reactionByMe?.timestamp,
    },
    index,
    typeReaction: 'add',
  };
};
