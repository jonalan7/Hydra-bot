import { Browser, BrowserContext, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import * as ChromeLauncher from 'chrome-launcher';

import { CreateOptions } from '../interface';
import { puppeteerConfig } from '../help';

export async function initBrowser(Browser: Browser): Promise<Page | boolean> {
  const wpage: Page = await oneTab(Browser);
  if (wpage) {
    try {
      await wpage.setUserAgent(puppeteerConfig.useragentOverride);
      await wpage.goto(puppeteerConfig.whatsappUrl, {
        waitUntil: 'domcontentloaded',
      });
      Browser.userAgent();
      return wpage;
    } catch {
      return false;
    }
  }
  return false;
}

export async function initLaunch(
  options: CreateOptions
): Promise<Browser | boolean> {
  if (options.puppeteerOptions?.executablePath === 'useChrome') {
    const chromePath: string | undefined = getPathChrome();
    if (chromePath === undefined) {
      console.log('erro get Path chrome');
    } else {
      options.puppeteerOptions.executablePath = chromePath;
      console.log(options.puppeteerOptions?.executablePath);
    }
  }

  puppeteer.use(StealthPlugin());

  try {
    return await puppeteer.launch({
      headless: options.puppeteerOptions?.headless,
      args: options.puppeteerOptions?.args,
      executablePath: options.puppeteerOptions?.executablePath,
    });
  } catch (e) {
    return false;
  }
}

export async function oneTab(
  Browser: Browser | BrowserContext
): Promise<Page | any> {
  try {
    const page: Page[] = await Browser.pages();
    if (page.length) return page[0];
    return await Browser.newPage();
  } catch {
    return false;
  }
}
export function getPathChrome(): string | undefined {
  try {
    const chromeInstalations: string[] =
      ChromeLauncher.Launcher.getInstallations();
    return chromeInstalations[0];
  } catch {
    return undefined;
  }
}
