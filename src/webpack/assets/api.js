import {
    sleep,
    injectConfig,
    injectParasite,
    processFiles,
    base64ToFile,
    generateMediaKey,
    arrayBufferToBase64,
    encryptAndUploadFile,
    getFileHash,
} from './help';

import {
    getChat,
    scope,
    getNewId,
    getNewMessageId,
    sendExist,
    checkNumberStatus,
    isMD,
    sendCheckType,
} from './functions/help';

import {
    sendMessage,
    baseSendMessage,
    getAllContacts,
    createGroup,
    addParticipant,
    setGroupDescription,
    getHost,
    setGroupImage
} from './functions';

import {
    serializeMessageObj,
    serializeChatObj,
    serializeContactObj,
    serializeProfilePicThumb,
    serializeRawObj,
    serializeMeObj,
} from './serializers';

import {
    initParasite
} from './init-parasite'

initParasite();

if (typeof window.API === 'undefined') {
    window.API = {};

    // Helps
    window.API.getChat = getChat;
    window.API.scope = scope;
    window.API.getNewId = getNewId;
    window.API.getNewMessageId = getNewMessageId;
    window.API.sendExist = sendExist;
    window.API.checkNumberStatus = checkNumberStatus;
    window.API.isMD = isMD;
    window.API.baseSendMessage = baseSendMessage;
    window.API.processFiles = processFiles;
    window.API.base64ToFile = base64ToFile;
    window.API.generateMediaKey = generateMediaKey;
    window.API.arrayBufferToBase64 = arrayBufferToBase64;
    window.API.encryptAndUploadFile = encryptAndUploadFile;
    window.API.getFileHash = getFileHash;
    window.API.sendCheckType = sendCheckType;

    // Functions

    // Send
    window.API.sendMessage = sendMessage;

    // Host
    window.API.getAllContacts = getAllContacts;
    window.API.getHost = getHost;

    // Group
    window.API.createGroup = createGroup;
    window.API.addParticipant = addParticipant;
    window.API.setGroupDescription = setGroupDescription;
    window.API.setGroupImage = setGroupImage;

    // Serialize
    window.API.serializeMessageObj = serializeMessageObj;
    window.API.serializeChatObj = serializeChatObj;
    window.API.serializeContactObj = serializeContactObj;
    window.API.serializeProfilePicThumb = serializeProfilePicThumb;
    window.API.serializeRawObj = serializeRawObj;
    window.API.serializeMeObj = serializeMeObj;

}