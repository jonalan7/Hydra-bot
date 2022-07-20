import { ListenerLayer } from './listener.layes';
import { Page, Browser } from 'puppeteer';
import { CreateOptions, InterfaceScope } from '../../model/interface';

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
   * Creates a new chat group
   * @param {string} groupName Group name
   * @param {(string | string[])} contacts Participants id '000000000000@c.us'
   */
  public async createGroup(
    groupName: string,
    contacts: string | string[]
  ): Promise<InterfaceScope> {
    return new Promise(async (resolve, reject) => {
      const result = await this.page
        .evaluate(
          ({ groupName, contacts }) => API.createGroup(groupName, contacts),
          { groupName, contacts }
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
   * Adds participant to Group
   * @param {string} groupId Chat id ('0000000000-00000000@g.us' or '000000000000000000@g.us')
   * @param {(string | string[])} contacts Participants id '000000000000@c.us'
   */
  public async addParticipant(
    groupId: string,
    contacts: string | string[]
  ): Promise<InterfaceScope> {
    return new Promise(async (resolve, reject) => {
      const result = await this.page
        .evaluate(
          ({ groupId, contacts }) => API.addParticipant(groupId, contacts),
          { groupId, contacts }
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
   * Parameters to change group description
   * @param {string} groupId group number
   * @param {string} description group description
   */
  public async setGroupDescription(
    groupId: string,
    description: string
  ): Promise<InterfaceScope> {
    return new Promise(async (resolve, reject) => {
      const result = await this.page.evaluate(
        ({ groupId, description }) => {
          return API.setGroupDescription(groupId, description);
        },
        { groupId, description }
      );

      if (result.erro == true) {
        return reject(result);
      } else {
        return resolve(result);
      }
    });
  }
}
