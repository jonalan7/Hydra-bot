import { GroupLayer } from './';
import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface';
import { FunctionsLayer } from '../../model/enum';

export class Profile extends GroupLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  /**
   * Logout of the current session
   */
  public async logoutSession() {
    return this.handleApiCallParametres(FunctionsLayer.logoutSession);
  }

  /**
   * Closes page and browser
   */
  public async browserClose() {
    try {
      if (!this.page.isClosed()) {
        await this.page.close();
        await this.browser.close();
        return true;
      }
    } catch {
      return false;
    }
  }
}
