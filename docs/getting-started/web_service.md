## Getting started Web Service
The service will be started on localhost on port 8080

```javascript
const hydraBot = require('hydra-bot');
(async () => {
    // start Web Service
    const WS = await hydraBot.initWs();
});
```