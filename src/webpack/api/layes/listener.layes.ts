import { EventEmitter } from 'events';
import { OnMode, OnModeListener } from '../../model/enum/';
import { Page, Browser } from 'puppeteer';
import { Whatsapp } from './whatsapp';
import { CreateOptions } from '../../model/interface';
import { sleep } from '../../help';
import { CallbackOnStatus } from './callback-on.layes';

export class ListenerLayer extends Whatsapp {
  urlCode = '';
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: CallbackOnStatus
  ) {
    super(page, browser, options, ev);
  }

  public async qrCodeScan() {
    this.startAutoClose();
    await this.page
      .waitForFunction(`document.querySelector('canvas')`)
      .catch(() => undefined);
    while (true) {
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

  private listenerEmitter = new EventEmitter();

  public async initListener() {
    const functions = Object.values(OnModeListener);

    for (const func of functions) {
      const hasFunction = await this.page
        .evaluate(
          (funcName: string) => typeof (window as any)[funcName] === 'function',
          func
        )
        .catch(() => false);

      if (!hasFunction) {
        // Expose the function to the page
        await this.page
          .exposeFunction(func, (...args: any[]) => {
            this.listenerEmitter.emit(func, ...args);
          })
          .catch(() => undefined);

        this.listener(OnModeListener[func]);
        // Start the function if it's defined in this class
        if (typeof this[func] === 'function') {
          (this[func] as Function)();
        }
      }
    }
  }

  private listener(type: string): { dispose: () => void } {
    this.listenerEmitter.on(type, (event) => {
      this.ev.emitStatusFind({
        onType: type as OnMode,
        session: this.options.session,
        result: event,
      });
    });
    return {
      dispose: () => {
        this.listenerEmitter.off(type, (event) => {
          this.ev.emitStatusFind({
            onType: type as OnMode,
            session: this.options.session,
            result: event,
          });
        });
      },
    };
  }
}
