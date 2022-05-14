import { Page } from 'puppeteer';
import { sleep } from './index';
declare global {
  interface Window {
    webpackChunkwhatsapp_web_client: any;
    qtd_web_client: number;
  }
}
export async function checkWebPack(
  page: Page,
  callback: (status: boolean) => void
): Promise<void> {
  const result = await page
    .evaluate(() => {
      window.qtd_web_client = 0;
    })
    .catch(() => {});
  while (true) {
    await page.waitForFunction('window.webpackChunkwhatsapp_web_client.length').catch();
    const result = await page
      .evaluate(() => {
        const webPack = window.webpackChunkwhatsapp_web_client.length;
         const webPackLast = window.webpackChunkwhatsapp_web_client.length - 1;
        if (!window.webpackChunkwhatsapp_web_client[webPackLast][0].includes("parasitesnake") && window.qtd_web_client !== webPack) {
            console.log(window.webpackChunkwhatsapp_web_client);
          window.qtd_web_client = webPack;
          return true;
        }
        return false;
      })
      .catch(() => { });
    if (result) {
      callback && callback(true);
    }

    await sleep(3000);
  }
}
