import { GroupLayer } from './group.layer';
import { Page, Browser } from 'puppeteer';
import { CreateOptions, InterfaceHost, contact } from '../../model/interface';
import { onMode } from '../../model/enum';

export class RetrieverLayer extends GroupLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  /**
   * returns a list of contacts
   * @returns contacts
   */
  public async getAllContacts(): Promise<contact> {
    return await this.page.evaluate(() => API.getAllContacts());
  }

  /**
   * Get information from the connected number
   * @returns Current host device details
   */
  public async getHost(): Promise<InterfaceHost> {
    return await this.page.evaluate(() => API.getHost());
  }

  /**
   * Get screenshot
   * @returns base64 image
   */
  public async screenshot() {
    const base64 = await this.page
      .screenshot({
        encoding: 'base64',
      })
      .catch(() => undefined);
    return { base64Image: `data:image/png;base64,${base64}` };
  }
}
