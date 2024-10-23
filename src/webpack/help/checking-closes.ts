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
  browser.on('disconnected', () => callStatus(true));
}
