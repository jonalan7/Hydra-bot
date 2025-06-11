import { Browser, BrowserContext, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import * as ChromeLauncher from 'chrome-launcher';
import * as path from 'path';
import * as fs from 'fs';
import { OnMode, TypeStatusFind } from '../model/enum';
import { CreateOptions } from '../model/interface';
import { puppeteerConfig } from '../help';
import { EventEmitter } from 'events';

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
/**
 * Function to create a new tab in the browser instance
 * @param Browser - Browser instance to create a new tab
 * @param options - Options to create a new session in the browser instance
 * @returns - Returns a new tab or false if it fails
 */
export async function initBrowser(
  Browser: Browser,
  options: CreateOptions,
  ev: any
): Promise<Page | boolean> {
  await closeExtraPages(Browser);
  const wpage: Page = await oneTab(Browser);
  if (wpage) {
    try {
      await wpage.setUserAgent(puppeteerConfig.useragentOverride);
      await wpage.setCacheEnabled(true);

      const puppeteerOpts = options.puppeteerOptions;

      const proxyUsername = puppeteerOpts?.proxyUsername;
      const proxyPassword = puppeteerOpts?.proxyPassword;
      const listProxy = puppeteerOpts?.listProxy;

      const hasProxyCredentials =
        typeof proxyUsername === 'string' &&
        proxyUsername.length > 0 &&
        typeof proxyPassword === 'string' &&
        proxyPassword.length > 0;

      const hasProxyList = Array.isArray(listProxy) && listProxy.length > 0;

      // If proxy credentials and list are provided, set the proxy
      if (hasProxyCredentials && hasProxyList) {
        await wpage.authenticate({
          username: proxyUsername as string,
          password: proxyPassword as string,
        });
      }

      const response = await wpage.goto(puppeteerConfig.whatsappUrl, {
        waitUntil: 'domcontentloaded',
      });

      if (response && response.status() === 407) {
        return false;
      }

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

      logoutListener(wpage, ev, options);

      Browser.userAgent();
      return wpage;
    } catch (e) {
      console.error('Error initializing browser:', e);
      return false;
    }
  }
  return false;
}

/**
 * function to listen for logout events in the browser page
 * @param page - The page instance where the listener will be set
 * @param ev - The event emitter to emit status updates
 * @param options = - Options for creating a new session in the browser instance
 */
export const logoutListener = async (
  page: Page,
  ev: any,
  options: CreateOptions
) => {
  const event = new Listener(page);
  await event.getListenerEmitter(
    'eventOnLogout',
    (data: { type: TypeStatusFind; text: string }) => {
      ev.emitStatusFind({
        error: false,
        text: data.text,
        status: data.type,
        statusFind: 'page',
        onType: OnMode.connection,
        session: options.session,
      });
    }
  );

  await page
    .evaluate(async () => {
      let WAWebCmd: any = undefined;
      if ((window as any).WAWebCmdInitialized) return;
      (window as any).WAWebCmdInitialized = true;

      const waitForCmd = async () => {
        await new Promise<void>((resolve) => {
          const check = () => {
            WAWebCmd = window.importNamespace
              ? window.importNamespace('WAWebCmd')
              : {};
            if (WAWebCmd?.Cmd?.on) {
              resolve();
            } else {
              setTimeout(check, 200);
            }
          };
          check();
        });
      };

      await waitForCmd();

      console.log('WAWebCmd is ready');
      WAWebCmd.Cmd.on('starting_logout', () => {
        if (typeof window.eventOnLogout === 'function') {
          window.eventOnLogout({
            type: 'starting_logout',
            text: 'Logout is in progress: the user is actively logging out.',
          });
        }
      });

      WAWebCmd.Cmd.on('logout', () => {
        if (typeof window.eventOnLogout === 'function') {
          window.eventOnLogout({
            type: 'logout',
            text: 'Logout completed: the user is no longer connected.',
          });
        }
      });
    })
    .catch((e) => {
      console.log('Error in logoutListener:', e);
    });
};
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

  const puppeteerOpts = options.puppeteerOptions;
  const listProxy = puppeteerOpts?.listProxy;

  if (Array.isArray(listProxy) && listProxy.length > 0) {
    const proxy = listProxy[Math.floor(Math.random() * listProxy.length)];
    const proxyArg = `--proxy-server=${proxy}`;

    const passArgs = puppeteerOpts.args;

    if (Array.isArray(passArgs) && passArgs.length > 0) {
      options.puppeteerOptions.args = [...passArgs, proxyArg];
    } else {
      puppeteerConfig.chromiumArgs = [
        ...puppeteerConfig.chromiumArgs,
        proxyArg,
      ];
    }
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
 * Function to close all extra pages in the browser instance
 * @param browser - Browser instance to close extra pages
 */
export async function closeExtraPages(browser: Browser | BrowserContext) {
  const pages: Page[] = await browser.pages();
  for (let i = 1; i < pages.length; i++) {
    const page = pages[i];
    if (page.isClosed()) continue;
    try {
      await page.close();
    } catch {
      continue;
    }
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
    if (page.length) {
      return page[0];
    }
    return await Browser.newPage();
  } catch {
    return false;
  }
}

/**
 * Function to get the path of the Chrome browser
 * @return - Returns the path of the Chrome browser or undefined if it fails
 * */
export function getPathChrome(): string | undefined {
  try {
    const chromeInstalations: string[] =
      ChromeLauncher.Launcher.getInstallations();
    return chromeInstalations[0];
  } catch {
    return undefined;
  }
}

/**
 * ListenerLayer class to handle events in the browser page
 * This class uses an EventEmitter to listen for events and expose functions to the page.
 */
export class Listener {
  constructor(public page: Page) {}
  private listenerEmitter = new EventEmitter();

  /**
   * @param functionName - The name of the function to listen for events
   * @param fn - Optional callback function to handle the event
   * This method checks if the function is already defined in the page context,
   */
  public async getListenerEmitter(
    functionName: string,
    fn?: (info: any) => void
  ) {
    try {
      const hasFunction = await this.page
        .evaluate(
          (funcName: string) => typeof (window as any)[funcName] === 'function',
          functionName
        )
        .catch(() => false);

      if (!hasFunction) {
        // Expose the function to the page
        await this.page
          .exposeFunction(functionName, (...args: any[]) => {
            this.listenerEmitter.emit(functionName, ...args);
          })
          .catch(() => undefined);
      }

      this.listenerEmitter.on(functionName, (event) => {
        fn && fn(event);
      });

      return {
        dispose: () => {
          this.listenerEmitter.off(functionName, (event) => {
            fn && fn(event);
          });
        },
      };
    } catch (error) {
      console.error('Error in getListenerEmitter:', error);
    }
  }
}
