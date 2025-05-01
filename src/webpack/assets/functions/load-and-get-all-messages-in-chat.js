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
    let active = false;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
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

    const loadMessagesButtonClass =
      'x14m1o6m x126m2zf x1b9z3ur x9f619 x1rg5ohu x1okw0bk x193iq5w x123j3cw xn6708d x10b6aqq x1ye3gou x13a8xbf xdod15v x2b8uid x1lq5wgf xgqcy7u x30kzoy x9jhf4c';

    const chatScrollClass =
      'x10l6tqk x13vifvy x17qophe xyw6214 x9f619 x78zum5 xdt5ytf xh8yej3 x5yr21d x6ikm8r x1rife3k xjbqb8w x1ewm37j';

    await ensureChatIsActive(chat);

    const messages = chat.msgs._models;
    let attempts = 0; // attempts to load messages not loaded
    let initialQuantityMsg = chat.msgs.length; // Initial quantity of messages

    while (!chat.msgs.msgLoadState.noEarlierMsgs && attempts < 5) {
      const loadButton = document.querySelector(
        `button[class="${loadMessagesButtonClass}"]`
      );

      const chatScroll = document.querySelector(
        `div[class="${chatScrollClass}"]`
      );

      if (chatScroll) {
        chatScroll.scrollTop = 0;
      }

      // If loadButton no longer exists, we must have reached the end of possible messages
      if (!loadButton) break;

      loadButton.click();

      await chat.onEmptyMRM();
      await API.sleep(2000);

      const currentQuantityMsg = chat.msgs.length; // Current quantity of messages

      const [firstMsg] = messages;
      if (!chat.active) {
        active = true;
        break;
      }

      if (
        (startDate && formatTimestampToDate(firstMsg) <= startDate) ||
        chat.endOfHistoryTransferType > 0
      ) {
        break;
      }

      if (currentQuantityMsg === initialQuantityMsg) {
        attempts++;
      } else {
        attempts = 0; // Reset attempts if new messages were loaded
      }

      initialQuantityMsg = currentQuantityMsg;
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
        if (startDate && formattedDate < startDate) {
          return;
        }

        if (endDate && formattedDate > endDate) {
          return;
        }
        addMessage(formattedDate, serializedMessage, output);
      })
    );

    return {
      data: output,
      msg: !active
        ? 'Messages loaded successfully'
        : 'Not all messages were loaded, chat is not active',
    };
  } catch (error) {
    console.error('Error loading messages:', error);
    throw error;
  }
};
