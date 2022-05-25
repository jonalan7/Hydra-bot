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

(async () => {
  const args: string[] = process.argv.slice(2);
  const options: string = args[0];
  const obj = JSON.parse(options);
  const initWebpack: webPack = await initServer(obj);

  //initWebpack.on(onMode.interfaceChange, (change: interfaceChange) => {
    //sendParent(change);
    //console.log(`${onMode.interfaceChange}: `, change);
  //});

  //initWebpack.on(onMode.qrcode, (qrcode: InterfaceQrcode) => {
    // console.log(`${onMode.qrcode}: `, qrcode);
  //});

  initWebpack.on(onMode.connection, async (conn) => {
    if (conn.connect) {
      sendParent({ ...conn, session: obj.session });
    }
  });

  process.on('message', async (response: any) => {
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
