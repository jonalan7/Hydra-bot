import { Page, Browser } from 'puppeteer';
import { CreateOptions } from '../../model/interface/';
import { ReactionIntro } from '../../model/interface';
import { HelperLayer } from './helpers';

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
   * Execute a page evaluation with error handling.
   */
  private async safeEvaluate(evaluateFn: () => Promise<void>): Promise<void> {
    try {
      await this.page.evaluate(evaluateFn);
    } catch {}
  }

  /**
   * Listen to interface changes.
   */
  public interfaceChange(): void {
    this.safeEvaluate(async () => {
      const getData = () => ({
        displayInfo: window.Store.Stream.displayInfo,
        mode: window.Store.Stream.mode,
        info: window.Store.Stream.info,
      });
      const triggerChange = () => window.interfaceChange(getData());
      window.Store.Stream.on(
        'change:info change:displayInfo change:mode',
        triggerChange
      );
      triggerChange();
    });
  }

  /**
   * Listen to deleted messages.
   */
  public newDeleteMessage(): void {
    this.safeEvaluate(async () => {
      window.Store.Msg.on('remove remove_msgs', async (deletedMessage: any) => {
        if (deletedMessage) {
          const serialized = await API.serializeMessageObj(deletedMessage);
          window.newDeleteMessage(serialized);
        }
      });
    });
  }

  /**
   * Listen to edited messages.
   */
  public newEditMessage(): void {
    this.safeEvaluate(async () => {
      window.Store.Msg.on('change:body', async (editedMessage: any) => {
        if (!editedMessage) return;

        const serialized = await API.serializeMessageObj(editedMessage);

        if (editedMessage.body !== undefined) {
          window.newEditMessage(serialized);
        } else {
          window.newDeleteMessage(serialized);
        }
      });
    });
  }

  /**
   * Listen to new messages.
   */
  public newMessage(): void {
    this.safeEvaluate(async () => {
      window.Store.Msg.on('add', async (newMessage: any) => {
        if (newMessage?.isNewMsg) {
          const serialized = await API.serializeMessageObj(newMessage);
          window.newMessage(serialized);
        }
      });
    });
  }

  /**
   * Listen to reaction messages.
   */
  public onReactionMessage(): void {
    this.safeEvaluate(async () => {
      window.Store.Reactions.on('add', (reaction: any) => {
        reaction.reactions.on('add remove', async (...eventArgs: any) => {
          const [emoji, collections, type] = eventArgs;
          const serialized = await API.serializeReactions(
            emoji,
            collections,
            type
          );
          window.onReactionMessage(serialized);
        });
      });
    });
  }

  /**
   * Listen to introductory reactions.
   */
  public onIntroReactionMessage(): void {
    this.safeEvaluate(async () => {
      window.Store.Reactions.on('add', async (...eventArgs: any) => {
        const [emoji, , type] = eventArgs;
        const serialized: ReactionIntro | [] =
          await API.serializeIntroReactions(emoji, type);
        if (!Array.isArray(serialized)) {
          window.onIntroReactionMessage(serialized);
        }
      });
    });
  }

  /**
   * Listen to message acknowledgment (read receipt).
   */
  public newOnAck(): void {
    this.safeEvaluate(async () => {
      window.Store.Msg.on('change:ack', (ackMessage: any) => {
        if (ackMessage) {
          window.newOnAck(ackMessage);
        }
      });
    });
  }
}
