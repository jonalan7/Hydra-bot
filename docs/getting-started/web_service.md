## Getting started Web Service
The service will be started on localhost on port 8080

```javascript
const hydraBot = require('hydra-bot');
(async () => {
    // start Web Service
    const WS = await hydraBot.initWs();
})();
```

### Commands for administration via terminal
[Example terminal admin](admin.html)

### Using the Client Webhook
[Example terminal admin](user.html)