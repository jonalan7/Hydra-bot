export const serializeContactObj = (obj) => {
  if (obj === undefined) {
    return null;
  }

  const serializedObj = window.API.serializeRawObj(obj);

  if (!obj.profilePicThumb && obj.id && window.Store.ProfilePicThumb) {
    obj.profilePicThumb = window.Store.ProfilePicThumb.get(obj.id);
  }

  return {
    ...serializedObj,
    formattedName: obj.formattedName,
    displayName: obj.displayName,
    formattedShortName: obj.formattedShortName,
    formattedShortNameWithNonBreakingSpaces:
      obj.formattedShortNameWithNonBreakingSpaces,
    isHighLevelVerified: obj.isHighLevelVerified,
    isMe: obj.isMe,
    mentionName: obj.mentionName,
    notifyName: obj.notifyName,
    isMyContact: obj.isMyContact,
    isPSA: obj.isPSA,
    isUser: obj?.isUser ?? obj.id?.server === 'c.us' ? true : false,
    isVerified: obj.isVerified,
    isWAContact: obj.isWAContact,
    profilePicThumbObj: obj.profilePicThumb
      ? API.serializeProfilePicThumb(obj.profilePicThumb)
      : {},
    statusMute: obj.statusMute,
    msgs: null,
  };
};
