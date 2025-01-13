/**
 * Function to get code for phone number
 * @param {*} phoneNumber - phone number
 * @returns
 */
export const getCodeForPhoneNumber = async (phoneNumber) => {
  try {
    const codePhone = Store.LinkDeviceAction.genLinkDeviceCodeForPhoneNumber(
      parseInt(phoneNumber),
      true
    );
    return codePhone;
  } catch (error) {
    throw error;
  }
};
