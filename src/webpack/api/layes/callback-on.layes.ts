import { onMode } from '../../model/enum';
import { EventEmitter } from 'events';

/**
 * Attribution and behavior change of a given event
 */
export class CallbackOnStatus {
  private listenerEmitter = new EventEmitter();

  /**
   * Emit an event with the specified type and arguments
   * @param args Event arguments, including onType to specify the event type
   */
  public emitStatusFind(args: any) {
    this.listenerEmitter.emit(args.onType, args);
  }

  /**
   * Listen for specific user events
   * @param type Type of event to monitor
   * @param callback Function to call with event data
   */
  public on(type: onMode, callback: (state: any) => void) {
    this.listenerEmitter.on(type, callback);
  }
}
