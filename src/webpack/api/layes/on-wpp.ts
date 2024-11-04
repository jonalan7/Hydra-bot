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

        window.Store.Stream.on(
          'change:info change:displayInfo change:mode',
          () => {
            window.interfaceChange(getData());
          }
        );

        window.interfaceChange(getData());
      })
      .catch(() => {});
  }

  public newMessage() {
    this.page
      .evaluate(() => {
        window.Store.Msg.on('add', async (newMessage: any) => {
          if (newMessage && newMessage.isNewMsg) {
            const serialize = await API.serializeMessageObj(newMessage);
            window.newMessage(serialize);
          }
        });
      })
      .catch(() => {});
  }

  public newOnAck() {
    this.page
      .evaluate(() => {
        window.Store.Msg.on('change:ack', (newOnAck: any) => {
          if (newOnAck) {
            window.newOnAck(newOnAck);
          }
        });
      })
      .catch(() => {});
  }
}
