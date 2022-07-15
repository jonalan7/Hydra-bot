export async function createGroup(name, contactsId) {
  if (typeof name !== 'string' || !name.length) {
    return API.scope(
      null,
      true,
      404,
      'enter the name variable as an string'
    );
  }

  if (!Array.isArray(contactsId)) {
    contactsId = [contactsId];
  }

  const chat = await Promise.all(contactsId.map((c) => API.sendExist(c)));
  const checkErro = chat.filter((e) => e.erro === true)[0];

  if (checkErro && checkErro.status === 404) {
    if (!checkErro.erro) {
      checkErro.erro = true;
    }
    return checkErro;
  }

  const filterContact = chat.filter((c) => !c.erro && c.isUser);
  const result = await window.Store.createGroup(name, undefined, undefined, filterContact);

  return API.scope(null, false, result, null);
}