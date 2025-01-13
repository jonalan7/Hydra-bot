import {
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
  returnChat,
  checkChatExist,
  sleep,
  waitForSelector,
} from './functions/help';

import {
  sendMessage,
  baseSendMessage,
  getAllContacts,
  createGroup,
  addParticipant,
  setGroupDescription,
  getHost,
  setGroupImage,
  getAllChats,
  getContact,
  getWAVersion,
  getAllChatsGroups,
  getGroupParticipant,
  loadAndGetAllMessagesInChat,
  logoutSession,
  getCodeForPhoneNumber,
  refreshAltLinkingCode,
  getInterface,
} from './functions';

import {
  serializeMessageObj,
  serializeChatObj,
  serializeContactObj,
  serializeProfilePicThumb,
  serializeRawObj,
  serializeMeObj,
  serializeReactions,
  serializeIntroReactions,
  serializeGroupParticipant,
} from './serializers';

import { initParasite } from './init-parasite';

initParasite();

if (typeof window.API === 'undefined') {
  window.API = {};

  // Helps Functions
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
  window.API.returnChat = returnChat;
  window.API.checkChatExist = checkChatExist;
  window.API.sleep = sleep;
  window.API.waitForSelector = waitForSelector;

  // Get Functions
  window.API.loadAndGetAllMessagesInChat = loadAndGetAllMessagesInChat;

  // Send Functions
  window.API.sendMessage = sendMessage;

  // Host Functions
  window.API.getAllContacts = getAllContacts;
  window.API.getHost = getHost;
  window.API.getAllChats = getAllChats;
  window.API.getContact = getContact;
  window.API.getWAVersion = getWAVersion;
  window.API.getAllChatsGroups = getAllChatsGroups;
  window.API.logoutSession = logoutSession;
  window.API.getCodeForPhoneNumber = getCodeForPhoneNumber;
  window.API.refreshAltLinkingCode = refreshAltLinkingCode;
  window.API.getInterface = getInterface;

  // Group Functions
  window.API.createGroup = createGroup;
  window.API.addParticipant = addParticipant;
  window.API.setGroupDescription = setGroupDescription;
  window.API.setGroupImage = setGroupImage;
  window.API.getGroupParticipant = getGroupParticipant;

  // Serialize Functions
  window.API.serializeMessageObj = serializeMessageObj;
  window.API.serializeChatObj = serializeChatObj;
  window.API.serializeContactObj = serializeContactObj;
  window.API.serializeProfilePicThumb = serializeProfilePicThumb;
  window.API.serializeRawObj = serializeRawObj;
  window.API.serializeMeObj = serializeMeObj;
  window.API.serializeReactions = serializeReactions;
  window.API.serializeIntroReactions = serializeIntroReactions;
  window.API.serializeGroupParticipant = serializeGroupParticipant;
}
