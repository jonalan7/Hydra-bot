# Basic send options functions

##### Here, `to` can be `<phone Number>@c.us` or `<phone Number>-<groupId>@g.us` or `<phone Number><groupId>@g.us`

[to use these functions it is necessary to initialize the bot, click and learn more.](../Getting%20Started/start_bot.html)

you can send messages only using one function!

## Summary
 - [sendText](#sendtext)
 - [sendFile](#sendfile)
 - [sendAudio](#sendaudio)
 - [sendAudioBase64](#sendaudiobase64)
 - [sendImage](#sendimage)


### sendText

```javascript
// send text message
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: "A message sent by hydra-bot", // message text
    options: {
        type: 'sendText', // shipping type
    }
}).then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendFile

```javascript
// send text message
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: './file.pdf', // you can use a directory or use a url
    options: {
        type: 'sendFile', // shipping type
        filename: 'filename' // put the file name here
    }
}).then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendAudio

```javascript
// send file audio
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: './file.mp3', // you can use a directory or use a url
    options: {
        type: 'sendAudio', // shipping type
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendAudioBase64

```javascript
// Send audio file base64
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: base64MP3, // you can use a directory or use a url
    options: {
        type: 'sendAudioBase64', // shipping type
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendImage 

```javascript
// Send image message 
await client.sendMessage({
    to: "0000000000@c.us", // you can pass the contact number or group number
    body: './file.jpg', // you can use a directory or use a url
    options: {
        type: 'sendImage', // shipping type
        caption: 'image text' // image text
    }
}).then((result) => {
    console.log(result);  // message result
}).catch((error) => {
    console.log(error); // message error
});
```
