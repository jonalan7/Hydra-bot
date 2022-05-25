import { onMode } from '../../model/enum';
import { sleep } from '../../help';

export class CallbackConnection {
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
      await sleep(100);
    }
  }

  public async on(type: onMode, callback: (state: any) => void) {
    switch (type) {
      case onMode.connection:
        this.onChange((event) => {
          if (event.onType === onMode.connection) {
            callback(event);
          }
        });
    }
  }

}
