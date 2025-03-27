import { ListenerLayer } from './listener.layes';
import { Page, Browser } from 'puppeteer';
import { CreateOptions, InterfaceScope } from '../../model/interface';
import {
  downloadFileToBase64,
  fileToBase64,
  base64MimeType,
  resizeImg,
} from '../../help';
import { FunctionsLayer } from '../../model/enum';

export class GroupLayer extends ListenerLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  /**
   * Get group participants
   * @param {string} groupId Group id exemple: 000000000000-0000000000@c.us
   */
  public async getGroupParticipant(groupId: string) {
    return this.handleApiCallParametres(
      FunctionsLayer.getGroupParticipant,
      groupId
    );
  }

  /**
   * Get all Chats
   */
  public async getAllChats() {
    return this.handleApiCallParametres(FunctionsLayer.getAllChats);
  }

  /**
   * Retrieve all groups
   */
  public async getAllChatsGroups() {
    return this.handleApiCallParametres(FunctionsLayer.getAllChatsGroups);
  }

  /**
   * Creates a new chat group
   * @param {string} groupName Group name
   * @param {(string | string[])} contacts Participants id '000000000000@c.us'
   */
  public async createGroup(
    groupName: string,
    contacts: string | string[]
  ): Promise<InterfaceScope> {
    return this.handleApiCallParametres(
      FunctionsLayer.createGroup,
      groupName,
      contacts
    );
  }

  /**
   * Adds participant to Group
   * @param {string} groupId Chat id ('0000000000-00000000@g.us' or '000000000000000000@g.us')
   * @param {(string | string[])} contacts Participants id '000000000000@c.us'
   */
  public async addParticipant(
    groupId: string,
    contacts: string | string[]
  ): Promise<InterfaceScope> {
    return this.handleApiCallParametres(
      FunctionsLayer.addParticipant,
      groupId,
      contacts
    );
  }

  /**
   * Parameters to change group description
   * @param {string} groupId group number
   * @param {string} description group description
   */
  public async setGroupDescription(
    groupId: string,
    description: string
  ): Promise<InterfaceScope> {
    return this.handleApiCallParametres(
      FunctionsLayer.setGroupDescription,
      groupId,
      description
    );
  }

  /**
   * Parameters to change group image
   * @param {string} groupId group number
   * @param {string} path of image
   */
  public async setGroupImage(
    groupId: string,
    path: string
  ): Promise<InterfaceScope> {
    return new Promise(async (resolve, reject) => {
      let b64 = await downloadFileToBase64(path, [
        'image/gif',
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/webp',
      ]);
      if (!b64) {
        b64 = await fileToBase64(path);
      }
      if (b64) {
        const buff = Buffer.from(
          b64.replace(/^data:image\/(png|jpe?g|webp);base64,/, ''),
          'base64'
        );
        const mimeInfo = base64MimeType(b64);

        if (!mimeInfo || mimeInfo.includes('image')) {
          let _webb64_96 = await resizeImg(buff, { width: 96, height: 96 }),
            _webb64_640 = await resizeImg(buff, { width: 640, height: 640 });
          let obj = { a: _webb64_640, b: _webb64_96 };

          const result = await this.page.evaluate(
            ({ obj, groupId }) => API.setGroupImage(obj, groupId),
            {
              obj,
              groupId,
            }
          );
          if (result.error == true) {
            return reject(result);
          } else {
            return resolve(result);
          }
        } else {
          console.log('Not an image, allowed formats png, jpeg and webp');
          return false;
        }
      }
    });
  }
}
