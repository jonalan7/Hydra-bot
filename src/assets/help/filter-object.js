export const filterObjects = [{
        type: 'Module',
        when: (module) =>
            module.default && module.default.Chat && module.default.Msg ?
            module.default : null,
    },
    {
        type: 'addAndSendMsgToChat',
        when: (module) =>
            module.addAndSendMsgToChat ? module.addAndSendMsgToChat : null,
    },
    {
        type: 'WidFactory',
        when: (module) =>
            module.isWidlike && module.createWid && module.createWidFromWidLike ?
            module : null,
    },
    {
        type: 'UserConstructor',
        when: (module) =>
            module.default &&
            module.default.prototype &&
            module.default.prototype.isServer &&
            module.default.prototype.isUser ?
            module.default : null,
    },
    {
        type: 'WidFactory',
        when: (module) =>
            module.isWidlike && module.createWid && module.createWidFromWidLike ?
            module : null,
    },
    {
        type: 'MsgKey',
        when: (module) =>
            module.default &&
            module.default.toString &&
            typeof module.default.toString === 'function' &&
            module.default.toString().includes('MsgKey error: obj is null/undefined') ?
            module.default : null,
    },
    {
        type: 'MaybeMeUser',
        when: (module) => (module.getMaybeMeUser ? module : null),
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
        when: (module) =>
            module.default && module.default.queryExist ? module.default : null,
    },
    {
        type: 'checkNumberMD',
        when: (module) =>
            module.queryExists && module.queryPhoneExists ? module : null,
    },
    {
        type: 'ReadSeen',
        when: (module) => (module.sendSeen ? module : null),
    },
];