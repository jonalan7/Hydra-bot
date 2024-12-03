/**
 * Returns the current version of the WhatsApp Web API
 * @returns Current API version
 */
export const getWAVersion = async () => {
  try {
    return window.Debug.VERSION;
  } catch (error) {
    throw error;
  }
};
