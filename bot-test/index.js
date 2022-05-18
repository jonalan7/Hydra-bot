const hydraBot = require('../dist');

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
        if (conn) {
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
    })
})();