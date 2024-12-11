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
 * Loads and retrieves all messages in a chat.
 * @param {string} chatId - Chat ID.
 * @param {string} endDate - Optional end date in format YYYY-MM-DD.
 * @returns chat messages
 */
export const loadAndGetAllMessagesInChat = async (chatId, endDate) => {
  try {
    if (endDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(endDate)) {
        throw API.scope(
          null,
          true,
          404,
          'Invalid endDate format. Expected YYYY-MM-DD.'
        );
      }
    }

    const chat = await API.sendExist(chatId);

    if (!chat || chat.status === 404) {
      throw new Error('Chat not found');
    }

    const loadMessagesButtonClass =
      'x14m1o6m x126m2zf x1b9z3ur x9f619 x1rg5ohu x1okw0bk x193iq5w x123j3cw xn6708d x10b6aqq x1ye3gou x13a8xbf xdod15v x2b8uid x1lq5wgf xgqcy7u x30kzoy x9jhf4c';

    const chatScrollClass =
      'x10l6tqk x13vifvy x17qophe xyw6214 x9f619 x78zum5 xdt5ytf xh8yej3 x5yr21d x6ikm8r x1rife3k xjbqb8w x1ewm37j';

    await Store.Cmd.openChatBottom(chat);
    const messages = chat.msgs._models;

    while (!chat.msgs.msgLoadState.noEarlierMsgs) {
      const loadButton = document.querySelector(
        `button[class="${loadMessagesButtonClass}"]`
      );
      const chatScroll = document.querySelector(
        `div[class="${chatScrollClass}"]`
      );
      if (chatScroll) {
        chatScroll.scrollTop = 0;
      }
      if (loadButton) {
        loadButton.click();
      }
      await chat.onEmptyMRM();
      await API.sleep(2000);

      const [firstMsg] = messages;
      if (endDate && formatTimestampToDate(firstMsg) <= endDate) {
        break;
      }
    }

    const output = [];

    // Use Promise.all with map to handle asynchronous operations
    await Promise.all(
      Object.keys(messages).map(async (key) => {
        if (key === 'remove') return;
        const messageObj = messages[key];
        const serializedMessage = await API.serializeMessageObj(
          messageObj,
          false
        );
        const formattedDate = formatTimestampToDate(serializedMessage);
        if (endDate && formattedDate <= endDate) {
          return;
        }
        addMessage(formattedDate, serializedMessage, output);
      })
    );

    return output;
  } catch (error) {
    console.error('Error loading messages:', error);
    throw error;
  }
};
