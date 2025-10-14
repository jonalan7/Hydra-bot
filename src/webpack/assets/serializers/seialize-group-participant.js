/**
 * Serialize a group participant
 * @param {object} participant - Group participant
 */
export const serializeGroupParticipant = async (participant, moduleGroup) => {
  const idUser = await Store.MaybeMeUser.getMaybeMePnUser();
  const isMe = idUser._serialized === participant.id._serialized;

  const {
    id = null,
    isAdmin = false,
    isSuperAdmin = false,
    contact = {},
  } = participant;

  const {
    verifiedName = null,
    verifiedLevel = null,
    shortName = null,
    pushname = null,
    name = null,
    isBusiness = null,
    isFavorite = null,
    isHosted = null,
    isAddressBookContact,
    phoneNumber,
  } = contact;

  const filePicThumb =
    await Store.ContactProfilePicThumb.requestProfilePicFromServer(
      id,
      undefined,
      undefined,
      moduleGroup[0].id
    );

  const {
    eurl = null,
    eurlStale = null,
    filehash = null,
    fullDirectPath = null,
    previewDirectPath = null,
    previewEurl = null,
  } = filePicThumb;

  return {
    id,
    isAdmin,
    isSuperAdmin,
    verifiedName,
    verifiedLevel,
    shortName,
    pushname,
    name,
    isBusiness,
    isFavorite,
    isHosted,
    phoneNumber,
    profilePicThumb: {
      eurl,
      eurlStale,
      filehash,
      imgFull:
        fullDirectPath && filehash
          ? Store.ProfilePicThumbModel.ProfilePicThumb.prototype.$ProfilePicThumbImpl$p_1(
              fullDirectPath,
              filehash
            )
          : null,
      img:
        previewDirectPath && filehash
          ? Store.ProfilePicThumbModel.ProfilePicThumb.prototype.$ProfilePicThumbImpl$p_1(
              previewDirectPath,
              filehash
            )
          : null,
      fullDirectPath,
      previewDirectPath,
      previewEurl,
    },
    isContact: Boolean(isAddressBookContact),
    isMe,
  };
};
