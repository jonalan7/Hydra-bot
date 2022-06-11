import { Page, Browser } from 'puppeteer';
import { sendOptions } from '../../model/interface';
import { ListenerLayer } from './listener.layes';
import { CreateOptions } from '../../model/interface';
import { base64MimeType } from '../../help';
import { FunctionType } from '../../model/enum/';
import { downloadFileToBase64, fileToBase64 } from '../../help';

export class SenderLayer extends ListenerLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  /**
   * Sends a text message to given chat
   * @param to chat id: xxxxx@us.c
   * @param body text message
   */
  public sendText(to: string, body: string, options?: any) {
    return new Promise(async (resolve, reject) => {
      Object.assign({ type: FunctionType.sendText }, options);

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

  /**
   * Send audio base64
   * @param to Chat id
   * @param base64 base64 data
   */
  public async sendAudioBase64(to: string, base64: string, options?: any) {
    return new Promise(async (resolve, reject) => {
      const mimeType: any = base64MimeType(base64);

      if (!mimeType) {
        return reject({
          erro: true,
          to: to,
          text: 'Invalid base64!',
        });
      }

      Object.assign({ type: FunctionType.sendAudioBase64 }, options);

      if (!mimeType || mimeType.includes('audio/mpeg')) {
        const result = await this.page
          .evaluate(
            ({ to, base64, options }) => {
              return API.sendMessage(to, base64, options);
            },
            { to, base64, options }
          )
          .catch();
        if (result.erro == true) {
          return reject(result);
        } else {
          return resolve(result);
        }
      } else {
        return reject({
          erro: true,
          to: to,
          text: 'Use the MP3 format to be able to send an audio!',
        });
      }
    });
  }

  /**
   * Send audio file
   * @param to Chat id
   * @param filePath Path file
   */
  public async sendAudio(to: string, filePath: string, options?: any) {
    return new Promise(async (resolve, reject) => {
      Object.assign({ type: FunctionType.sendAudio }, options);

      let base64: string | false = await downloadFileToBase64(filePath, [
        'audio/mpeg',
      ]);

      if (!base64) {
        base64 = await fileToBase64(filePath);
      }

      if (!base64) {
        return reject({
          erro: true,
          to: to,
          text: 'No such file or directory, open "' + filePath + '"',
        });
      }

      const mimeInfo: any = base64MimeType(base64);

      if (!mimeInfo || mimeInfo.includes('audio/mpeg')) {
        const result = await this.page
          .evaluate(
            ({ to, base64, options }) => {
              return API.sendMessage(to, base64, options);
            },
            { to, base64, options }
          )
          .catch();
        if (result.erro == true) {
          return reject(result);
        } else {
          return resolve(result);
        }
      } else {
        return reject({
          erro: true,
          to: to,
          text: 'Use the MP3 format to be able to send an audio!',
        });
      }
    });
  }

  async sendMessage(options: sendOptions): Promise<any>;

  public async sendMessage(sendOptions: sendOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const to: any = sendOptions.to,
        body: any = sendOptions.body,
        options: any = sendOptions.options;

      if (!Object.values(FunctionType).includes(options.type)) {
        return reject({
          erro: true,
          text: `pass the message type, examples: ${Object.values(
            FunctionType
          ).join(', ')}`,
        });
      }

      if (options.type === FunctionType.sendAudioBase64) {
        this.sendAudioBase64(to, body, options)
          .then((e) => {
            return reject(e);
          })
          .catch((e) => {
            return resolve(e);
          });
      }

      if (options.type === FunctionType.sendAudio) {
        this.sendAudio(to, body, options)
          .then((e) => {
            return reject(e);
          })
          .catch((e) => {
            return resolve(e);
          });
      }

      if (options.type === FunctionType.sendText) {
        this.sendText(to, body, options)
          .then((e) => {
            return reject(e);
          })
          .catch((e) => {
            return resolve(e);
          });
      }
    });
  }
}
