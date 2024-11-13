import { CreateOptions, defaultConfig } from '../model/interface';
import { initLaunch, initBrowser } from './browser';
import { Browser, Page } from 'puppeteer';
import { WebPack } from '../inject/webpack';
import { CallbackOnStatus } from './layes/callback-on.layes';
import { onMode, TypeStatusFind } from '../model/enum';
import { checkingCloses, sleep } from '../help';
import { checkUpdates } from './check-up-to-date';

const ev = new CallbackOnStatus();

export async function initServer(
  createOption?: CreateOptions
): Promise<WebPack | any>;

/**
 * Start the bot
 */
export async function initServer(
  options?: CreateOptions
): Promise<WebPack | CallbackOnStatus> {
  return new Promise(async (resolve) => {
    resolve(ev);

    const mergeOptionsDefault: CreateOptions = { ...defaultConfig, ...options };

    if (!!options?.puppeteerOptions) {
      mergeOptionsDefault.puppeteerOptions = {
        ...defaultConfig.puppeteerOptions,
        ...options.puppeteerOptions,
      };
    }

    if (!!mergeOptionsDefault.session && mergeOptionsDefault.session.length) {
      const sessionName = mergeOptionsDefault.session;
      const replaceSession = sessionName.replace(/[^0-9a-zA-Zs]/g, '');
      if (replaceSession.length) {
        mergeOptionsDefault.session = replaceSession;
      } else {
        mergeOptionsDefault.session = defaultConfig.session;
      }
    }

    if (mergeOptionsDefault.updatesLog) {
      await checkUpdates();
    }

    ev.emitStatusFind({
      erro: false,
      text: 'Starting browser...',
      status: TypeStatusFind.initBrowser,
      statusFind: 'browser',
      onType: onMode.connection,
      session: mergeOptionsDefault.session,
    });

    const wpage: Browser | boolean | any = await initLaunch(
      mergeOptionsDefault,
      ev
    );

    if (typeof wpage !== 'boolean') {
      ev.emitStatusFind({
        erro: false,
        text: 'Opening whatsapp page!',
        status: TypeStatusFind.initWhatsapp,
        statusFind: 'browser',
        onType: onMode.connection,
        session: mergeOptionsDefault.session,
      });

      const page: boolean | Page = await initBrowser(wpage);
      if (typeof page !== 'boolean') {
        ev.emitStatusFind({
          erro: false,
          page: page,
          statusFind: 'page',
          onType: onMode.connection,
          session: mergeOptionsDefault.session,
        });

        await sleep(100);

        ev.emitStatusFind({
          erro: false,
          text: 'Website accessed successfully',
          status: TypeStatusFind.openedWhatsapp,
          statusFind: 'browser',
          onType: onMode.connection,
          session: mergeOptionsDefault.session,
        });

        const client = new WebPack(page, wpage, mergeOptionsDefault, ev);
        checkingCloses(wpage, () => {
          ev.emitStatusFind({
            erro: true,
            text: 'The browser has closed',
            status: TypeStatusFind.browserClosed,
            statusFind: 'browser',
            onType: onMode.connection,
            session: mergeOptionsDefault.session,
          });
        }).catch(() => {
          console.log('The client has been closed');
        });

        ev.on(onMode.interfaceChange, async (interFace: any) => {
          try {
            client.cancelAutoClose();

            if (
              interFace.result.mode === 'MAIN' &&
              interFace.result.info === 'NORMAL'
            ) {
              ev.emitStatusFind({
                erro: false,
                connect: true,
                onType: onMode.connection,
                session: mergeOptionsDefault.session,
                client: client,
              });
            }
            if (
              interFace.result.mode === 'QR' &&
              interFace.result.info === 'NORMAL'
            ) {
              ev.emitStatusFind({
                erro: false,
                qrcode: interFace.result.info,
                onType: onMode.connection,
                session: mergeOptionsDefault.session,
              });
              await client.qrCodeScan();
            }
          } catch {}
        });
      } else {
        ev.emitStatusFind({
          erro: true,
          text: 'Error open whatzapp',
          status: TypeStatusFind.noOpenWhatzapp,
          statusFind: 'browser',
          onType: onMode.connection,
          session: mergeOptionsDefault.session,
        });
        wpage.close();
      }
    } else {
      ev.emitStatusFind({
        erro: true,
        text: 'Error open browser...',
        status: TypeStatusFind.noOpenBrowser,
        statusFind: 'browser',
        onType: onMode.connection,
        session: mergeOptionsDefault.session,
      });
    }
  });
}
