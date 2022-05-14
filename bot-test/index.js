const bot = require('../dist/index');

(async () => {
    const webpack = await bot.initServer();
    console.log(webpack);
    let result = await webpack.sendMessage({
        to: "0000000000@c.us",
        body: "test",
        options: {
            type: 'text',
        }
    });
    console.log(result);
})();