import { EventEmitter } from 'events';
import { onMode } from '../../model/enum/';
import { Page, Browser } from 'puppeteer';
import { scraping } from './scraping.layes';
import { CreateOptions } from '../../model/interface';
import { sleep } from '../../help';

export class ListenerLayer extends scraping {
  public statusFind: any;
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
    this.statusFind = '';
  }

  public async qrCodeScan() {
    let urlCode = null;
    this.startAutoClose();
    while (true) {
      const result = await this.qrCode().catch();
      if (!result?.urlCode) {
        break;
      }
      if (urlCode !== result.urlCode) {
        Object.assign(result, {
          onType: onMode.qrcode,
        });
        this.statusFind = result;
        urlCode = result.urlCode;
        const qr = await this.asciiQr(urlCode).catch(() => undefined);
        if (this.options.printQRInTerminal) {
          console.log(qr);
        }
      }
      await sleep(100);
    }
  }

  async onChange(event: (status: any) => void) {
    let change = null;
    while (true) {
      if (this.statusFind !== change) {
        change = this.statusFind;
        event && event(change);
      }
      await sleep(100);
    }
  }

  private listenerEmitter = new EventEmitter();

  public async initLitener() {
    const functions = [...Object.values(onMode)];

    for (const func of functions) {
      const has = await this.page
        .evaluate((func) => typeof window[func] === 'function', func)
        .catch(() => false);

      if (!has) {
        await this.page
          .exposeFunction(func, (...args: any) =>
            this.listenerEmitter.emit(func, ...args)
          )
          .catch(() => {});
      }
    }

    await this.page
      .evaluate(() => {
        if (!window.interfaceChange.exposed) {
          window.API.interfaceChange((e: any) => {
            window.interfaceChange(e);
          });
          window.interfaceChange.exposed = true;
        }
        if (!window.newMessage.exposed) {
          window.API.newMessage((e: any) => {
            window.newMessage(e);
          });
          window.interfaceChange.exposed = true;
        }
      })
      .catch(() => {});
    this.listener(onMode.interfaceChange);
    this.listener(onMode.newMessage);
  }

  private listener(type: string): { dispose: () => void } {
    this.listenerEmitter.on(type, (event) => {
      this.ev.statusFind = {
        onType: type,
        session: this.options.session,
        result: event,
      };
    });
    return {
      dispose: () => {
        this.listenerEmitter.off(type, (event) => {
          this.ev.statusFind = {
            onType: type,
            session: this.options.session,
            result: event,
          };
        });
      },
    };
  }
}
