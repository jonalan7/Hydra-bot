import { CreateOptions, defaultConfig } from '../model/interface';
import { initLaunch, initBrowser } from './browser';
import { Browser, Page } from 'puppeteer';
import { webPack } from '../inject/webpack';
import { CallbackConnection } from './layes/callback-connect.layes';
import { onMode } from '../model/enum';
import { checkingCloses } from '../help';
import { checkUpdates } from './check-up-to-date';
const conn = new CallbackConnection();

export async function initServer(
  createOption?: CreateOptions
): Promise<webPack | any>;

export async function initServer(
  options?: CreateOptions
): Promise<webPack | any> {
  return new Promise(async (resolve) => {
    const mergeOptionsDefault = { ...defaultConfig, ...options };

    if (!!options?.puppeteerOptions) {
      mergeOptionsDefault.puppeteerOptions = {
        ...defaultConfig.puppeteerOptions,
        ...options.puppeteerOptions,
      };
    }

    if (mergeOptionsDefault.updatesLog) {
      await checkUpdates();
    }

    const wpage: Browser | boolean = await initLaunch(mergeOptionsDefault);

    if (typeof wpage !== 'boolean') {
   
      const page: boolean | Page = await initBrowser(wpage);
      if (typeof page !== 'boolean') {
        const client = new webPack(page, wpage, mergeOptionsDefault);
        checkingCloses(wpage, () => {
          client.statusFind = {
            erro: true,
            text: 'The browser has closed',
            statusFind: 'browserClosed',
            onType: onMode.connection,
          };
        }).catch(() => {
          console.log('The client has been closed');
        });
        return resolve(client);
      } else {
        resolve(conn);
        conn.statusFind = {
          erro: true,
          text: 'Error open whatzapp',
          statusFind: 'noOpenWhatzapp',
          onType: onMode.connection,
        };
        wpage.close();
      }
    } else {
      resolve(conn);
      conn.statusFind = {
        erro: true,
        text: 'Error open browser...',
        statusFind: 'noOpenBrowser',
        onType: onMode.connection,
      };
    }
  });
}
