import { EventEmitter } from 'events';
import { onMode } from '../../model/enum/';
import { Page, Browser } from 'puppeteer';
import { Whatsapp } from './whatsapp';
import { CreateOptions } from '../../model/interface';
import { sleep } from '../../help';

export class ListenerLayer extends Whatsapp {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
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
        this.ev.statusFind = {
          erro: false,
          qrcode: result.urlCode,
          base64Image: result.base64Image,
          onType: onMode.qrcode,
          session: this.options.session,
        };

        urlCode = result.urlCode;
        const qr = await this.asciiQr(urlCode).catch(() => undefined);
        if (this.options.printQRInTerminal) {
          console.log(qr);
        }
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
        window.API.interfaceChange((e: any) => {
          window.interfaceChange(e);
        });
        window.API.newMessage((e: any) => {
          window.newMessage(e);
        });
        window.API.newOnAck((e: any) => {
          window.newOnAck(e);
        });
      })
      .catch(() => {});
    this.listener(onMode.interfaceChange);
    this.listener(onMode.newMessage);
    this.listener(onMode.newOnAck);
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
