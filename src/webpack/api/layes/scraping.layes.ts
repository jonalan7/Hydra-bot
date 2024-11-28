import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import * as qrcode from 'qrcode-terminal';
import { OnMode, TypeStatusFind } from '../../model/enum';
import { OnMod } from './on-wpp';

export class Scraping extends OnMod {
  public startScanQrcode: boolean;
  public autoCloseInterval: any;
  public autoCloseRemain: number = 0;

  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
    this.startScanQrcode = false;
  }

  protected tryAutoClose() {
    if (
      this.options.timeAutoClose &&
      this.options.timeAutoClose > 0 &&
      !this.autoCloseInterval &&
      !this.page.isClosed()
    ) {
      this.page.close().catch(() => {});
      this.browser.close().catch(() => {});
    }
  }

  public cancelAutoClose() {
    clearInterval(this.autoCloseInterval);
    this.autoCloseInterval = null;
  }

  protected startAutoClose() {
    let remain: Number | Boolean | any = this.options.timeAutoClose
      ? this.options.timeAutoClose
      : false;
    if (
      this.options.timeAutoClose &&
      this.options.timeAutoClose > 0 &&
      !this.autoCloseInterval
    ) {
      try {
        this.autoCloseInterval = setInterval(() => {
          if (this.page.isClosed()) {
            this.cancelAutoClose();
            return;
          }
          if (Number.isInteger(remain)) {
            remain -= 1000;
            this.autoCloseRemain = Math.round(remain / 1000);
            if (remain <= 0) {
              this.ev.emitStatusFind({
                error: false,
                text: 'Auto close called!',
                status: TypeStatusFind.autoClose,
                statusFind: 'browser',
                onType: OnMode.connection,
                session: this.options.session,
              });
              this.cancelAutoClose();
              this.tryAutoClose();
            }
          }
        }, 1000);
      } catch {}
    }
  }

  public async qrCode() {
    let click = await this.page
      .evaluate(() => {
        const buttonReload = document.querySelector('button._akas');
        if (buttonReload) {
          return true;
        }
        return false;
      })
      .catch();

    if (click) {
      const buttonReloadElementHandle = await this.page.$('button._akas');
      if (buttonReloadElementHandle) {
        await buttonReloadElementHandle.click();
      }
    }

    const result = await this.page
      .evaluate(() => {
        const selectorImg = document.querySelector('canvas');
        if (selectorImg) {
          const selectorUrl = selectorImg.closest('[data-ref]');
          const buttonReload = document.querySelector('button._akas');

          if (
            buttonReload === null &&
            selectorImg != null &&
            selectorUrl != null
          ) {
            let data = {
              base64Image: selectorImg.toDataURL(),
              urlCode: selectorUrl.getAttribute('data-ref'),
            };
            return data;
          } else {
            return undefined;
          }
        }
      })
      .catch();
    return result;
  }

  async asciiQr(code: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        qrcode.generate(code, { small: true }, (qrcode: any) => {
          resolve(qrcode);
        });
      } catch (e) {}
    });
  }
}
