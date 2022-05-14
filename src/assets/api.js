import {
    sleep,
    injectConfig,
    injectParasiteSnake
} from './help';

import {
    getChat,
    scope,
    getNewId,
    getNewMessageId,
    sendExist,
    checkNumberStatus,
    isMD
} from './functions/help'

import {
    sendMessage,
    baseSendMessage
} from './functions'

(async () => {
    window[injectConfig.webpack] = window[injectConfig.webpack] || [];
    window.Store = {};
    while (true) {
        try {
            const webPackLast = window[injectConfig.webpack].length - 1;
            if (!window[injectConfig.webpack][webPackLast][0].includes(injectConfig.parasite)) {
                await injectParasiteSnake();
                return;
            }
        } catch {
            await sleep(1000);
        }
    }
})();

if (typeof window.API === 'undefined') {
    window.API = {};

    window.API.getChat = getChat;
    window.API.scope = scope;
    window.API.getNewId = getNewId;
    window.API.getNewMessageId = getNewMessageId;
    window.API.sendExist = sendExist;
    window.API.checkNumberStatus = checkNumberStatus;
    window.API.isMD = isMD;

    window.API.sendMessage = sendMessage;
    window.API.baseSendMessage = baseSendMessage;
}