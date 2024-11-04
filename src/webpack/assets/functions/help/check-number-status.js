/**
 * Function to check if a number is registered on WhatsApp
 * @param {*} id - The phone number
 * @param {*} conn - Check if the connection is connected
 * @returns {Promise<Object>} - Return the status of the number
 */
export const checkNumberStatus = async (id, conn = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const err = {
        error: 404,
      };
      const connection =
        Store && Store.State && Store.State.Socket && Store.State.Socket.state
          ? Store.State.Socket.state
          : '';

      const checkType = API.sendCheckType(id);
      if (!!checkType && checkType.status === 404) {
        Object.assign(err, {
          text: checkType.text,
          numberExists: null,
        });
        throw err;
      }

      if (conn === true) {
        if (connection !== 'CONNECTED') {
          Object.assign(err, {
            text: 'No connection with WhatsApp',
            connection: connection,
            numberExists: null,
          });
          throw err;
        }
      }

      const chat = await API.checkChatExist(id);
      if (chat) {
        const data = {
          status: 200,
          numberExists: true,
          id: chat,
          erro: false,
          checkNumberStatus: false,
        };
        return resolve(data);
      }

      const lid = await API.getChat(id);
      if (lid) {
        return await Store.checkNumber
          .queryWidExists(lid.id)
          .then((result) => {
            if (!!result && typeof result === 'object') {
              const data = {
                status: 200,
                numberExists: true,
                id: result.wid,
                erro: false,
                checkNumberStatus: true,
              };
              return resolve(data);
            }
            Object.assign(err, {
              connection: connection,
              numberExists: false,
              text: `The number does not exist`,
            });
            throw err;
          })
          .catch((err) => {
            if (err.text) {
              throw err;
            }
            Object.assign(err, {
              connection: connection,
              numberExists: false,
              text: err,
              checkNumberStatus: true,
            });
            throw err;
          });
      } else {
        Object.assign(err, {
          connection: connection,
          numberExists: false,
        });
        throw err;
      }
    } catch (e) {
      const scope = {
        status: e.error,
        text: e.text,
        numberExists: e.numberExists,
        connection: e.connection,
        erro: true,
      };
      reject(scope);
    }
  });
};
