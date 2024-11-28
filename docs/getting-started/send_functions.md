# Basic send functions

##### Here, `to` can be `<phone Number>@c.us`, `<phone Number>-<groupId>@g.us`, or `<phone Number><groupId>@g.us`.

To use these functions, it is necessary to initialize the bot.  
[**Click here to learn more.**](../Getting%20Started/start_bot.html)

Send messages separately

## Summary
  - [sendText](#sendtext)
  - [sendFile](#sendfile)
  - [sendAudio](#sendaudio)
  - [sendAudioBase64](#sendaudiobase64)
  - [sendImage](#sendimage)
  - [sendImageFromBase64](#sendimagefrombase64)


### sendText

Sends a text message to given chat

```javascript
await client.sendText("0000000000@c.us", "A message sent by hydra-bot")
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendFile

Sends file from path

```javascript
await client.sendFile("0000000000@c.us", './file.pdf', { filename: 'filename' })
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendAudio

Send audio file

```javascript
await client.sendAudio("0000000000@c.us", './file.mp3')
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendAudioBase64

Send audio base64

```javascript
await client.sendAudioBase64("0000000000@c.us", base64MP3)
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendImage

Send image message

```javascript
await client.sendImage("0000000000@c.us", './file.jpg', { caption: 'image text' })
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

### sendImageFromBase64

Send image base64

```javascript
await client.sendImageFromBase64("0000000000@c.us", base64IMG, { caption: 'image text' })
.then((result) => {
    console.log(result); // message result
}).catch((error) => {
    console.log(error); // message error
});
```

