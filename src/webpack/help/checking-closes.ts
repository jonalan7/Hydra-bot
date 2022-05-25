import { Page, Browser } from 'puppeteer';

export async function checkingCloses(
  browser: Browser,
  callStatus: (e: boolean) => void
) {
  let processClose = false;
  if (browser['_process']) {
    browser['_process'].once('close', () => {
      processClose = true;
    });
  }
  new Promise(async (resolve, reject) => {
    if (typeof browser !== 'string') {
      let err: boolean;
      do {
        try {
          await new Promise((r) => setTimeout(r, 2000));
          if (processClose) {
            browser.close().catch((e) => reject(e));
            callStatus && callStatus(true);
            err = false;
          } else {
            throw 1;
          }
        } catch (e) {
          err = true;
        }
      } while (err);
    }
  });
}
