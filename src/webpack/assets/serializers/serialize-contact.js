/**
 * Function to serialize contact object
 * @param {*} obj
 * @returns
 */
export const serializeContactObj = (obj) => {
  if (obj == undefined) {
    return null;
  }

  if (!obj.profilePicThumb && obj.id && Store.ProfilePicThumb) {
    obj.profilePicThumb = Store.ProfilePicThumb.get(obj.id);
  }

  return Object.assign(window.API.serializeRawObj(obj), {
    revisionNumber: obj?.revisionNumber,
    is_contact: obj?.isAddressBookContact,
    profilePicThumbObj: obj?.profilePicThumb
      ? API.serializeProfilePicThumb(obj?.profilePicThumb)
      : {},
    isBusiness: obj?.isBusiness,
    isEnterprise: obj?.isEnterprise,
    isSmb: obj?.isSmb,
    labels: obj?.labels,
    locale: obj?.locale,
    name: obj?.name,
    pendingAction: obj?.pendingAction,
    shortName: obj?.shortName,
    verifiedName: obj?.verifiedName,
  });
};
