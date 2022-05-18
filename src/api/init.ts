import { CreateOptions, defaultConfig } from '../model/interface';
import { initLaunch, initBrowser } from './browser';
import { Browser, BrowserContext, Page } from 'puppeteer';
import { webPack } from '../inject/webpack';


export async function initServer(createOption: CreateOptions): Promise<any>;

export async function initServer(
  options: CreateOptions
): Promise<webPack | any> {
  const mergeOptionsDefault = { ...defaultConfig, ...options };
  mergeOptionsDefault.puppeteerOptions = {
    ...defaultConfig.puppeteerOptions,
    ...options.puppeteerOptions,
  };
  const wpage: Browser | boolean = await initLaunch(mergeOptionsDefault);
  if (typeof wpage !== 'boolean') {
    const page: boolean | Page = await initBrowser(wpage);
    if (typeof page !== 'boolean') {
      const client = new webPack(page, wpage, mergeOptionsDefault);

      return client;
    } else {
      console.log('Error open whatzapp');
    }
  } else {
    console.log('Error open browser...');
  }
}
