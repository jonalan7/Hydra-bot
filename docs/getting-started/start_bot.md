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