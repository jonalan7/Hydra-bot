> Project still under development! Wait for new updates!
# Welcome to Hydra Bot

<img height="150" src="img/hydra.png"></img>

>This project was developed to help the community that uses whatsapp as a way to implement an API quickly and effectively, for companies and much more! Thank you for being part of this family.

You can use this project in two ways, the first is using Web Services using a set of well-defined operations, the POST, GET, PUT and DELETE methods, the second option is to use the bot in raw form, without using a Web Services.
## Supporters
To maintain quality, we are receiving support! We thank you in advance for the opportunity to develop and maintain this project!
<br>
| Company | URL                                                | Logo                                                                                                                                           |
|---------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| redrive | [https://redrive.com.br/](https://redrive.com.br/) | <a target="_blank" href="https://redrive.com.br/" target="_blank"> <img title="redrive.com.br" height="25" src="img/logo-redrive-png.png"></a> |
| zaplus  | [https://zaplus.chat/](https://zaplus.chat/)       | <img title="zaplus.chat" height="25" src="img/logo_zaplus.png">                                                                                |
| tabchat | [https://tabchat.com.br/](https://tabchat.com.br/) | <img title="tabchat.com.br" height="25" src="img/logo-horizontal.webp">                                                                        |

## WhatSapp Group

<a target="_blank" href="https://chat.whatsapp.com/FkweAzEKOTp3WaFAUzvKne" target="_blank">
 <img title="whatzapp" height="50" width="190" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/WhatsApp_logo.svg/2000px-WhatsApp_logo.svg.png">
</a>

Do you have any doubt? Need help? Join our whatsapp group and ask your questions with other people!

## Installation

Use the stable version:

```bash
> npm i --save hydra-bot
```

## Getting started Web Service
The service will be started on localhost on port 8080

```javascript
const hydraBot = require('hydra-bot');
(async () => {
    // start Web Service
    const WS = await hydraBot.initWs();
});
    
```

## Getting started bot (the bot in raw form, without using a Web Services).
If you want to work in free mode, using only the bot, dry the necessary information!
```javascript

const hydraBot = require('hydra-bot');

(async () => {
    // start bot service
    const webpack = await hydraBot.initServer();

    // return to current whatsapp interface
    webpack.on('interfaceChange', (change) => {
        console.log("interfaceChange: ", change);
    });

    // return qrcode parameters
    webpack.on('qrcode', (qrcode) => {
        console.log('qrcode: ', qrcode);
    });

    // return connection information
    webpack.on('connection', async (conn) => {
        console.log("Info connection: ", conn);
        if (conn) {
            // send a text message
            await webpack.sendMessage({
                to: "0000000000@c.us",
                body: "A message sent by hydra-bot",
                options: {
                    type: 'text',
                }
            }).then((result) => {
                console.log(result)
            });
        }
    });

    // return receive new messages
    webpack.on('newMessage', (newMsg) => {
        // when is received
        if (!newMsg.isSentByMe) {
            // message received!
            console.log('NewMessageReceived: ', newMsg);
        }
        // when is it sent
        if (!!newMsg.isSentByMe) {
            // message sent
            console.log('NewMessageSent: ', newMsg);
        }
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
    headless: "false", // Start the project with the browser open or not!
    args: [], // Additional arguments to pass to the browser instance. adding any parameter you will replace the default args of the project
    executablePath: 'useChrome' // The browser that will be used for the project, you can specify a path, if you don't pass any parameter it will open chromium.
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
  pathNameToken: "token", // The path and name of the folder where the client tokens will be saved
  printQRInTerminal: true, // The QR CODE will be printed on the terminal if true
  updatesLog: true, // Logs info updates automatically in terminal
  timeAutoClose: 60000, // If you don't read the QR CODE by default 60 seconds, it will automatically close the client's browser to save memory, if you want to disable it, set 0 or false
  mkdirFolderToken: '', // Token folder path, only inside the project
  puppeteerOptions: {
    headless: "false", // Start the project with the browser open or not!
    args: [], // Additional arguments to pass to the browser instance. adding any parameter you will replace the default args of the project
    executablePath: 'useChrome' // The browser that will be used for the project, you can specify a path, if you don't pass any parameter it will open chromium.
  }
}
);

```
## Web Service Routes (more features still under development)

> Note: Parameters can be changed during development!

The headers must be parameterized as :
```json
{
     "Content-Type" : "application/json",
}
```


|Type| Route to browser          | Description                                                 | Body                                                         |
|----| ----------------          | ------------------------------------------------------------|--------------------------------------------------------------|
|POST| `/connect`                | Start connection with Whatsapp                              | `{"session": "name session" }`                               |
|POST| `/sendtext`               | Send a text to a number                                     | `{"session": "name session", "to": "contact number", "body": "message"}`              |


## Basic Functions (more features still under development)
You must be logged in to use these functions!
##### Here, `chatId` could be `<phoneNumber>@c.us` or `<phoneNumber>-<groupId>@g.us`

```javascript

// send text message
await webpack.sendMessage({
    to: "0000000000@c.us",
    body: "A message sent by hydra-bot",
    options: {
        type: 'text',
    }
}).then((result) => {
    console.log(result)
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
run a test inside the project

```bash
> npm start
```
