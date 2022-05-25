const hydraBot = require('../dist');

(async () => {

    hydraBot.initWs({
        puppeteerOptions: {
            headless: false,
        }
    });

    // start bot service
    // const webpack = await hydraBot.initServer({
    //     puppeteerOptions: {
    //         headless: false,
    //         executablePath: '',
    //     }
    // });

    // // return to current whatsapp interface
    // webpack.on('interfaceChange', (change) => {
    //     console.log("interfaceChange: ", change);
    // });

    // // return qrcode parameters
    // webpack.on('qrcode', (qrcode) => {
    //     console.log('qrcode: ', qrcode);
    // });

    // // return connection information
    // webpack.on('connection', async (conn) => {
    //     console.log(conn);
    //     // if (conn) {
    //     //     // send a text message
    //     //     await webpack.sendMessage({
    //     //         to: "557592641325@c.us",
    //     //         body: "Oi eu sou um bot",
    //     //         options: {
    //     //             type: 'text',
    //     //         }
    //     //     }).then((result) => {
    //     //         console.log(result);
    //     //     }).catch((error) => {
    //     //         console.log(error);
    //     //     });
    //     // }
    // });

    // // return receive new messages
    // webpack.on('newMessage', (newMsg) => {
    //     // when is received
    //     if (!newMsg.isSentByMe) {
    //         // message received!
    //         console.log('NewMessageReceived: ', newMsg);
    //     }
    //     // when is it sent
    //     if (!!newMsg.isSentByMe) {
    //         // Message sent
    //         console.log('NewMessageSent: ', newMsg);
    //     }
    // });

})();