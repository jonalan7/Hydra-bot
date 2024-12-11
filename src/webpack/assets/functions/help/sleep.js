/**
 * Sleep for a specified time
 * @param {number} ms - Time in milliseconds
 * @returns {Promise<void>} Resolves after the specified time
 */
export const sleep = async (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
