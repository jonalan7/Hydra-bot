/**
 * Function to get group participants
 * @param {string} groupId - Group ID
 * @returns
 */
export const getGroupParticipant = async (groupId) => {
  try {
    if (typeof groupId !== 'string') {
      throw API.scope(null, true, 404, `Use to groupId string: ${groupId}`);
    }

    const chat = await API.sendExist(groupId);

    if (chat && chat.status != 404 && chat.id) {
      await Store.Cmd.openChatBottom(chat);
      await Store.GrupsConfig.updateReadOnly(chat);

      const classInfoGroup = await API.waitForSelector(
        "#main header div[role='button']"
      );

      if (classInfoGroup) {
        classInfoGroup.click();
      }

      const moduleGroup = await Store.GroupMetadata._models.filter(
        (e) => e.id._serialized === groupId
      );

      const participants =
        moduleGroup.length && moduleGroup[0].participants
          ? moduleGroup[0].participants
          : undefined;

      if (participants) {
        const output = await Promise.all(
          participants.map(
            async (event) => await API.serializeGroupParticipant(event)
          )
        );
        return output;
      }
    }

    throw API.scope(null, true, 404, `Use to groupId string: ${groupId}`);
  } catch (error) {
    throw error;
  }
};
