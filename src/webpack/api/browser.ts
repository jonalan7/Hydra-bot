import { Browser, BrowserContext, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import * as ChromeLauncher from 'chrome-launcher';
import * as path from 'path';
import * as fs from 'fs';

import { CreateOptions } from '../model/interface';
import { puppeteerConfig } from '../help';

const StealthPlugin = require('puppeteer-extra-plugin-stealth');

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
export function PathSession(options: CreateOptions) {
  options.mkdirFolderToken = options.mkdirFolderToken
    ? options.mkdirFolderToken
    : '';
  options.pathNameToken = options.pathNameToken ? options.pathNameToken : '';
  options.session = options.session ? options.session : '';
  const folderNameToken = path.join(
    path.resolve(process.cwd(), options.mkdirFolderToken, options.pathNameToken)
  );

  if (!fs.existsSync(folderNameToken)) {
    fs.mkdirSync(folderNameToken, {
      recursive: true,
    });
  }

  const pathSession = path.join(
    path.resolve(
      process.cwd(),
      options.mkdirFolderToken,
      options.pathNameToken,
      options.session
    )
  );

  fs.chmodSync(folderNameToken, '777');

  if (options && options.puppeteerOptions) {
    options.puppeteerOptions.userDataDir = pathSession;
  }

  puppeteerConfig.chromiumArgs.push(`--user-data-dir=${pathSession}`);
}

export async function initLaunch(
  options: CreateOptions
): Promise<Browser | boolean> {
  PathSession(options);

  if (options.puppeteerOptions?.executablePath === 'useChrome') {
    const chromePath: string | undefined = getPathChrome();
    if (chromePath === undefined) {
      console.log('erro get Path chrome');
    } else {
      options.puppeteerOptions.executablePath = chromePath;
    }
  }

  try {
    puppeteer.use(StealthPlugin());
    return await puppeteer.launch({
      headless: options.puppeteerOptions?.headless,
      args: options.puppeteerOptions?.args,
      executablePath: options.puppeteerOptions?.executablePath,
      userDataDir: options.puppeteerOptions?.userDataDir,
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
