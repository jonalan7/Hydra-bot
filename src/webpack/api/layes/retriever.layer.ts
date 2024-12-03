import { GroupLayer } from './group.layer';
import { Page, Browser } from 'puppeteer';
import { CreateOptions, InterfaceHost, Contact } from '../../model/interface';

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
   * Returns a list of contacts
   * @returns List of contacts
   */
  public async getAllContacts(): Promise<Contact> {
    return this.handleApiCall(
      async () => await API.getAllContacts(),
      'getAllContacts'
    );
  }

  /**
   * Get information from the connected number
   * @returns Current host device details
   */
  public async getHost(): Promise<InterfaceHost> {
    return this.handleApiCall(async () => await API.getHost(), 'getHost');
  }

  /**
   * Get version of the current whatsapp
   * @returns Current whatsapp version
   */
  public async getWAVersion() {
    return this.handleApiCall(
      async () => await API.getWAVersion(),
      'getWAVersion'
    );
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

  /**
   * Check if the number exists
   * @param {string} number phone number
   */
  public async checkNumber(number: string) {
    return await this.page.evaluate(
      (number) => API.checkNumberStatus(number),
      number
    );
  }
}
