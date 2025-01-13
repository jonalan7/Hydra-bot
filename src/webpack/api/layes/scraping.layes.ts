import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import { OnMode, TypeStatusFind, InterfaceMode } from '../../model/enum';
import { OnMod } from './on-wpp';
import { sleep } from '../../help';
import * as qrcode from 'qrcode-terminal';
import { FunctionsLayer } from '../../model/enum';

export class Scraping extends OnMod {
  public startScanQrcode: boolean;
  public autoCloseInterval: any;
  public autoCloseRemain: number = 0;
  public scanPhoneNumbersActive: boolean = false;
  public scanQrCodeActive: boolean = false;
  protected urlCode: any = '';

  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
    this.startScanQrcode = false;
  }

  /**
   * Function to get the pairing type
   * @returns string
   */
  public async getPairingType(): Promise<string> {
    try {
      return await this.page.evaluate(() => {
        return window.Store.DeviceLinkingApi.getPairingType();
      });
    } catch (error) {
      console.error('Error in getPairingType:', error);
      throw error;
    }
  }

  /**
   * Function to determine which click interface to use for retrieving a phone number
   * @returns boolean
   */
  public async withPhoneNumber(): Promise<boolean> {
    try {
      return await this.page.evaluate(() => {
        const chevronElement = document.querySelector(
          'span[data-icon="chevron"]'
        );
        const parentElement = chevronElement?.parentElement;
        if (parentElement) {
          parentElement.click();
          return true;
        }
        return false;
      });
    } catch (error) {
      console.error('Error in withPhoneNumber:', error);
      throw error;
    }
  }

  /**
   * Function to check if the phone number input is visible
   * @returns boolean
   */
  public async checkInputVisiblePhoneNumber(): Promise<boolean> {
    try {
      return await this.page.evaluate(() => {
        return Boolean(document.querySelector('.selectable-text'));
      });
    } catch (error) {
      console.error('Error in checkInputVisiblePhoneNumber:', error);
      throw error;
    }
  }

  /**
   * Function to scan phone numbers
   */
  public async scanPhoneNumbers(): Promise<void> {
    this.scanPhoneNumbersActive = true;
    this.startAutoClose();

    let firstCode = false;
    const phoneNumber = this.options.loginWithPhoneNumber?.phoneNumber || false;

    while (true) {
      try {
        const checkInterface = await this.handleApiCallParametres(
          FunctionsLayer.getInterface
        );

        if (checkInterface.mode !== InterfaceMode.QR || !phoneNumber) {
          break;
        }

        const getPairingType = await this.getPairingType();

        if (getPairingType === 'QR_CODE') {
          await this.withPhoneNumber();
          await sleep(2000);
        } else if (getPairingType === 'ALT_DEVICE_LINKING') {
          const selectable = await this.checkInputVisiblePhoneNumber();
          if (selectable) {
            if (!firstCode) {
              await this.handleCodeGeneration(phoneNumber);
              firstCode = true;
            } else {
              await this.handleCodeRefresh(phoneNumber);
            }
          }

          await sleep(
            this.options.loginWithPhoneNumber?.timeRefeshCode ?? 120000
          );
        }
      } catch (error) {
        console.error('Error in scanPhoneNumbers loop:', error);
      }
    }
  }

  /**
   * Handles the generation of a phone number code
   */
  private async handleCodeGeneration(phoneNumber: string): Promise<void> {
    try {
      const code = await this.handleApiCallParametres(
        FunctionsLayer.getCodeForPhoneNumber,
        phoneNumber
      );
      this.emitCodeStatus(code);
    } catch (error) {
      console.error('Error in handleCodeGeneration:', error);
    }
  }

  /**
   * Handles the refreshing and re-generation of a phone number code
   */
  private async handleCodeRefresh(phoneNumber: string): Promise<void> {
    try {
      const refreshCode = await this.handleApiCallParametres(
        FunctionsLayer.refreshAltLinkingCode
      );
      if (refreshCode) {
        await this.handleCodeGeneration(phoneNumber);
      }
    } catch (error) {
      console.error('Error in handleCodeRefresh:', error);
    }
  }

  /**
   * Emits the status of the code generation or error
   */
  private emitCodeStatus(code: any): void {
    if (typeof code === 'string') {
      this.ev.emitStatusFind({
        error: false,
        code: code,
        onType: OnMode.codePhoneNumber,
        session: this.options.session,
        phoneNumber: this.options.loginWithPhoneNumber?.phoneNumber,
      });
    } else {
      this.ev.emitStatusFind({
        error: true,
        text: 'Error in get code phone number',
        code: code,
        onType: OnMode.codePhoneNumber,
        session: this.options.session,
        phoneNumber: this.options.loginWithPhoneNumber?.phoneNumber,
      });
    }
  }

  /**
   * Function to qrcode scan
   */
  public async qrCodeScan() {
    this.startAutoClose();
    this.scanQrCodeActive = true;
    await this.page
      .waitForFunction(`document.querySelector('canvas')`)
      .catch(() => undefined);
    while (true) {
      const checkInterface = await this.handleApiCallParametres(
        FunctionsLayer.getInterface
      );
      if (checkInterface.mode !== InterfaceMode.QR) {
        break;
      }
      const result = await this.qrCode().catch();
      if (!result?.urlCode) {
        break;
      }
      if (this.urlCode !== result.urlCode) {
        this.urlCode = result.urlCode;
        this.ev.emitStatusFind({
          error: false,
          qrcode: result.urlCode,
          base64Image: result.base64Image,
          onType: OnMode.qrcode,
          session: this.options.session,
        });

        const qr = await this.asciiQr(this.urlCode).catch(() => undefined);
        if (this.options.printQRInTerminal) {
          console.log(qr);
        }
      }
      await sleep(100)?.catch(() => undefined);
    }
  }

  /**
   * Function try auto close session
   */
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

  /**
   * Function cancel auto close session
   */
  public cancelAutoClose() {
    clearInterval(this.autoCloseInterval);
    this.autoCloseInterval = null;
  }

  /**
   * Function start auto close session
   */
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

  /**
   * Function scrape qrcode from page whatsapp web and return base64 image and code
   * @returns - base64Image and urlCode
   */
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

  /**
   * Function generate ascii qr code
   * @param code - code to generate ascii qr code
   * @returns - ascii qr code
   */
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
