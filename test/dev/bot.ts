import {
  initServer,
  OnMode,
  WebPack,
  CallbackOnStatus,
  InterfaceChange,
  InterfaceMode,
  InterfaceState,
} from '../../dist';

import { pathFile, hydraBotTestFunctions } from '../help';

import mime from 'mime-types';
import fs from 'fs';

(async () => {
  try {
    let client: WebPack;
    let checkConnect = false;

    // start bot service
    const ev: CallbackOnStatus = await initServer({
      session: 'session', // session name
      puppeteerOptions: {
        headless: false, // Open chrome browser in interface
        devtools: true, // Inspect the html element through the console
      },
      timeAutoClose: 0, // 0 = disabled, 1000 = 1 second, 2000 = 2 seconds, etc
      printQRInTerminal: true, // Print QR code in terminal
    });

    // return to current whatsapp interface
    ev.on(OnMode.interfaceChange, (change: InterfaceChange) => {
      if (!hydraBotTestFunctions.interfaceChange) return;
      console.log('interfaceChange: ', change);
      const { mode, displayInfo } = change.result;
      const modeTyped = mode as InterfaceMode;
      const displayInfoTyped = displayInfo as InterfaceState;

      console.log('Mode: ', modeTyped);
      console.log('DisplayInfo: ', displayInfoTyped);
    });

    // return qrcode parameters
    ev.on(OnMode.qrcode, (qrcode: InterfaceChange) => {
      if (!hydraBotTestFunctions.qrcode) return;
      console.log('qrcode: ', qrcode);
    });

    // return connection information
    ev.on(OnMode.connection, async (conn: any) => {
      // browser information!
      if (conn.statusFind === 'browser') {
        console.log('info Browser: ', conn.text);
      }

      console.log('Connection: ', conn.connect);

      // Was connected to whatsapp chat
      if (conn.connect && !checkConnect) {
        checkConnect = true;
        client = conn.client; // class client from hydra-bot
        const getMe = await client.getHost();
        const hostNumber = getMe.id._serialized; // number host
        console.log('Host Number: ', hostNumber);

        if (hydraBotTestFunctions.loadAndGetAllMessagesInCha) {
          // Load all messages in chat by date
          await client
            .loadAndGetAllMessagesInChat('00000000000@c.us', 'YYYY-MM-DD')
            .then((result) => {
              console.log('Messages: ', result);
            })
            .catch((error) => {
              console.log('Error Messages: ', error);
            });
        }
        // Get Functions
        if (hydraBotTestFunctions.getGroupParticipant) {
          // get all participants in the group
          await client
            .getGroupParticipant('00000000000-0000000000@g.us')
            .then((result) => {
              console.log('Participants: ', result);
            })
            .catch((error) => {
              console.log('Error Participants: ', error);
            });
        }

        if (hydraBotTestFunctions.getAllChatsGroups) {
          // get all groups
          await client
            .getAllChatsGroups()
            .then((result) => {
              console.log('Groups: ', result);
            })
            .catch((error) => {
              console.log('Error Groups: ', error);
            });
        }

        if (hydraBotTestFunctions.getWAVersion) {
          // get version whatsapp
          await client
            .getWAVersion()
            .then((result) => {
              console.log('Version: ', result);
            })
            .catch((error) => {
              console.log('Error Version: ', error);
            });
        }

        if (hydraBotTestFunctions.getHost) {
          // get host information
          await client
            .getHost()
            .then((result) => {
              console.log('Host: ', result);
            })
            .catch((error) => {
              console.log('Error Host: ', error);
            });
        }

        if (hydraBotTestFunctions.getAllContact) {
          // get all contacts
          await client
            .getAllContacts()
            .then((result) => {
              console.log('Contacts: ', result);
            })
            .catch((error) => {
              console.log('Error Contacts: ', error);
            });
        }

        // Send Functions
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
    ev.on(OnMode.onIntroReactionMessage, async (reaction: InterfaceChange) => {
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
  } catch (error) {
    console.log('Error: ', error);
  }
})();
