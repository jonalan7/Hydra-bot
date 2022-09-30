export interface process {
  close: any;
  _process: any;
}

export async function checkingCloses(
  browser: process,
  callStatus: (e: boolean) => void
) {
  let processClose = false;
  if (browser._process) {
    browser._process.once('close', () => {
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
            browser.close().catch((e: any) => reject(e));
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
