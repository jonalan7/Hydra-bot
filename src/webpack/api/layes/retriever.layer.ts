import { Profile } from './profile.layes';
import { Page, Browser } from 'puppeteer';
import { CreateOptions, InterfaceHost, Contact } from '../../model/interface';
import { FunctionsLayer } from '../../model/enum';

export class RetrieverLayer extends Profile {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  /**
   * Get all messages in chat by chatId
   * @param chatId - Chat id
   * @param startDate
   * @param endDate
   * @returns
   */
  public async loadAndGetAllMessagesInChat(
    chatId: string,
    startDate: string,
    endDate: string
  ) {
    return this.handleApiCallParametres(
      FunctionsLayer.loadAndGetAllMessagesInChat,
      chatId,
      startDate,
      endDate
    );
  }

  /**
   * Returns a list of contacts
   * @returns List of contacts
   */
  public async getAllContacts(): Promise<Contact> {
    return this.handleApiCallParametres(FunctionsLayer.getAllContacts);
  }

  /**
   * Get information from the connected number
   * @returns Current host device details
   */
  public async getHost(): Promise<InterfaceHost> {
    return this.handleApiCallParametres(FunctionsLayer.getHost);
  }

  /**
   * Get version of the current whatsapp
   * @returns Current whatsapp version
   */
  public async getWAVersion() {
    return this.handleApiCallParametres(FunctionsLayer.getWAVersion);
  }

  /**
   * Get screenshot
   * @returns base64 image
   */
  public async screenshot() {
    const base64 = await this.handleApiCallPage(FunctionsLayer.screenshot, {
      encoding: 'base64',
    });
    return { base64Image: `data:image/png;base64,${base64}` };
  }

  /**
   * Retrieves chat object of given contact id
   * @param contactId
   * @returns contact detial as promise
   */
  public async getChatById(contactId: string) {
    return this.handleApiCallParametres(FunctionsLayer.getChatById, contactId);
  }

  /**
   * Check if the number exists
   * @param {string} number phone number
   */
  public async checkNumber(number: string) {
    return this.handleApiCallParametres(
      FunctionsLayer.checkNumberStatus,
      number
    );
  }
}
