/**
 * Function to serialize raw object
 * @param {*} obj 
 * @returns 
 */
export const serializeRawObj = (obj) => {
  if (obj && obj.toJSON) {
    obj.waveform = null;
    return obj.toJSON();
  }
  return {};
};