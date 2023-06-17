import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';

export class onMod {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {}

  public interfaceChange() {
    this.page
      .evaluate(() => {
        const getData = () => {
          return {
            displayInfo: window.Store.Stream.displayInfo,
            mode: window.Store.Stream.mode,
            info: window.Store.Stream.info,
          };
        };

        const checkAvailability = () => {
          return new Promise((resolve) => {
            const check = () => {
              if (window.Store && window.Store.Stream) {
                console.log('store or stream now available');
                resolve(true);
              } else {
                console.log("store or stream isn't available");
                setTimeout(check, 1000); // Check again after 1 second
              }
            };

            check();
          });
        };

        console.log('run interface change');

        checkAvailability().then(() => {
          window.Store.Stream.on(
            'change:info change:displayInfo change:mode',
            () => {
              window.interfaceChange(getData());
            }
          );
        });
      })
      .catch(() => {});
  }

  public waitForStore(
    stores: string | string[],
    callback?: () => void
  ): Promise<void> {
    const storePromises: { [x: string]: Promise<boolean> } = {};

    console.log('stores ', storePromises);

    if (!Array.isArray(stores)) {
      stores = [stores];
    }

    const isUndefined = (p: string): boolean =>
      typeof window.Store[p] === 'undefined';

    console.log('isUndefined ', isUndefined);

    const missing: string[] = stores.filter(isUndefined);

    console.log('missing ', missing);

    const promises: Promise<boolean>[] = missing.map((s: string) => {
      if (!storePromises[s]) {
        storePromises[s] = new Promise((resolve) => {
          let time: number | null = null;

          const listen = (e: Event): void => {
            const customEvent = e as CustomEvent<string>; // Cast the event to CustomEvent<string>

            const name: string = (customEvent && customEvent.detail) || '';

            if (name === s || !isUndefined(s)) {
              window.removeEventListener('storeLoaded', listen);
              clearInterval(time!);
              console.log('resolved');

              resolve(true);
            }
          };

          window.addEventListener('storeLoaded', listen);
          time = setInterval(listen, 1000);
        });
      }

      return storePromises[s];
    });

    const all: Promise<boolean[]> = Promise.all(promises);

    if (typeof callback === 'function') {
      all.then(callback);
    }

    return all.then(() => {});
  }

  public newMessage() {
    this.page
      .evaluate(() => {
        let isHeroEqual = {};
        window.Store.Msg.on('add', (newMessage: any) => {
          if (!Object.is(isHeroEqual, newMessage)) {
            isHeroEqual = newMessage;
            if (newMessage && newMessage.isNewMsg) {
              window.newMessage(API.serializeMessageObj(newMessage));
            }
          }
        });
      })
      .catch(() => {});
  }

  public newOnAck() {
    this.page
      .evaluate(() => {
        let isHeroEqual = {};
        window.Store.Msg.on('change:ack', (newOnAck: any) => {
          if (!Object.is(isHeroEqual, newOnAck)) {
            isHeroEqual = newOnAck;
            if (newOnAck) {
              window.newOnAck(newOnAck);
            }
          }
        });
      })
      .catch(() => {});
  }
}
