const hydraBot = require('../dist');

(async () => {
    // start bot service
    const webpack = await hydraBot.initServer({
        puppeteerOptions: {
            headless: false
        }
    });


    // return connection information
    webpack.on('connection', async (conn) => {
        if (conn) {
            // send a text message
            let message = '*🤖 Olá, sou o bot de commit do hydra!*\n' +
            'Funções foram criadas: \n' +
            '\n' +
            '*1.: newMessage (receber novas mensagens, de quem envia e recebe).*\n' +
            '\n' +
            'Saiba mais: https://github.com/jonalan7/Hydra-bot#getting-started \n'+
            'Em breve, novas informações!';

            await webpack.sendMessage({
                to: "120363041154347482@g.us",
               // to: "557599951550@c.us",
                body: message,
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
    webpack.on('newMessage', (newMsg) => {
        // when is received
        if (!newMsg.isSentByMe) {
            // message received!
            console.log('NewMessageReceived: ', newMsg);
        }
        // when is it sent
        if (!!newMsg.isSentByMe) {
            // Message sent
            console.log('NewMessageSent: ', newMsg);
        }
    });

})();