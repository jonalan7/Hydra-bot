/**
 * Waits for a specific DOM element to appear
 * @param {string} selector - The CSS selector of the element to wait for
 * @param {number} interval - Time in milliseconds between checks (default: 200ms)
 * @param {number} maxAttempts - Maximum number of attempts (default: 20)
 * @returns {Promise<Element>} Resolves with the found DOM element, or rejects if not found
 */
export const waitForSelector = (selector, interval = 200, maxAttempts = 20) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const pollForElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (attempts >= maxAttempts) {
        reject(
          new Error(
            `Element "${selector}" not found after ${maxAttempts} attempts.`
          )
        );
      } else {
        attempts++;
        setTimeout(pollForElement, interval);
      }
    };

    pollForElement();
  });
};
