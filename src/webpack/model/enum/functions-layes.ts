import type { API } from '../../../@types/API';
export enum FunctionsLayer {
  getGroupParticipant = 'getGroupParticipant',
  getAllChatsGroups = 'getAllChatsGroups',
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
}

export type FunctionParameters = {
  [K in keyof API]: API[K] extends (...args: any[]) => any
    ? Parameters<API[K]>
    : never;
};
