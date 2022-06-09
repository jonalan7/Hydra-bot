import { Page, Browser } from 'puppeteer';
import { sendOptions } from '../../model/interface';
import { ListenerLayer } from './listener.layes';
import { CreateOptions } from '../../model/interface';

export class SenderLayer extends ListenerLayer {

  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  async sendMessage(options: sendOptions): Promise<any>;

  public async sendMessage(sendOptions: sendOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const to: any = sendOptions.to,
        body: any = sendOptions.body,
        options: any = sendOptions.options;
      const result = await this.page
        .evaluate(
          ({ to, body, options }) => {
            return API.sendMessage(to, body, options);
          },
          { to, body, options }
        )
        .catch();

      if (result.erro == true) {
        return reject(result);
      } else {
        return resolve(result);
      }
    });
  }
}
