import { Page, Browser } from 'puppeteer';
import * as path from 'path';
import { SenderLayer } from '../api/layes/sender.layes';
import { CreateOptions, defaultConfig } from '../model/interface';

export class webPack extends SenderLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions
  ) {
    super(page, browser, options);
    this.initService();
    this.initModeInterfaceChange();
    this.page.on('load', async () => {
      await this.initService();
    });
  }

  async initService() {
    try {
      await this.page
        .waitForFunction('webpackChunkwhatsapp_web_client.length')
        .catch();
      await this.page
        .addScriptTag({
          path: require.resolve(path.join(__dirname, '../assets/', 'api.js')),
        })
        .catch();
      this.initLitener();
    } catch {}
  }
}
