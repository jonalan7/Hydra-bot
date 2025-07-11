/**
 * Formats a timestamp to a date string.
 * @param {*} timestamp - Timestamp.
 * @returns
 */
const formatTimestampToDate = (timestamp) => {
  const time = timestamp?.startOfDay ?? timestamp?.t;
  if (time) {
    const date = new Date(time * 1000);
    const formatter = new Intl.DateTimeFormat('en-CA');
    return formatter.format(date);
  }
  return null;
};

/**
 * Function to add a new message to a specific date.
 * @param {*} date - Date.
 * @param {*} output - Output.
 * @param {*} newMessage - New message.
 */
const addMessage = (date, newMessage, output) => {
  const item = output.find((entry) => entry.date === date);
  if (item) {
    item.msgList.push(newMessage);
  } else {
    output.push({
      date: date,
      msgList: [newMessage],
    });
  }
};

/**
 * Tries to open the chat until it becomes active or the maximum number of attempts is reached.
 * @param {*} chat - Chat object
 * @param {number} maxAttempts - Maximum number of attempts (default: 5)
 * @param {number} delayMs - Delay between attempts in milliseconds (default: 500ms)
 */
const ensureChatIsActive = async (chat, maxAttempts = 5, delayMs = 500) => {
  let attempt = 0;

  while (!chat.active && attempt < maxAttempts) {
    console.log(`Attempt ${attempt + 1} of ${maxAttempts} to activate chat...`);
    await Store.Cmd.openChatBottom(chat);
    await API.sleep(delayMs);
    attempt++;
  }

  if (!chat.active) {
    console.warn('Failed to activate chat after multiple attempts.');
  }
};

/**
 * Loads and retrieves all messages in a chat between the two given dates.
 * Both dates are inclusive
 * @param {string} chatId - Chat ID.
 * @param {string} startDate - start date in format YYYY-MM-DD.
 * @param {string} endDate - end date in format YYYY-MM-DD.
 * @returns chat messages
 */
export const loadAndGetAllMessagesInChat = async (
  chatId,
  startDate,
  endDate
) => {
  try {
    const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw API.scope(
        null,
        true,
        404,
        'Invalid Date format. Expected YYYY-MM-DD for startDate and endDate.'
      );
    }

    const chat = await API.sendExist(chatId);
    if (!chat || chat.status === 404) {
      throw new Error('Chat not found');
    }

    await ensureChatIsActive(chat);

    const loadEarlierMessagesUntilDate = async (chat, endDate) => {
      const LOAD_BUTTON_CLASS =
        'x14m1o6m x126m2zf x1b9z3ur x9f619 x1rg5ohu x1okw0bk x193iq5w x123j3cw xpdmqnj x10b6aqq x1g0dm76 x13a8xbf xdod15v x2b8uid x1obq294 x5a5i1n xde0f50 x15x8krk';
      const SCROLL_DIV_CLASS =
        'x10l6tqk x13vifvy x1o0tod xyw6214 x9f619 x78zum5 xdt5ytf xh8yej3 x5yr21d x6ikm8r x1rife3k xjbqb8w x1ewm37j';

      return new Promise((resolve) => {
        const checkAndLoad = async () => {
          const result = await Store.ChatLoad.loadEarlierMsgs(chat);
          const messages = chat.msgs._models;
          const firstMsg = messages[0];

          const loadButton = document.querySelector(
            `button[class="${LOAD_BUTTON_CLASS}"]`
          );
          const chatScroll = document.querySelector(
            `div[class="${SCROLL_DIV_CLASS}"]`
          );

          if (chatScroll) chatScroll.scrollTop = 0;
          if (loadButton) loadButton.click();

          const noMoreMessages =
            !result || (Array.isArray(result) && result.length === 0);
          const reachedEndDate =
            endDate && formatTimestampToDate(firstMsg) <= endDate;

          if (noMoreMessages || reachedEndDate) {
            return resolve(true);
          }

          setTimeout(checkAndLoad, 2000);
        };

        checkAndLoad();
      });
    };

    await loadEarlierMessagesUntilDate(chat, endDate);

    const messages = chat.msgs._models;
    const output = [];

    await Promise.all(
      Object.keys(messages).map(async (key) => {
        if (key === 'remove') return;

        const message = messages[key];
        const serialized = await API.serializeMessageObj(message, false);
        const msgDate = formatTimestampToDate(serialized);

        if (
          (startDate && msgDate > startDate) ||
          (endDate && msgDate < endDate)
        ) {
          return;
        }

        addMessage(msgDate, serialized, output);
      })
    );

    return {
      data: output,
      msg: 'Messages loaded successfully',
    };
  } catch (error) {
    console.error('Error loading messages:', error);
    throw error;
  }
};
