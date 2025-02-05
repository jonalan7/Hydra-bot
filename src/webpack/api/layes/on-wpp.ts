import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import { ReactionIntro } from '../../model/interface';
import { HelperLayer } from './helpers';
import { FunctionsLayer } from '../../model/enum';

export class OnMod extends HelperLayer {
  constructor(
    public page: Page,
    public browser: Browser,
    public options: CreateOptions,
    public ev: any
  ) {
    super(page, browser, options, ev);
  }

  /**
   * Listen to interface changes.
   */
  public interfaceChange(): void {
    this.handleApiCallParametres(FunctionsLayer.eventInterfaceChange);
  }

  /**
   * Listen to deleted messages.
   */
  public newDeleteMessage(): void {
    this.handleApiCallParametres(FunctionsLayer.eventNewDeleteMessage);
  }

  /**
   * Listen to edited messages.
   */
  public newEditMessage(): void {
    this.handleApiCallParametres(FunctionsLayer.eventNewEditMessage);
  }

  /**
   * Listen to new messages.
   */
  public newMessage(): void {
    this.handleApiCallParametres(FunctionsLayer.eventNewMessage);
  }

  /**
   * Listen to reaction messages.
   */
  public onReactionMessage(): void {
    this.handleApiCallParametres(FunctionsLayer.eventOnReactionMessage);
  }

  /**
   * Listen to introductory reactions.
   */
  public onIntroReactionMessage(): void {
    this.handleApiCallParametres(FunctionsLayer.eventOnIntroReactionMessage);
  }

  /**
   * Listen to message acknowledgment (read receipt).
   */
  public newOnAck(): void {
    this.handleApiCallParametres(FunctionsLayer.eventNewOnAck);
  }
}
