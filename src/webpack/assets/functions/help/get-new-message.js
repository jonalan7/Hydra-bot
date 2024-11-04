export async function getNewMessageId(chatId) {
  const chat = await window.API.sendExist(chatId);
  if (chat.id) {
    const newMsgId = new Object();
    newMsgId.fromMe = true;
    newMsgId.id = await window.API.getNewId().toUpperCase();
    newMsgId.remote = new window.Store.WidFactory.createWid(
      chat.id._serialized
    );
    newMsgId._serialized = `${newMsgId.fromMe}_${newMsgId.remote}_${newMsgId.id}`;
    const Msgkey = new window.Store.MsgKey(newMsgId);
    return Msgkey;
  } else {
    return false;
  }
}
