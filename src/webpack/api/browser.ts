import { Browser, BrowserContext, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import * as ChromeLauncher from 'chrome-launcher';
import * as path from 'path';
import * as fs from 'fs';
import { OnMode, TypeStatusFind } from '../model/enum';
import { CreateOptions } from '../model/interface';
import { puppeteerConfig } from '../help';

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
/**
 * Function to create a new tab in the browser instance
 * @param Browser - Browser instance to create a new tab
 * @returns - Returns a new tab or false if it fails
 */
export async function initBrowser(Browser: Browser): Promise<Page | boolean> {
  const wpage: Page = await oneTab(Browser);
  if (wpage) {
    try {
      await wpage.setUserAgent(puppeteerConfig.useragentOverride);
      await wpage.setCacheEnabled(true);
      await wpage.goto(puppeteerConfig.whatsappUrl, {
        waitUntil: 'domcontentloaded',
      });
      wpage.on('pageerror', ({ message }) => {
        const erroLogType1 = message.includes(
          'RegisterEffect is not a function'
        );
        const erroLogType2 = message.includes('[Report Only]');
        if (erroLogType1 || erroLogType2) {
          wpage.evaluate(() => {
            localStorage.clear();
            window.location.reload();
          });
        }
      });

      Browser.userAgent();
      return wpage;
    } catch {
      return false;
    }
  }
  return false;
}
/**
 * Function to create a new session in the browser instance
 * @param options - Options to create a new session in the browser instance
 */
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
    fs.mkdirSync(folderNameToken, { recursive: true });
  }

  const pathSession = path.join(
    path.resolve(
      process.cwd(),
      options.mkdirFolderToken,
      options.pathNameToken,
      options.session
    )
  );

  if (!fs.existsSync(pathSession)) {
    fs.mkdirSync(pathSession, { recursive: true });
  }

  fs.chmodSync(folderNameToken, '777');
  fs.chmodSync(pathSession, '777');

  if (options && options.puppeteerOptions) {
    options.puppeteerOptions.userDataDir = pathSession;
  }

  puppeteerConfig.chromiumArgs.push(`--user-data-dir=${pathSession}`);
}

/**
 * Function to create a new session in the browser instance
 * @param options - Options to create a new session in the browser instance
 * @param ev - Event to emit status
 * @returns - Returns a new browser instance or false if it fails
 */
export async function initLaunch(
  options: CreateOptions,
  ev: any
): Promise<Browser | boolean> {
  PathSession(options);

  if (options.puppeteerOptions?.executablePath === 'useChrome') {
    const chromePath: string | undefined = getPathChrome();
    options.puppeteerOptions.executablePath = chromePath;
  }

  if (
    options.puppeteerOptions?.downloadChromium &&
    options.puppeteerOptions?.chromiumVersion &&
    options.puppeteerOptions?.executablePath === 'useChromium'
  ) {
    const browserFetcher = puppeteer.createBrowserFetcher({});
    let init = true;

    ev.emitStatusFind({
      error: false,
      text: 'Await download Chromium',
      status: TypeStatusFind.chromium,
      statusFind: 'browser',
      onType: OnMode.connection,
      session: options.session,
    });

    await browserFetcher
      .download(
        options.puppeteerOptions?.chromiumVersion,
        (downloadedByte: number, totalBytes: number) => {
          if (init) {
            ev.emitStatusFind({
              error: false,
              text: 'Checking the total bytes to download!',
              status: TypeStatusFind.chromium,
              statusFind: 'browser',
              onType: OnMode.connection,
              session: options.session,
            });

            if (totalBytes) {
              ev.emitStatusFind({
                error: false,
                text: `Total Bytes ${totalBytes}`,
                status: TypeStatusFind.chromium,
                statusFind: 'browser',
                onType: OnMode.connection,
                session: options.session,
              });
            }
            init = true;
          }

          if (downloadedByte) {
            ev.emitStatusFind({
              error: false,
              text: `Total Bytes: ${totalBytes} download: ${downloadedByte}`,
              status: TypeStatusFind.chromium,
              statusFind: 'browser',
              onType: OnMode.connection,
              session: options.session,
            });
          }

          if (downloadedByte === totalBytes) {
            ev.emitStatusFind({
              error: false,
              text: `Extract files... await...`,
              status: TypeStatusFind.chromium,
              statusFind: 'browser',
              onType: OnMode.connection,
              session: options.session,
            });
          }
        }
      )
      .then((revisionInfo: { executablePath: string | undefined }) => {
        if (options.puppeteerOptions?.executablePath) {
          options.puppeteerOptions.executablePath =
            revisionInfo?.executablePath;
          ev.emitStatusFind({
            error: false,
            text: `download completed, path: ${revisionInfo?.executablePath}`,
            status: TypeStatusFind.chromium,
            statusFind: 'browser',
            onType: OnMode.connection,
            session: options.session,
          });
        }

        if (options.puppeteerOptions?.args) {
          options.puppeteerOptions.args.push(`--single-process`);
        }
      })
      .catch((e: any) => {
        ev.emitStatusFind({
          error: true,
          text: `Error chromium`,
          status: TypeStatusFind.chromium,
          statusFind: 'browser',
          onType: OnMode.connection,
          session: options.session,
          result: e,
        });
      });
  }

  if (!options.puppeteerOptions?.executablePath) {
    return false;
  }

  try {
    return await puppeteer.launch({
      headless: options.puppeteerOptions?.headless,
      args: [
        ...puppeteerConfig.chromiumArgs,
        ...(options.puppeteerOptions?.args || []),
      ],
      executablePath: options.puppeteerOptions?.executablePath,
      userDataDir: options.puppeteerOptions?.userDataDir,
      devtools: options.puppeteerOptions?.devtools,
    });
  } catch (e) {
    return false;
  }
}

/**
 * Function to create a new tab in the browser instance
 * @param Browser - Browser instance to create a new tab
 * @returns - Returns a new tab or false if it fails
 */
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
