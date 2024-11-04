import { Page, Browser } from 'puppeteer';
import { SenderLayer } from '../api/layes/sender.layes';
import { CreateOptions } from '../model/interface';

import * as fs from 'fs';
import * as path from 'path';

export class WebPack extends SenderLayer {
  public loadPageStatus: boolean = false;

  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: unknown
  ) {
    super(page, browser, options, ev);
    this.initService();

    this.page.on('load', async () => {
      if (this.loadPageStatus) {
        await this.initService();
        this.loadPageStatus = false;
      }
    });
  }

  async initService() {
    try {
      const storeModuleExists = await this.page.evaluate(() => {
        const isStoreUndefined = typeof window?.Store === 'undefined';
        const isApiUndefined = typeof window?.API === 'undefined';
        const isStoreEmpty =
          window?.Store && !Object.keys(window?.Store).length;
        const isApiEmpty = window?.API && !Object.keys(window?.API).length;

        return isStoreUndefined || isApiUndefined || isStoreEmpty || isApiEmpty;
      });

      if (storeModuleExists) {
        await this.loadDebugModule();

        const apiScript = fs.readFileSync(
          require.resolve(path.join(__dirname, '../assets/', 'api.js')),
          'utf8'
        );
        await this.page.evaluate(apiScript);

        await this.checkStoreInitialization();
        this.loadPageStatus = true;
        this.initListener();
      }
    } catch (error) {
      console.error('Erro ao iniciar o serviço:', error);
    }
  }

  private async loadDebugModule() {
    return this.page.evaluate(() => {
      return new Promise((resolve) => {
        const checkDebug = () => {
          try {
            return require('__debug');
          } catch {
            return false;
          }
        };

        const checkObjects = () => {
          const debug = checkDebug();
          if (debug && !window['__debug']) {
            window['__debug'] = debug;
            resolve(true);
          } else {
            setTimeout(checkObjects, 200);
          }
        };

        checkObjects();
      });
    });
  }

  private async checkStoreInitialization() {
    return this.page.evaluate(() => {
      return new Promise((resolve) => {
        const checkStoreLoaded = () => {
          try {
            return Object.keys(window.Store).length > 0;
          } catch {
            return false;
          }
        };

        const checkObjects = () => {
          if (
            checkStoreLoaded() &&
            window?.Store?.Stream &&
            window?.Store?.Msg
          ) {
            resolve(true);
          } else {
            setTimeout(checkObjects, 200);
          }
        };

        checkObjects();
      });
    });
  }
}
