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
}

export type FunctionParameters = {
  [K in keyof typeof API]: Parameters<(typeof API)[K]>;
};
