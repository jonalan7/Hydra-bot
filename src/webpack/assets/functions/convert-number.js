/**
 * Function to convert a number from lid to contact or vice versa
 * @param {*} number - number to convert
 * @returns - converted number or undefined if not possible
 */
export const convertNumber = async (number) => {
  const lid = '@lid';
  const contact = '@c.us';

  const chat = await API.sendExist(number);
  if (chat && chat.status != 404) {
    const chatWid = new Store.WidFactory.createWid(chat.id._serialized);
    if (lid === number.substr(-lid.length, lid.length)) {
      return Store.ApiContact.getPhoneNumber(chatWid);
    }
    if (contact === number.substr(-contact.length, contact.length)) {
      return Store.ApiContact.getCurrentLid(chatWid);
    }
    return undefined;
  } else {
    return chat;
  }
};
