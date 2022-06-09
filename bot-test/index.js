const hydraBot = require('../dist');

(async () => {

    // hydraBot.initWs({
    //     puppeteerOptions: {
    //         headless: false,
    //     }
    // });


    let client;
    // start bot service
    const webpack = await hydraBot.initServer({
        puppeteerOptions: {
            headless: false,
        }
    });

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
                body: "Oi eu sou um bot",
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
    webpack.on('newMessage', async (newMsg) => {
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