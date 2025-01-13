/**
 * Function to refresh the alt linking code phone number
 */
export const refreshAltLinkingCode = async () => {
  try {
    const currentMaker = await Store.DeviceLinkingApi.getCurrentMarker();
    currentMaker.addPoint('refresh_code');
    await Store.LinkDeviceAction.resetLinkDeviceState({
      linkDeviceMethod: Store.DeviceLinkingApi.PairingType.ALT_DEVICE_LINKING,
    });
    return true;
  } catch (error) {
    throw error;
  }
};
