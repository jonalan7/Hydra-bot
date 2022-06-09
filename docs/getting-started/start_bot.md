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
            // send a text message
            client = conn.client;
            await client.sendMessage({
                to: "0000000000@c.us",
                body: "hi i'm hydra bot",
                options: {
                    type: 'text',
                }
            }).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
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

})();
```