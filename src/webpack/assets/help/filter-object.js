import { type } from 'os';

export const filterObjects = [
  {
    type: 'Module',
    when: (module) =>
      module.default && module.default.Chat && module.default.Msg
        ? module.default
        : null,
  },
  {
    type: 'Conn',
    when: (module) => (module.Conn ? module.Conn : null),
  },
  {
    type: 'ChatCollection',
    when: (module) => (module.ChatCollection ? module.ChatCollection : null),
  },
  {
    type: 'addAndSendMsgToChat',
    when: (module) =>
      module.addAndSendMsgToChat ? module.addAndSendMsgToChat : null,
  },
  {
    type: 'UserConstructor',
    when: (module) =>
      module.default &&
      module.default.prototype &&
      module.default.prototype.isServer &&
      module.default.prototype.isUser
        ? module.default
        : null,
  },
  {
    type: 'WidFactory',
    when: (module) => (module.createWid ? module : null),
  },
  {
    type: 'MsgKey',
    when: (module) =>
      module.default &&
      module.default.toString &&
      typeof module.default.toString === 'function' &&
      module.default.toString().includes('MsgKey error: obj is null/undefined')
        ? module.default
        : null,
  },
  {
    type: 'State',
    when: (module) => (module.Socket ? module : null),
  },
  {
    type: 'addAndSendMsgToChat',
    when: (module) =>
      module.addAndSendMsgToChat ? module.addAndSendMsgToChat : null,
  },
  {
    type: 'checkNumber',
    when: (module) => (module.queryExist ? module : null),
  },
  {
    type: 'ReadSeen',
    when: (module) => (module.sendSeen ? module : null),
  },
  {
    type: 'Stream',
    when: (module) =>
      module.Stream && module.StreamInfo ? module.Stream : null,
  },
  {
    type: 'MediaCollection',
    when: (module) =>
      module.default &&
      module.default.prototype &&
      (module.default.prototype.processFiles !== undefined ||
        module.default.prototype.processAttachments !== undefined)
        ? module.default
        : null,
  },
  {
    type: 'UploadUtils',
    when: (module) =>
      module.default && module.default.encryptAndUpload ? module.default : null,
  },
  {
    type: 'blob',
    when: (module) =>
      module.default && module.default.createFromData ? module : null,
  },
  {
    type: 'createGroup',
    when: (module) =>
      module.createGroup && module.sendForNeededAddRequest
        ? module.createGroup
        : null,
  },
  {
    type: 'GroupDesc',
    when: (module) => (module.setGroupDesc ? module : null),
  },
  {
    type: 'CheckWid',
    when: (module) => (module.validateWid ? module : null),
  },
  {
    type: 'Participants',
    when: (module) =>
      module.addParticipants && module.promoteCommunityParticipants
        ? module
        : null,
  },
  {
    type: 'MyStatus',
    when: (module) => (module.getStatus && module.setMyStatus ? module : null),
  },
  {
    type: 'Profile',
    when: (module) =>
      module.sendSetPicture && module.requestDeletePicture ? module : null,
  },
  {
    type: 'Contacts',
    when: (module) => (module.ContactCollection ? module : null),
  },
  {
    type: 'MaybeMeUser',
    when: (module) => (module.getMaybeMeUser ? module : null),
  },
  {
    type: 'Cmd',
    when: (module) => (module.CmdImpl && module.Cmd ? module.Cmd : null),
  },
  {
    type: 'GrupsConfig',
    when: (module) => (module.updateReadOnly ? module : null),
  },
  {
    type: 'Comms',
    when: (module) =>
      module?.waitForConnection && module?.stopComms ? module : null,
  },
  {
    type: 'SocketModel',
    when: (module) =>
      module?.Socket && module?.Socket?.clearCredentialsAndStoredData
        ? module
        : null,
  },
  {
    type: 'LinkDeviceAction',
    when: (module) =>
      module?.genLinkDeviceCodeForPhoneNumber && module?.forceManualRefresh
        ? module
        : null,
  },
  {
    type: 'DeviceLinkingApi',
    when: (module) =>
      module?.getPairingType && module?.handlePrimaryHelloInternal
        ? module
        : null,
  },
  {
    type: 'ChatLoad',
    when: (module) =>
      module?.loadEarlierMsgs && module?.loadRecentMsgs ? module : null,
  },
];
