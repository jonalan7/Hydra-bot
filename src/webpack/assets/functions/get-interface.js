/**
 * Function to get the interface page
 * @returns - object with displayInfo, mode and info
 */
export const getInterface = async () => {
  try {
    const obj = {
      displayInfo: Store.Stream.displayInfo,
      mode: Store.Stream.mode,
      info: Store.Stream.info,
    };
    return obj;
  } catch (error) {
    throw error;
  }
};
