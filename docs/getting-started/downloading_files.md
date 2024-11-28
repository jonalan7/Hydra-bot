## Downloading Files
Puppeteer takes care of the file downloading. The decryption is being done as fast as possible (outruns native methods). Supports big files!

```javascript
const hydraBot = require('hydra-bot');
const fs = require('fs');
const mime = require('mime-types');

(async () => {
    let client;
    // start bot service
    const ev = await hydraBot.initServer();
    // return connection information
    ev.on('connection', async (conn) => {
        // Was connected to whatsapp chat
        if (conn.connect) {
            client = conn.client;
        }
    });
    ev.on('newMessage', async (newMsg) => {
             // when is received
            if (!newMsg.result.fromMe) {
                // message received!
                console.log('NewMessageReceived: ', newMsg.result);
                // dowload files
                if (newMsg.result.isMedia) {
                    const buffer = await client.decryptFile(newMsg.result);
                    // At this point you can do whatever you want with the buffer
                    // Most likely you want to write it into a file
                    const fileName = `some-file-name.${mime.extension(newMsg.result.mimetype)}`;
                    fs.writeFile(fileName, buffer, (err) => {
                        if (err) {
                         console.log(err);
                        }
                    });
                }
            }
    });
})();
```
