import { Browser } from 'puppeteer';
/**
 * Function to check if the browser is closed and call the callback function
 * @param browser - Browser instance from puppeteer
 * @param callStatus - Callback function to call when the browser is closed
 */
export async function checkingCloses(
  browser: Browser,
  callStatus: (event: boolean) => void
) {
  try {
    // Listen for the browser being closed
    browser.on('disconnected', () => callStatus(true));

    // Get all pages and listen for page close events
    const pages = await browser.pages();
    pages.forEach((page) => page.on('close', () => callStatus(true)));
  } catch (error) {
    console.error('Error checking browser closes:', error);
  }
}
