export async function addParticipant(groupId, contactsId) {
  if (!Array.isArray(contactsId)) {
    contactsId = [contactsId];
  }
  const chatGroup = Store.Chat.get(groupId);
  if (!chatGroup) {
    return API.scope(
      null,
      true,
      404,
      `group not found: ${groupId}`
    );
  }
  const contacts = await Promise.all(contactsId.map((c) => API.sendExist(c)));
  const checkErro = contacts.filter((e) => e.erro === true)[0];
  
  if (checkErro && checkErro.status === 404) {
    if (!checkErro.erro) {
      checkErro.erro = true;
    }
    return checkErro;
  }
  try {
    await window.Store.Participants.addParticipants(chatGroup, contacts);
    return API.scope(
      null,
      false,
      null,
      `contact(s) successfully added!`
    );
  } catch {
    return API.scope(
      null,
      true,
      null,
      `could not add a participant`
    );
  }
}