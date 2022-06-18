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

>This project was developed to help the community that uses whatsapp as a way to implement an API quickly and effectively, for companies and much more! Thank you for being part of this family.

You can use this project in two ways, the first is using Web Services using a set of well-defined operations, the POST, GET, PUT and DELETE methods, the second option is to use the bot in raw form, without using a Web Services.

 <a target="_blank" href="https://jonalan7.github.io/Hydra-bot/" target="_blank">
  <img title="documentation" height="50" width="190" src="img/documentation.png">
 </a>

## Supporters
To maintain quality, we are receiving support! We thank you in advance for the opportunity to develop and maintain this project!

| Company | URL                                                |                                                                      Logo                                                                      |
|:--------|----------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------:|
| redrive | [https://redrive.com.br/](https://redrive.com.br/) | <a target="_blank" href="https://redrive.com.br/" target="_blank"> <img title="redrive.com.br" height="25" src="img/logo-redrive-png.png"></a> |
| zaplus  | [https://zaplus.chat/](https://zaplus.chat/)       |                                        <img title="zaplus.chat" height="25" src="img/logo_zaplus.png">                                         |
| tabchat | [https://tabchat.com.br/](https://tabchat.com.br/) |                                    <img title="tabchat.com.br" height="25" src="img/logo-horizontal.webp">                                     |

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

(async () => {

    let client;
    // start bot service
    const ev = await hydraBot.initServer();

    // return to current whatsapp interface
    ev.on('interfaceChange', (change) => {
        console.log("interfaceChange: ", change);
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
        if (conn.connect) {
            client = conn.client;
            // send a text message
            await client.sendMessage({
                to: "0000000000@c.us", // you can pass the contact number or group number
                body: "hi i'm hydra bot", // message text
                options: {
                    type: 'text', // shipping type
                }
            }).then((result) => {
                console.log(result); // message result
            }).catch((error) => {
                console.log(error); // message error
            });
        }
    });

    // return receive new messages
    ev.on('newMessage', async (newMsg) => {
        // when is received
        if (!newMsg.result.isSentByMe) {
            // message received!
            console.log('NewMessageReceived: ', newMsg.result);
        }
        // when is it sent
        if (!!newMsg.result.isSentByMe) {
            // Message sent
            console.log('NewMessageSent: ', newMsg.result);
        }
    });

    // returns the status of each message
    ev.on('newOnAck', async (event) => {
        console.log('id Message: ', event.id._serialized); // message id  
        console.log('Status Message: ', event.ack); // -7 = MD_DOWNGRADE, -6 = INACTIVE, -5 = CONTENT_UNUPLOADABLE, -4 = CONTENT_TOO_BIG, -3 = CONTENT_GONE, -2 = EXPIRED, -1 = FAILED, 0 = CLOCK, 1 = SENT, 2 = RECEIVED, 3 = READ, 4 = PLAYED
        console.log('From Message: ', event.from); // from message
        console.log('To Message: ', event.to); // to message
    });

})();
```
## Optional create parameters (the bot in raw form, without using a Web Services)
```javascript

const hydraBot = require('hydra-bot');

hydraBot.initServer(
{
  session: "session", // Name of the token to be generated, a folder with all customer information will be created
  pathNameToken: "token", // The path and name of the folder where the client tokens will be saved
  printQRInTerminal: true, // The QR CODE will be printed on the terminal if true
  updatesLog: true, // Logs info updates automatically in terminal
  timeAutoClose: 60000, // If you don't read the QR CODE by default 60 seconds, it will automatically close the client's browser to save memory, if you want to disable it, set 0 or false
  mkdirFolderToken: '', // Token folder path, only inside the project
  puppeteerOptions: {
    headless: true, // Start the project with the browser open or not!
    args: [], // Additional arguments to pass to the browser instance. adding any parameter you will replace the default args of the project
    executablePath: 'useChrome' // The browser that will be used for the project, you can specify a path, if you don't pass any parameters it will open the installed browser.
  }
}
);

```

## Optional create parameters Web Services
```javascript

const hydraBot = require('hydra-bot');

hydraBot.initWs(
{
  port: '8080',
  url: '', // point a URL to receive a callback!
  authentication: true, // ask for authentication in routes
  pathNameToken: "token", // The path and name of the folder where the client tokens will be saved
  printQRInTerminal: true, // The QR CODE will be printed on the terminal if true
  updatesLog: true, // Logs info updates automatically in terminal
  timeAutoClose: 60000, // If you don't read the QR CODE by default 60 seconds, it will automatically close the client's browser to save memory, if you want to disable it, set 0 or false
  mkdirFolderToken: '', // Token folder path, only inside the project
  puppeteerOptions: {
    headless: true, // Start the project with the browser open or not!
    args: [], // Additional arguments to pass to the browser instance. adding any parameter you will replace the default args of the project
    executablePath: 'useChrome' // The browser that will be used for the project, you can specify a path, if you don't pass any parameters it will open the installed browser.
  }
}
);

```
### Commands for administration via terminal
To start the administration interface use:

```bash
> yarn admin
```
List of commands in the terminal:

| Command       | Description                                      |
|---------------|:-------------------------------------------------|
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
    "Content-Type" : "application/json",
    "admin" : "admin",
    "admin_pass" : "admin"
}
```

### List of routes for user management: 

| Type | Route to browser         | Description          | Body                                                |
|------|--------------------------|----------------------|-----------------------------------------------------|
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
    "Content-Type" : "application/json",
    "user" : "user",
    "user_pass" : "user"
}
```

# Using Webhook

if you want to receive a callback on a specific url, pass the url parameter in the connect route.

### Methods POST

| Type | Route to browser | Description                    | Body                                                                                                                             |
|------|------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| POST | `/connect`       | Start connection with Whatsapp | `{ "url": "http://localhost:8080/webhooktest" }`                                                                                 |
| POST | `/sendtext`      | Send a text to a number        | `{ "to": "contact number", "body": "message"}`                                                                                   |
| POST | `/sendFile`      | Send file to a number          | `{ "to": "contact number",  "file_path": "https://docs.marklogic.com/guide/node-dev.pdf", "file_name": "node.js" }`              |
| POST | `/sendAudio`     | Send audio                     | `{ "to": "contact number",  "url_mp3": "https://cdn.freesound.org/previews/620/620094_4935038-lq.mp3", "file_name": "node.js" }` |
| POST | `/sendImage`     | Send image message             | `{ "to": "contact number",  "url_img": "https://i.pinimg.com/564x/a9/b1/18/a9b118761788b1ab260aae2835c468cd.jpg" }`              |

### Methods GET

|Type| Route to browser         | Description                                                     | Body                                                         |
|----| ----------------         | ----------------------------------------------------------------|--------------------------------------------------------------|
|GET | `/get_all_contacts`      | Retrieve contacts                                               | `EMPTY`                                                      |

## Basic send options functions (more features still under development)
You must be logged in to use these functions!
##### Here, `to` can be `<phone Number>@c.us` or `<phone Number>-<groupId>@g.us`

you can send messages only using one function!

```javascript

// send text message
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: "A message sent by hydra-bot", // message text
    options: {
        type: 'sendText', // shipping type
    }
}).then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});

// send files
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: './file.pdf', // you can use a directory or use a url
    options: {
        type: 'sendFile', // shipping type
        filename: 'filename' // put the file name here
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});

// send file audio
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: './file.mp3', // you can use a directory or use a url
    options: {
        type: 'sendAudio', // shipping type
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});

// Send audio file base64
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: base64MP3, // you can use a directory or use a url
    options: {
        type: 'sendAudioBase64', // shipping type
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});

// Send image message
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: './file.jpg', // you can use a directory or use a url
    options: {
        type: 'sendImage', // shipping type
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});

```
## Basic send functions

```javascript
// Sends a text message to given chat
await clinet.sendText("0000000000@c.us", "A message sent by hydra-bot")
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});

// Sends file from path
await clinet.sendFile("0000000000@c.us", './file.pdf', { filename: 'filename' })
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});

// Send audio file
await clinet.sendAudio("0000000000@c.us", './file.mp3')
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});

// Send audio base64
await clinet.sendAudioBase64("0000000000@c.us", base64MP3)
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});

// Send image message
await clinet.sendImage("0000000000@c.us", './file.jpg')
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});

```
## Retrieving Data

```javascript

// returns a list of contacts
const contacts = await clinet.getAllContacts();

```

### Debugging

Building the hydra-bot is very simple

## Development
To build the entire project just run

```bash
> npm run build
```

## Test
run a test inside the project

```bash
> npm start
```
