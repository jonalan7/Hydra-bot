/**
 * send message in options mode
 * @param {string} to contact number
 * @param {string} body message body
 * @param {object} options shipping options
 */
export async function sendMessage(to, body, options = {}) {
  try {
    const types = [
      'sendText',
      'sendAudioBase64',
      'sendImageFromBase64',
      'sendAudio',
      'sendFile',
      'sendImage',
    ];

    let typesObj;
    types.reduce(
      (a, v) =>
        (typesObj = {
          ...a,
          [v]: v,
        }),
      {}
    );

    if (!body) {
      throw API.scope(to, true, null, `parameters are missing`);
    }

    if (!options.type || (options.type && !types.includes(options.type))) {
      throw API.scope(
        to,
        true,
        null,
        `pass the message type, examples: ${types.join(', ')}`
      );
    }

    const chat = await API.sendExist(to);
    const merge = {};

    if (chat && chat.status != 404 && chat.id) {
      const newMsgId = await window.API.getNewMessageId(chat.id._serialized);
      const fromwWid = await window.Store.MaybeMeUser.getMaybeMePnUser();

      if (options.type === typesObj.sendText) {
        merge.type = 'chat';
      }

      if (
        options.type === typesObj.sendAudioBase64 ||
        options.type === typesObj.sendAudio ||
        options.type === typesObj.sendFile ||
        options.type === typesObj.sendImage ||
        options.type === typesObj.sendImageFromBase64
      ) {
        let result = await Store.Chat.find(chat.id);
        const mediaBlob = API.base64ToFile(body);
        const mc = await API.processFiles(result, mediaBlob);
        if (typeof mc === 'object' && mc._models && mc._models[0]) {
          const media = mc._models[0];
          let enc, type;

          if (
            options.type === typesObj.sendFile ||
            options.type === typesObj.sendImage ||
            options.type === typesObj.sendImageFromBase64
          ) {
            type = media.type;
            merge.caption = options?.caption;
            merge.filename = options?.filename;
            enc = await API.encryptAndUploadFile(type, mediaBlob);
          } else {
            type = 'ptt';
            enc = await API.encryptAndUploadFile(type, mediaBlob);
          }

          if (enc === false) {
            throw API.scope(to, true, 404, 'Error to encryptAndUploadFile');
          }

          merge.type = type;
          merge.duration = media?.__x_mediaPrep?._mediaData?.duration;
          merge.mimetype = media.mimetype;
          merge.size = media.filesize;
          merge.deprecatedMms3Url = enc.url;
          merge.directPath = enc.directPath;
          merge.encFilehash = enc.encFilehash;
          merge.filehash = enc.filehash;
          merge.mediaKeyTimestamp = enc.mediaKeyTimestamp;
          merge.ephemeralStartTimestamp = enc.mediaKeyTimestamp;
          merge.mediaKey = enc.mediaKey;
          body = undefined;
        }
      }

      if (!Object.keys(merge).length) {
        throw API.scope(to, true, null, 'Error sending message');
      }

      const message = window.API.baseSendMessage(
        {
          to,
          body,
          newMsgId,
          fromwWid,
          chat,
        },
        merge
      );

      try {
        const result = (
          await Promise.all(window.Store.addAndSendMsgToChat(chat, message))
        )[1];
        if (
          result === 'success' ||
          result === 'OK' ||
          result?.messageSendResult === 'OK'
        ) {
          return API.scope(newMsgId, false, result, null, options.type, body);
        }
        throw result;
      } catch (result) {
        throw API.scope(newMsgId, true, result, null, options.type, body);
      }
    } else {
      if (!chat.erro) {
        chat.erro = true;
      }

      return chat;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Function to base send message
 * @param {*} param - Object with information to send the message
 * @param {*} merge - Object with information to merge with the message
 * @returns - Object with message information
 */
export function baseSendMessage(param, merge) {
  const message = {
    id: param.newMsgId,
    ack: 0,
    body: param?.body,
    from: param.fromwWid,
    to: param.chat.id,
    local: !0,
    self: 'out',
    t: parseInt(new Date().getTime() / 1000),
    isNewMsg: !0,
    ...merge,
  };
  return message;
}
