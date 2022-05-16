import { EventEmitter } from 'events';
import { onMode } from '../../model/enum/';
import { Page } from 'puppeteer';

declare global {
  interface Window {
    interfaceChange: any;
  }
}

export class ListenerLayer {
  constructor(public page: Page) {}

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
      })
      .catch(() => {});
  }

  async on(type: onMode, callback: (state: any) => void) {
    switch (type) {
      case onMode.interfaceChange:
        this.listener(onMode.interfaceChange, callback);
        break;
    }
  }

  private listener(
    type: string,
    callback: (state: any) => void
  ): { dispose: () => void } {
    this.listenerEmitter.on(type, callback);
    return {
      dispose: () => {
        this.listenerEmitter.off(type, callback);
      },
    };
  }
}
