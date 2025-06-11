import { API } from '../';
export enum FunctionsLayer {
  getGroupParticipant = 'getGroupParticipant',
  getAllChatsGroups = 'getAllChatsGroups',
  getAllChats = 'getAllChats',
  getAllContacts = 'getAllContacts',
  getHost = 'getHost',
  getWAVersion = 'getWAVersion',
  checkNumberStatus = 'checkNumberStatus',
  createGroup = 'createGroup',
  addParticipant = 'addParticipant',
  setGroupDescription = 'setGroupDescription',
  sendMessage = 'sendMessage',
  loadAndGetAllMessagesInChat = 'loadAndGetAllMessagesInChat',
  logoutSession = 'logoutSession',
  getCodeForPhoneNumber = 'getCodeForPhoneNumber',
  refreshAltLinkingCode = 'refreshAltLinkingCode',
  getInterface = 'getInterface',
  screenshot = 'screenshot',
  getChatById = 'getChatById',

  // Events Listeners
  eventInterfaceChange = 'eventInterfaceChange',
  eventNewDeleteMessage = 'eventNewDeleteMessage',
  eventNewEditMessage = 'eventNewEditMessage',
  eventNewMessage = 'eventNewMessage',
  eventOnReactionMessage = 'eventOnReactionMessage',
  eventOnIntroReactionMessage = 'eventOnIntroReactionMessage',
  eventNewOnAck = 'eventNewOnAck',
}

export type FunctionParameters = {
  [K in keyof API]: API[K] extends (...args: any[]) => any
    ? Parameters<API[K]>
    : never;
};
