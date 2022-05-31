import axios from 'axios';
import {
  initServer,
  webPack,
  onMode,
  interfaceChange,
  InterfaceQrcode,
} from '../../index';

function sendParent(data: any) {
  process.send && process.send(data);
}

async function Webhook(options: any, info: any) {
  if (!!options.url && options.url.length) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(options.url, info)
        .then(function (response) {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          resolve(err);
        });
    });
  }
}

(async () => {
  const args: string[] = process.argv.slice(2);
  const options: string = args[0];
  const objOptions = JSON.parse(options);
  const initWebpack: webPack = await initServer(objOptions);

  initWebpack.on(onMode.interfaceChange, (change: interfaceChange) => {
    Webhook(objOptions, change);
  });

  initWebpack.on(onMode.qrcode, (qrcode: InterfaceQrcode) => {
    Webhook(objOptions, qrcode);
  });

  initWebpack.on(onMode.connection, async (conn) => {
    if (conn.erro) {
      if (
        conn.statusFind === 'browserClosed' ||
        conn.statusFind === 'autoClose' ||
        conn.statusFind === 'noOpenWhatzapp' ||
        conn.statusFind === 'noOpenBrowser'
      ) {
        sendParent({ delsession: true, session: objOptions.session });
        if (!initWebpack.page.isClosed()) {
          try {
            initWebpack.page.close();
          } catch {}
        }
      }
    }

    if (conn.connect) {
      sendParent({ ...conn, session: objOptions.session });
    }
    Webhook(objOptions, conn);
  });

  process.on('message', async (response: any) => {
    Webhook(objOptions, response);
    if (response.type === 'text') {
      await initWebpack
        .sendMessage({
          to: response.to,
          body: response.body,
          options: {
            type: 'text',
          },
        })
        .then((result) => {
          sendParent({ result: true, ...result });
        })
        .catch((error) => {
          sendParent({ result: true, ...error });
        });
    }
  });
})();
