import {
  initServer,
  OnMode,
  WebPack,
  CallbackOnStatus,
  interfaceChange,
} from '../../dist';

import { pathFile, hydraBotTestFunctions } from '../help';

import mime from 'mime-types';
import fs from 'fs';

(async () => {
  let client: WebPack;

  // start bot service
  const ev: CallbackOnStatus = await initServer({
    puppeteerOptions: {
      headless: false, // Open chrome browser in interface
      devtools: true, // Inspect the html element through the console
    },
    timeAutoClose: 0, // 0 = disabled, 1000 = 1 second, 2000 = 2 seconds, etc
    printQRInTerminal: true, // Print QR code in terminal
  });

  // return to current whatsapp interface
  ev.on(OnMode.interfaceChange, (change: any) => {
    if (!hydraBotTestFunctions.interfaceChange) return;
    console.log('interfaceChange: ', change);
  });

  // return qrcode parameters
  ev.on(OnMode.qrcode, (qrcode: interfaceChange) => {
    if (!hydraBotTestFunctions.qrcode) return;
    console.log('qrcode: ', qrcode);
  });

  // return connection information
  ev.on(OnMode.connection, async (conn: any) => {
    // browser information!
    if (conn.statusFind === 'browser') {
      console.log('info Browser: ', conn.text);
    }

    // Was connected to whatsapp chat
    if (conn.connect) {
      client = conn.client; // class client from hydra-bot
      const getMe = await client.getHost();
      const hostNumber = getMe.id._serialized; // number host
      console.log('Host Number: ', hostNumber);

      if (hydraBotTestFunctions.sendText) {
        // send message to host example
        await client
          .sendText(hostNumber, 'A message sent by hydra-bot')
          .then((result) => {
            console.log('Result sucess menssage send:', result);
          })
          .catch((error) => {
            console.log('Result error message send:', error);
          });
      }

      if (hydraBotTestFunctions.sendImage) {
        const imgSendPath = pathFile('files', 'img.jpg');
        // Send image message
        await client
          .sendImage(hostNumber, imgSendPath, {
            caption: 'image text',
          })
          .then((result) => {
            console.log('Result sucess image send:', result);
          })
          .catch((error) => {
            console.log('Result error image send:', error);
          });
      }
    }
  });

  // receive new messages reactions emoji
  ev.on(OnMode.onReactionMessage, async (reaction: any) => {
    if (!hydraBotTestFunctions.onReactionMessage) return;
    console.log('ReactionMessage: ', reaction);
  });

  // receive new message intro reactions emoji
  ev.on(OnMode.onIntroReactionMessage, async (reaction: interfaceChange) => {
    if (!hydraBotTestFunctions.onIntroReactionMessage) return;
    console.log('IntroReactionMessage: ', reaction.result.type);
  });

  // receive delete messages
  ev.on(OnMode.newDeleteMessage, async (message: any) => {
    if (!hydraBotTestFunctions.newDeleteMessage) return;
    console.log(`Delete message`, message);
  });

  // receive edit messages
  ev.on(OnMode.newEditMessage, async (message: any) => {
    if (!hydraBotTestFunctions.newEditMessage) return;
    console.log(`Edite message`, message);
  });

  // return receive new messages
  ev.on(OnMode.newMessage, async (newMsg: any) => {
    if (!hydraBotTestFunctions.newMessage) return;

    // when is it received
    if (!newMsg.result.fromMe) {
      // console.log('NewMessageReceived: ', newMsg.result);
    }
    // when is it sent
    if (newMsg.result.fromMe) {
      // Message sent
      console.log('NewMessageSent: ', newMsg.result);
      // dowload files
      if (newMsg.result.isMedia) {
        const buffer = await client.decryptFile(newMsg.result);
        // At this point you can do whatever you want with the buffer
        // Most likely you want to write it into a file
        const fileName = `${newMsg.result.id}.${mime.extension(
          newMsg.result.mimetype
        )}`;
        const file = pathFile('dowload', fileName);
        fs.writeFile(file, buffer, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });

  // returns the status of each message
  ev.on(OnMode.newOnAck, async (event: any) => {
    if (!hydraBotTestFunctions.newOnAck) return;
    console.log('id Message: ', event.result.id._serialized); // message id
    console.log('Status Message: ', event.result.ack); // -7 = MD_DOWNGRADE, -6 = INACTIVE, -5 = CONTENT_UNUPLOADABLE, -4 = CONTENT_TOO_BIG, -3 = CONTENT_GONE, -2 = EXPIRED, -1 = FAILED, 0 = CLOCK, 1 = SENT, 2 = RECEIVED, 3 = READ, 4 = PLAYED
    console.log('From Message: ', event.result.from); // from message
    console.log('To Message: ', event.result.to); // to message
  });
})();
