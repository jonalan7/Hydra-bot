import { onMode } from '../../model/enum';
import { sleep } from '../../help';

export class CallbackOnStatus {
  public statusFind: any;
  constructor() {
    this.statusFind = '';
  }

  async onChange(event: (status: any) => void) {
    let change = null;
    while (true) {
      if (this.statusFind !== change) {
        change = this.statusFind;
        event && event(change);
      }
      await sleep(50);
    }
  }

  public async on(type: onMode, callback: (state: any) => void) {
    switch (type) {
      case onMode.interfaceChange:
        this.onChange((event) => {
          if (event.onType === onMode.interfaceChange) {
            callback(event);
          }
        });
        break;
      case onMode.newMessage:
        this.onChange((event) => {
          if (event.onType === onMode.newMessage) {
            callback(event);
          }
        });
        break;
      case onMode.qrcode:
        this.onChange((event) => {
          if (event.onType === onMode.qrcode) {
            callback(event);
          }
        });
        break;
      case onMode.connection:
        this.onChange((event) => {
          if (event.onType === onMode.connection) {
            callback(event);
          }
        });
        break;
    }
  }
}
