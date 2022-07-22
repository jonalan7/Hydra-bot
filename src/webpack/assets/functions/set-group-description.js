/**
 * Parameters to change group description
 * @param {string} groupId group number
 * @param {string} description group description
 */
export async function setGroupDescription(groupId, description) {
  const nameFunc = (new Error().stack.match(/at (.*?) /))[1].replace('Object.', '');
  if (typeof description != 'string' || description.length === 0) {
    return API.scope(
      groupId,
      true,
      400,
      'It is necessary to write a text!'
    );
  }
  const chat = await API.sendExist(groupId);
  if (chat && chat.status != 404) {
    try {
      await window.Store.GroupDesc.setGroupDesc(chat, description);
      return API.scope(
        groupId,
        false,
        200,
        `Description successfully changed`,
        nameFunc,
        description
      );
    } catch {
      return API.scope(
        groupId,
        true,
        400,
        `Unable to change description`,
        nameFunc,
        description
      );
    }
  } else {
    return chat;
  }
}