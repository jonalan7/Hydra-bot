
export async function sendMessage(to, body, options = {}) {
    const types = ['text'];

    if (!options.type || options.type && !types.includes(options.type)) {
        return API.scope(undefined, true, null, `pass the message type, examples: ${types.join(',')}`);
    }

    const chat = await API.sendExist(to);
    const merge = {};
    if (chat && chat.status != 404 && chat.id) {
        const newMsgId = await window.API.getNewMessageId(chat.id._serialized);
        const fromwWid = await window.Store.MaybeMeUser.getMaybeMeUser();

        if (options.type === types[0]) {
            merge.type = 'chat';
        }

        const message = API.baseSendMessage({
            to,
            body,
            newMsgId,
            fromwWid,
            chat,
        }, merge);

        try {
            const result = (await Promise.all(window.Store.addAndSendMsgToChat(chat, message)))[1];
            if (result === 'OK') {
                return API.scope(newMsgId, false, result, null, options.type, body);
            }
            throw result;
        } catch (result) {
            return API.scope(newMsgId, true, result, null, options.type, body);
        }
    } else {
        if (!chat.erro) {
            chat.erro = true;
        }
        return chat;
    }
}

export function baseSendMessage(param, merge) {
    const message = {
        id: param.newMsgId,
        ack: 0,
        body: param.body,
        from: param.fromwWid,
        to: param.chat.id,
        local: !0,
        self: 'out',
        t: parseInt(new Date().getTime() / 1000),
        isNewMsg: !0,
        ...merge
    };
    return message;
}