const hydraBot = require('../dist');
const mime = require('mime-types');
const fs = require('fs');
(async () => {

    // hydraBot.initWs({
    //     puppeteerOptions: {
    //         headless: false,
    //     }
    // });


    let client;
    // start bot service
    const ev = await hydraBot.initServer({
        session: 'geovane',
        puppeteerOptions: {
            headless: false,
        }
    });

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

        // if (conn.statusFind === 'page') {
        //     conn.page
        // }

        // Was connected to whatsapp chat
        if (conn.connect) {
            // send a text message
            client = conn.client;
            // await client.sendMessage({
            //     to: "0000000000@c.us",
            //     body: "Oi eu sou um bot",
            //     options: {
            //         type: 'text',
            //     }
            // }).then((result) => {
            //     console.log(result);
            // }).catch((error) => {
            //     console.log(error);
            // });

        }
    });

    // return receive new messages
    ev.on('newMessage', async (newMsg) => {
        // when is received
        if (!newMsg.result.isSentByMe) {
            // message received!
            console.log('NewMessageReceived: ', newMsg.result);
            // dowload files
            if (newMsg.result.isMedia === true || newMsg.result.isMMS === true) {
                const buffer = await client.decryptFile(newMsg.result);
                // At this point you can do whatever you want with the buffer
                // Most likely you want to write it into a file
                const fileName = `some-file-name.${mime.extension(newMsg.result.mimetype)}`;
                await fs.writeFile(fileName, buffer, (err) => {
                    console.log(err);
                });
            }
        }
        // when is it sent
        if (!!newMsg.result.isSentByMe) {
            // Message sent
            //console.log('NewMessageSent: ', newMsg.result);
        }
    });

})();