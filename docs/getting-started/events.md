# Group Functions

##### Here, `to` can be `<phone Number>@c.us`, `<phone Number>-<groupId>@g.us`, or `<phone Number><groupId>@g.us`.

To use these functions, it is necessary to initialize the bot.  
[**Click here to learn more.**](../Getting%20Started/start_bot.html)

## Summary
 - [interfaceChange](#interfaceChange)
 - [qrcode](#qrcode)
 - [connection](#connection)
 - [newEditMessage](#newEditMessage)
 - [newDeleteMessage](#newDeleteMessage)
 - [onIntroReactionMessage](#onIntroReactionMessage)
 - [onReactionMessage](#onReactionMessage)
 - [newOnAck](#newOnAck)

### interfaceChange
Event triggered when there's a change in the WhatsApp interface

```javascript
// The change information can include elements like screen changes or navigation.
ev.on("interfaceChange", (change: any) => {
  // Processes the interface change, like navigation between screens
  console.log("Interface change detected:", change);
});
```

### qrcode
Event triggered when a QR code is generated, typically used for authentication

```javascript
// The QR code is sent to the client as a string or object containing data for login.
ev.on("qrcode", (qrcode) => {
  // Displays the generated QR code for WhatsApp Web authentication
  console.log("QR Code for authentication:", qrcode);
});
```

### connection
Event triggered when there is a connection change, such as connection loss or establishment

```javascript
// Connection data may include network status or connection errors.
ev.on('connection', async (conn) => {
  // Displays information about the connection status
  console.log("Connection status:", conn);
  if (conn.connect) {
    // Was connected to whatsapp chat
    console.error("Has connected");
  }
});
```

### newEditMessage
Event triggered when a message is edited

```javascript
// The edited message may include the previous content and the new content.
ev.on("newEditMessage", async (editMessage) => {
  // Processes the edited message by checking changes in content
  console.log("Message edited:", editMessage);
});
```

### newDeleteMessage
Event triggered when a message is deleted

```javascript
// The deleted message may include the message ID and other related details.
ev.on("newDeleteMessage", async (deleteMessage) => {
  // Processes the deletion of the message and notifies the user
  console.log("Message deleted:", deleteMessage);
});
```

### onIntroReactionMessage
Event triggered when there is a new intro reaction (emoji) to a message

```javascript
// This can be used to analyze which reactions were added to new messages.
ev.on("onIntroReactionMessage", async (introReaction) => {
  // Processes the intro reaction (emoji) to the new message
  console.log("New intro reaction received:", introReaction);
});
```

### onReactionMessage
Event triggered when an emoji reaction is added to an existing message

```javascript
// The reaction may include details like the emoji, sender, and associated message.
ev.on("onReactionMessage", async (reaction) => {
  // Processes the reaction added to an existing message
  console.log("Reaction added to message:", reaction);
});
```

### newOnAck
Event triggered to return the status of each message (e.g., read, delivered, etc.)

```javascript
// This can include data such as delivery and read status, allowing message state tracking.
ev.on("newOnAck", async (event) => {
  // Processes the acknowledgment status of the message
  console.log("Message ack status:", event);
});
```