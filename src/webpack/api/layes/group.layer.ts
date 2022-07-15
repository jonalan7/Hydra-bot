import { ListenerLayer } from './listener.layes';
import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface';

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
   * @param groupName Group name
   * @param contacts Participants id '000000000000@c.us'
   */
  public async createGroup(
    groupName: string,
    contacts: string | string[]
  ): Promise<any> {
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
}
