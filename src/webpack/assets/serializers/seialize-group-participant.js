/**
 * Serialize a group participant
 * @param {object} participant - Group participant
 */
export const serializeGroupParticipant = async (participant) => {
  const idUser = await Store.MaybeMeUser.getMaybeMeUser();
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
    profilePicThumb = {},
    isAddressBookContact,
  } = contact;

  const {
    eurl = null,
    img = null,
    imgFull = null,
    previewDirectPath = null,
    tag = null,
    previewEurl = null,
    filehash = null,
    fullDirectPath = null,
  } = profilePicThumb;

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
    profilePicThumb: {
      eurl,
      img,
      imgFull,
      previewDirectPath,
      tag,
      previewEurl,
      filehash,
      fullDirectPath,
    },
    isContact: Boolean(isAddressBookContact),
    isMe,
  };
};
