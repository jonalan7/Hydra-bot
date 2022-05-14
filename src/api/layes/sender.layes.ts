import { Page } from 'puppeteer';
import { sendOptions } from '../../interface';

export class SenderLayer {
  constructor(public page: Page) {}

  sendMessage(options: sendOptions): Promise<any>;

  public sendMessage(sendOptions: sendOptions): Promise<any> {
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

      if (result['erro'] == true) {
        return reject(result);
      } else {
        return resolve(result);
      }
    });
  }
}
