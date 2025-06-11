## Status repository

[![npm version](https://img.shields.io/npm/v/hydra-bot.svg?color=green)](https://www.npmjs.com/package/hydra-bot)
[![Downloads](https://img.shields.io/npm/dm/hydra-bot.svg)](https://www.npmjs.com/package/hydra-bot)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/jonalan7/hydra-bot.svg)](http://isitmaintained.com/project/jonalan7/hydra-bot 'Average time to resolve an issue')
[![Percentage of issues still open](http://isitmaintained.com/badge/open/jonalan7/hydra-bot.svg)](http://isitmaintained.com/project/orkestral/hydra-bot 'Percentage of issues still open')

## Our online channels

[![WhatsApp Group](https://img.shields.io/badge/WhatsApp-Group-25D366?logo=whatsapp)](https://chat.whatsapp.com/FkweAzEKOTp3WaFAUzvKne)
[![Discord](https://img.shields.io/discord/987415785653817384?color=blueviolet&label=Discord&logo=discord&style=flat)](https://discord.gg/rBBeSxjgdg)
[![YouTube](https://img.shields.io/youtube/channel/subscribers/UCMBtZ3CjcLCAtjqotleiOOQ?label=YouTube)](https://www.youtube.com/user/ANONIMUism)
[![Telegram Group](https://img.shields.io/badge/Telegram-Group-32AFED?logo=telegram)](https://t.me/hydra_bot_io)

# Welcome to Hydra Bot

<img height="150" src="img/hydra.png"></img>

> This project was developed to help the community that uses whatsapp as a way to implement an API quickly and effectively, for companies and much more! Thank you for being part of this family.

You can use this project in two ways, the first is using Web Services using a set of well-defined operations, the POST, GET, PUT and DELETE methods, the second option is to use the bot in raw form, without using a Web Services.

 <a target="_blank" href="https://jonalan7.github.io/Hydra-bot/" target="_blank">
  <img title="documentation" height="50" width="190" src="img/documentation.png">
 </a>

## WhatSapp Group

<a target="_blank" href="https://chat.whatsapp.com/FkweAzEKOTp3WaFAUzvKne" target="_blank">
 <img title="whatzapp" height="50" width="190" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/WhatsApp_logo.svg/2000px-WhatsApp_logo.svg.png"></a>

Do you have any doubt? Need help? Join our whatsapp group and ask your questions with other people!

## Installation

Use the stable version:

```bash
> npm i --save hydra-bot
```

or for [Nightly releases](https://github.com/jonalan7/Hydra-bot/releases/tag/nightly):

```bash
> npm i --save https://github.com/jonalan7/Hydra-bot/releases/download/nightly/hydra-nightly.tgz
```

Terminal Admin:

```bash
> yarn admin
```

Install yarn Ubuntu:

```bash
> curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
> echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
> sudo apt update && sudo apt install yarn
> yarn
```

## Getting started Web Service

The service will be started on localhost on port 8080

```javascript
const hydraBot = require('hydra-bot');
(async () => {
  // start Web Service
  const WS = await hydraBot.initWs();
})();
```

## Getting started bot (the bot in raw form, without using a Web Services).

If you want to work in free mode, using only the bot, dry the necessary information!

```javascript
const hydraBot = require('hydra-bot');
const mime = require('mime-types');
const fs = require('fs');

(async () => {
  let client;
  let checkConnect = false;

  // start bot service
  const ev = await hydraBot.initServer();

  // return to current whatsapp interface
  ev.on('interfaceChange', (change) => {
    console.log('interfaceChange: ', change);
  });

  // return qrcode parameters
  ev.on('qrcode', (qrcode) => {
    console.log('qrcode: ', qrcode);
  });

  // return connection information
  ev.on('connection', async (conn) => {
    // browser information!
    if (conn.statusFind === 'browser') {
      console.log('info Browser: ', conn.text);
    }

    // Was connected to whatsapp chat
    if (conn.connect && !checkConnect) {
      checkConnect = true;
      client = conn.client; // class client from hydra-bot
      const getMe = await client.getHost();
      const hostNumber = getMe.id._serialized; // number host
      console.log('Host Number: ', hostNumber);

      // send a text message
      await client
        .sendMessage({
          to: hostNumber, // you can pass the contact number or group number
          body: "hi i'm hydra bot", // message text
          options: {
            type: 'sendText', // shipping type
          },
        })
        .then((result) => {
          console.log(result); // message result
        })
        .catch((error) => {
          console.log(error); // message error
        });
    }
  });

  // return receive new messages
  ev.on('newMessage', async (newMsg) => {
    // when is received
    if (!newMsg.result.fromMe) {
      // message received!
      console.log('NewMessageReceived: ', newMsg.result);
      // dowload files
      if (newMsg.result.isMedia) {
        const buffer = await client.decryptFile(newMsg.result);
        // At this point you can do whatever you want with the buffer
        // Most likely you want to write it into a file
        const fileName = `some-file-name.${mime.extension(
          newMsg.result.mimetype
        )}`;
        fs.writeFile(fileName, buffer, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
    // when is it sent
    if (!!newMsg.result.fromMe) {
      // Message sent
      console.log('NewMessageSent: ', newMsg.result);
    }
  });

  // returns the status of each message
  ev.on('newOnAck', async (event) => {
    console.log('id Message: ', event.result.id._serialized); // message id
    console.log('Status Message: ', event.result.ack); // -7 = MD_DOWNGRADE, -6 = INACTIVE, -5 = CONTENT_UNUPLOADABLE, -4 = CONTENT_TOO_BIG, -3 = CONTENT_GONE, -2 = EXPIRED, -1 = FAILED, 0 = CLOCK, 1 = SENT, 2 = RECEIVED, 3 = READ, 4 = PLAYED
    console.log('From Message: ', event.result.from); // from message
    console.log('To Message: ', event.result.to); // to message
  });
})();
```

## Initialization Types

There are two ways to initialize: using a **QR Code** or a phone number.

### QR Code Initialization

To start the service using a **QR Code**, use the following code:

```javascript
const hydraBot = require('hydra-bot');

(async () => {
  const ev = await hydraBot.initServer();
  // Returns QR Code parameters
  ev.on('qrcode', (qrcode) => {
    console.log('QR Code: ', qrcode);
  });
})();
```

### Phone Number Initialization

To start using a **phone number**, you can input the number and receive a verification code on the phone:

```javascript
const hydraBot = require('hydra-bot');

(async () => {
  const ev = await hydraBot.initServer({
    loginWithPhoneNumber: {
      phoneNumber: '0000000000000', // Phone number with country code
      timeRefeshCode: 120000, // Time to refresh the code (in milliseconds)
      isOn: true, // Enable login with phone number
    },
  });

  // Returns the code sent to the phone number
  ev.on('codePhoneNumber', (status) => {
    console.log('Code Phone Number: ', status);
  });
})();
```

## Downloading Files

Puppeteer takes care of the file downloading. The decryption is being done as
fast as possible (outruns native methods). Supports big files!

```javascript
const hydraBot = require('hydra-bot');
const fs = require('fs');
const mime = require('mime-types');

(async () => {
  let client;
  // start bot service
  const ev = await hydraBot.initServer();

  // return connection information
  ev.on('connection', async (conn) => {
    // Was connected to whatsapp chat
    if (conn.connect) {
      client = conn.client;
    }
  });

  ev.on('newMessage', async (newMsg) => {
    // when is received
    if (!newMsg.result.fromMe) {
      // message received!
      console.log('NewMessageReceived: ', newMsg.result);
      // dowload files
      if (newMsg.result.isMedia) {
        const buffer = await client.decryptFile(newMsg.result);
        // At this point you can do whatever you want with the buffer
        // Most likely you want to write it into a file
        const fileName = `some-file-name.${mime.extension(
          newMsg.result.mimetype
        )}`;
        fs.writeFile(fileName, buffer, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });
})();
```

## Optional create parameters (the bot in raw form, without using a Web Services)

```javascript
const hydraBot = require('hydra-bot');

hydraBot.initServer({
  loginWithPhoneNumber: {
    // Init login with phone number
    phoneNumber: '000000000000', // phone number with country
    timeRefeshCode: 120000, // time to refresh code
    isOn: false, // Login with phone number
  },
  session: 'session', // Name of the token to be generated, a folder with all customer information will be created
  pathNameToken: 'token', // The path and name of the folder where the client tokens will be saved
  printQRInTerminal: true, // The QR CODE will be printed on the terminal if true
  updatesLog: true, // Logs info updates automatically in terminal
  timeAutoClose: 60000, // If you don't read the QR CODE by default 60 seconds, it will automatically close the client's browser to save memory, if you want to disable it, set 0 or false
  mkdirFolderToken: '', // Token folder path, only inside the project
  puppeteerOptions: {
    headless: true, // Start the project with the browser open or not!
    args: [], // Additional arguments to pass to the browser instance. adding any parameter you will replace the default args of the project
    executablePath: 'useChrome', // The browser that will be used for the project, you can specify a path, if you don't pass any parameters it will open the installed browser.
    proxyUsername: '', // Proxy username
    proxyPassword: '', // Proxy password
    listProxy: [], // List of proxies
  },
});
```

## Optional create parameters Web Services

```javascript
const hydraBot = require('hydra-bot');

hydraBot.initWs({
  hostServer: 'http://localhost',
  port: '8080',
  url: '', // point a URL to receive a callback!
  authentication: true, // ask for authentication in routes
  pathNameToken: 'token', // The path and name of the folder where the client tokens will be saved
  printQRInTerminal: true, // The QR CODE will be printed on the terminal if true
  updatesLog: true, // Logs info updates automatically in terminal
  timeAutoClose: 60000, // If you don't read the QR CODE by default 60 seconds, it will automatically close the client's browser to save memory, if you want to disable it, set 0 or false
  mkdirFolderToken: '', // Token folder path, only inside the project
  puppeteerOptions: {
    headless: true, // Start the project with the browser open or not!
    args: [], // Additional arguments to pass to the browser instance. adding any parameter you will replace the default args of the project
    executablePath: 'useChrome', // The browser that will be used for the project, you can specify a path, if you don't pass any parameters it will open the installed browser.
    proxyUsername: '', // Proxy username
    proxyPassword: '', // Proxy password
    listProxy: [], // List of proxies
  },
});
```

### Commands for administration via terminal

To start the administration interface use:

```bash
> yarn admin
```

List of commands in the terminal:

| Command       | Description                                      |
| ------------- | :----------------------------------------------- |
| `/create`     | Create user                                      |
| `/delete`     | Delete user                                      |
| `/selectid`   | Show user by id                                  |
| `/selectname` | Select user by name                              |
| `/getall`     | List all users                                   |
| `/deactivate` | Disable user                                     |
| `/activate`   | Activate User                                    |
| `/changename` | Change username                                  |
| `/password`   | Change user password                             |
| `/cls`        | Clear screen/terminal                            |
| `/help`       | List all commands for administration in terminal |
| `/exit`       | Exit manager                                     |

## Routes for handling and querying users.

### List of commands using `REST API`

##### All user wheels have a pattern of `Headers`, to be able to access them, to create a administrator

```json
{
  "Content-Type": "application/json",
  "admin": "admin",
  "admin_pass": "admin"
}
```

### List of routes for user management:

| Type | Route to browser         | Description          | Body                                                |
| ---- | ------------------------ | -------------------- | --------------------------------------------------- |
| POST | `/create_user`           | Create user          | `{"name":"USE","password":"USER PASSWORD"}`         |
| DEL  | `/delete_user/ID_USE`    | Delete user          | `EMPTY`                                             |
| GET  | `/get_user_by_id/ID_USE` | Show user by ID      | `EMPTY`                                             |
| GET  | `/get_all_users`         | List all users       | `EMPTY`                                             |
| PUT  | `/deactivate_user`       | Disable user         | `{"id":"USER ID"}`                                  |
| PUT  | `/activate_user`         | Activate User        | `{"id":"USER ID"}`                                  |
| PUT  | `/change_name`           | Change username      | `{"id":"USER ID","name":"NEW USERNAME"}`            |
| PUT  | `/change_password`       | Change user password | `{"id":"USER ID","password":"NEW SECURE PASSWORD"}` |

## Web Service Routes (more features still under development)

> Note: Parameters can be changed during development!

### List of routes for managing whatsapp:

##### All whatsapp connection wheels have a pattern of `Headers` of user (default, username = 'user', password = 'user').

The headers must be parameterized as :

```json
{
  "Content-Type": "application/json",
  "user": "user",
  "user_pass": "user"
}
```

# Using Webhook

if you want to receive a callback on a specific url, pass the url parameter in the connect route.

### Methods POST

| Type | Route to browser | Description                      | Body                                                                                                                            |
| ---- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| POST | `/connect`       | Start connection with Whatsapp   | `{ "url": "http://localhost:8080/webhooktest" }`                                                                                |
| POST | `/sendtext`      | Send a text to a number          | `{ "to": "contact number", "body": "message"}`                                                                                  |
| POST | `/sendFile`      | Send file to a number            | `{ "to": "contact number", "file_path": "https://docs.marklogic.com/guide/node-dev.pdf", "file_name": "node.js" }`              |
| POST | `/sendAudio`     | Send audio                       | `{ "to": "contact number", "url_mp3": "https://cdn.freesound.org/previews/620/620094_4935038-lq.mp3", "file_name": "node.js" }` |
| POST | `/sendImage`     | Send image message               | `{ "to": "contact number", "url_img": "https://i.pinimg.com/564x/a9/b1/18/a9b118761788b1ab260aae2835c468cd.jpg" }`              |
| POST | `/disconnect`    | Disconnecting from the server    | EMPTY                                                                                                                           |
| POST | `/check_user`    | Check if the entered user exists | EMPTY                                                                                                                           |

### Methods GET

| Type | Route to browser    | Description                      | Body    |
| ---- | ------------------- | -------------------------------- | ------- |
| GET  | `/get_all_contacts` | Retrieve contacts                | `EMPTY` |
| GET  | `/check_connect`    | check if the client is connected | `EMPTY` |
| GET  | `/last_qrcode`      | Check if the QR-Code is active   | `EMPTY` |
| GET  | `/screenshot`       | Get screenshot                   | `EMPTY` |

## Basic send options functions (more features still under development)

You must be logged in to use these functions!

##### Here, `to` can be `<phone Number>@c.us` or `<phone Number>-<groupId>@g.us` or `<phone Number><groupId>@g.us`

you can send messages only using one function!

```javascript
// send text message
await client
  .sendMessage({
    to: '0000000000@c.us', // you can pass the contact number or group number
    body: 'A message sent by hydra-bot', // message text
    options: {
      type: 'sendText', // shipping type
    },
  })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// send files
await client
  .sendMessage({
    to: '0000000000@c.us', // you can pass the contact number or group number
    body: './file.pdf', // you can use a directory or use a url
    options: {
      type: 'sendFile', // shipping type
      filename: 'filename', // put the file name here
    },
  })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// send file audio
await client
  .sendMessage({
    to: '0000000000@c.us', // you can pass the contact number or group number
    body: './file.mp3', // you can use a directory or use a url
    options: {
      type: 'sendAudio', // shipping type
    },
  })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send audio file base64
await client
  .sendMessage({
    to: '0000000000@c.us', // you can pass the contact number or group number
    body: base64MP3, // you can use a directory or use a url
    options: {
      type: 'sendAudioBase64', // shipping type
    },
  })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send image message
await client
  .sendMessage({
    to: '0000000000@c.us', // you can pass the contact number or group number
    body: './file.jpg', // you can use a directory or use a url
    options: {
      type: 'sendImage', // shipping type
      caption: 'image text', // image text
    },
  })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send image Base64
await client
  .sendMessage({
    to: '0000000000@c.us', // you can pass the contact number or group number
    body: base64IMG, // you can use a directory or use a url
    options: {
      type: 'sendImageFromBase64', // shipping type
      caption: 'image text', // image text
    },
  })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });
```

## Basic send functions

```javascript
// Sends a text message to given chat
await client
  .sendText('0000000000@c.us', 'A message sent by hydra-bot')
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Sends file from path
await client
  .sendFile('0000000000@c.us', './file.pdf', { filename: 'filename' })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send audio file
await client
  .sendAudio('0000000000@c.us', './file.mp3')
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send audio base64
await client
  .sendAudioBase64('0000000000@c.us', base64MP3)
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send image message
await client
  .sendImage('0000000000@c.us', './file.jpg', { caption: 'image text' })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Send image base64
await client
  .sendImageFromBase64('0000000000@c.us', base64IMG, { caption: 'image text' })
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });
```

## Profile Functions

```javascript
// Get device info
await client.getHost();

// Logout from WhatsApp Web
await client.logoutSession();

// Closes page and browser client
await client.browserClose();

// This function captures an image of the browser screen return base64 image
await client.screenshot();
```

## Retrieving Data

```javascript
// return a chat
const infoChat = await client.getChatById('0000000000@c.us');

// returns a list of contacts
const contacts = await client.getAllContacts();

// return whatsapp version
const version = await client.getWAVersion();

// Load all messages in chat by date for the given period
const listMsg = await client.loadAndGetAllMessagesInChat(
  '<phone Number>@c.us',
  'YYYY-MM-DD',
  'YYYY-MM-DD'
);
```

## Group Management

Group number example `<phone Number>-<groupId>@g.us` or `<phone Number><groupId>@g.us`

```javascript
// get all participants in the group
await client
  .getGroupParticipant('00000000000-0000000000@g.us')
  .then((result) => {
    console.log('Participants: ', result);
  })
  .catch((error) => {
    console.log('Error Participants: ', error);
  });

// Get all Group
const allGroups = await client.getAllChatsGroups();

// Get all Chats
const AllChats = await client.getAllChats();

// Create group
await client
  .createGroup('Group name', ['111111111111@c.us', '222222222222@c.us'])
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Add participant to Group
await client
  .addParticipant('00000000-000000@g.us', [
    '111111111111@c.us',
    '222222222222@c.us',
  ])
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Change group description
await client
  .setGroupDescription('00000000-000000@g.us', 'group description')
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });

// Change group image
await client
  .setGroupImage('00000000000000@g.us', './file.jpg')
  .then((result) => {
    console.log(result); // message result
  })
  .catch((error) => {
    console.log(error); // message error
  });
```

## Events

List of events triggered in the project

```javascript

// Event triggered when there's a change in the WhatsApp interface
// The change information can include elements like screen changes or navigation.
ev.on("interfaceChange", (change: any) => {
  // Processes the interface change, like navigation between screens
  console.log("Interface change detected:", change);
});

// Event triggered when a QR code is generated, typically used for authentication
// The QR code is sent to the client as a string or object containing data for login.
ev.on("qrcode", (qrcode) => {
  // Displays the generated QR code for WhatsApp Web authentication
  console.log("QR Code for authentication:", qrcode);
});

// Event triggered when there is a connection change, such as connection loss or establishment
// Connection data may include network status or connection errors.
ev.on('connection', async (conn) => {
  // Displays information about the connection status
  console.log("Connection status:", conn);
  if (conn.connect) {
    // Was connected to whatsapp chat
    console.error("Has connected");
  }

  // Logout is in progress: the user is actively logging out.
  if (conn.status === 'starting_logout') {
      console.log('Starting Logout: ', conn.text);
  }

  // Logout completed: the user has successfully logged out.
  if (conn.status === 'logout') {
     console.log('Logout: ', conn.text);
  }
});

// Event triggered when a new message is received
// The message may include data such as sender, content, timestamp, etc.
ev.on("newMessage", (newMsg) => {
  // Displays the data of the new received message
  console.log("New message received:", newMsg);
});

// Event triggered when a message is edited
// The edited message may include the previous content and the new content.
ev.on("newEditMessage", async (editMessage) => {
  // Processes the edited message by checking changes in content
  console.log("Message edited:", editMessage);
});

// Event triggered when a message is deleted
// The deleted message may include the message ID and other related details.
ev.on("newDeleteMessage", async (deleteMessage) => {
  // Processes the deletion of the message and notifies the user
  console.log("Message deleted:", deleteMessage);
});

// Event triggered when there is a new intro reaction (emoji) to a message
// This can be used to analyze which reactions were added to new messages.
ev.on("onIntroReactionMessage", async (introReaction) => {
  // Processes the intro reaction (emoji) to the new message
  console.log("New intro reaction received:", introReaction);
});

// Event triggered when an emoji reaction is added to an existing message
// The reaction may include details like the emoji, sender, and associated message.
ev.on("onReactionMessage", async (reaction) => {
  // Processes the reaction added to an existing message
  console.log("Reaction added to message:", reaction);
});

// Event triggered to return the status of each message (e.g., read, delivered, etc.)
// This can include data such as delivery and read status, allowing message state tracking.
ev.on("newOnAck", async (event) => {
  // Processes the acknowledgment status of the message
  console.log("Message ack status:", event);
});

```

### Debugging

Building the hydra-bot is very simple

## Development

To build the entire project just run

```bash
> npm run build
```

## Test

Run a test inside the project

```bash
> npm run build:dev
```

## Maintainers

Maintainers are needed, I cannot keep with all the updates by myself. If you are
interested please open a Pull Request.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.
