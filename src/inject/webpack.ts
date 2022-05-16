import { Page } from 'puppeteer';
import * as path from 'path';
import { SenderLayer } from '../api/layes/sender.layes';



export class webPack extends SenderLayer {
  constructor(public page: Page) {
    super(page);
    this.initService();
  }

  async initService() {
    await this.page
      .waitForFunction('webpackChunkwhatsapp_web_client.length')
      .catch();
    await this.page
      .addScriptTag({
        path: require.resolve(path.join(__dirname, '../assets/', 'api.js')),
      })
      .catch();
    this.page.on('load', async () => {
      await this.initService();
    });

    this.initLitener()
  
  }

}
