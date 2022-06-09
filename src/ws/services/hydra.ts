import axios from 'axios';
import {
  initServer,
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
  const ev = await initServer(objOptions);
  let client: any;

  ev.on(onMode.interfaceChange, (change: interfaceChange) => {
    Webhook(objOptions, change);
  });

  ev.on(onMode.qrcode, (qrcode: InterfaceQrcode) => {
    Webhook(objOptions, qrcode);
  });

  ev.on(onMode.connection, async (conn: any) => {
    if (conn.erro) {
      if (
        conn.statusFind === 'browser' &&
        (conn.tatus === 'browserClosed' ||
          conn.tatus === 'autoClose' ||
          conn.tatus === 'noOpenWhatzapp' ||
          conn.tatus === 'noOpenBrowser')
      ) {
        sendParent({ delsession: true, session: objOptions.session });
        try {
          if (!client?.page?.isClosed()) {
            client.page.close();
            process.exit();
          }
        } catch {}
      }
    }

    if (conn.connect) {
      client = conn.client;
      conn = { connect: true, session: objOptions.session }
      sendParent(conn);
    }

    Webhook(objOptions, conn);
  });

  process.on('message', async (response: any) => {
    Webhook(objOptions, response);
    if (response.type === 'text') {
      await client
        .sendMessage({
          to: response.to,
          body: response.body,
          options: {
            type: 'text',
          },
        })
        .then((result: any) => {
          sendParent({ result: true, ...result });
        })
        .catch((error: any) => {
          sendParent({ result: true, ...error });
        });
    }
  });
})();
