The **Hydra-Bot** uses asynchronous events to provide clearer understanding and streamline workflows. 
You can listen for information on each aspect separately. 
For example:
- Receive information about the **QR Code**;
- Monitor the browser interface to determine if the bot is on the chat page, syncing, or facing conflicts, among other states;
- Obtain data about the connection status, such as whether it's **connected** or **disconnected**;
and much more!

## Summary
 - [**interfaceChange**](#interfacechange) - Event triggered when there's a change in the WhatsApp interface
 - [**qrcode**](#qrcode) - Event triggered when a QR code is generated, typically used for authentication
 - [**connection**](#connection) - Event triggered when there is a connection change, such as connection loss or establishment
 - [**newEditMessage**](#neweditmessage) - Event triggered when a message is edited
 - [**newDeleteMessage**](#newdeletemessage) - Event triggered when a message is deleted
 - [**onIntroReactionMessage**](#onintroreactionmessage) - Event triggered when there is a new intro reaction (emoji) to a message
 - [**onReactionMessage**](#onreactionmessage) - Event triggered when an emoji reaction is added to an existing message
 - [**newOnAck**](#newonack) - Event triggered to return the status of each message (e.g., read, delivered, etc.)

### interfaceChange

The **interfaceChange** event, as the name suggests, monitors any changes in the interface of the client connected to WhatsApp. For instance, if the client is on the **QR** code screen, the event will trigger a callback with the interface **"QR,"** representing the **QR Code** page. If it is **"MAIN,"** it will indicate the main chat page, and so on. Below are the possible statuses that can be returned.

```javascript
// The "interfaceChange" event can return the following interface states:
// QR - QR code page.
// MAIN - Chat page.
// CONNECTION - Connection.
// SYNCING - Loading page, waiting for data from the smartphone.
// OFFLINE - Offline page, when there is no internet connection.
// CONFLICT - Conflict page, when another WhatsApp Web session is open.
// PROXYBLOCK - Blocked page due to proxy restrictions.
// TOS_BLOCK - Blocked page (Terms of Service violation).
// SMB_TOS_BLOCK - Blocked page (Terms of Service violation for SMB users).
// DEPRECATED_VERSION - Deprecated version page.

// The change information can include elements like screen changes or navigation.
ev.on("interfaceChange", (change: any) => {
  // Processes the interface change, like navigation between screens
  console.log("Interface change detected:", change);
});
```

### qrcode

When the browser is redirected to the **QR Code** page, this event is triggered. It provides the **QR Code** in **base64 format**, allowing you to use it wherever you want!

```javascript
// The QR code is sent to the client as a string or object containing data for login.
ev.on("qrcode", (qrcode) => {
  // Displays the generated QR code for WhatsApp Web authentication
  console.log("QR Code for authentication:", qrcode);
});
```

### connection

This event provides information about the **connection status**, indicating whether the client is **connected** or **disconnected**, whether the browser was closed, if something is being **downloaded**, or if it failed to access the WhatsApp page, among other things. In short, it monitors the user's connection!

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

The event is triggered whenever a new message is edited, either by the **recipient** or the **sender**.

```javascript
// The edited message may include the previous content and the new content.
ev.on("newEditMessage", async (editMessage) => {
  // Processes the edited message by checking changes in content
  console.log("Message edited:", editMessage);
});
```

### newDeleteMessage

The event is triggered whenever a message is **deleted**.

```javascript
// The deleted message may include the message ID and other related details.
ev.on("newDeleteMessage", async (deleteMessage) => {
  // Processes the deletion of the message and notifies the user
  console.log("Message deleted:", deleteMessage);
});
```

### onIntroReactionMessage

This event listens for all new emojis in a chat. When the chat is opened, all **emojis** are loaded.

```javascript
// This can be used to analyze which reactions were added to new messages.
ev.on("onIntroReactionMessage", async (introReaction) => {
  // Processes the intro reaction (emoji) to the new message
  console.log("New intro reaction received:", introReaction);
});
```

### onReactionMessage

Sempre que uma mensagem receber uma reação com um **emoji**, você receberá o **ID da mensagem**, o emoji que foi adicionado ou removido e a lista completa de todos os emojis associados à mensagem.

```javascript
// The reaction may include details like the emoji, sender, and associated message.
ev.on("onReactionMessage", async (reaction) => {
  // Processes the reaction added to an existing message
  console.log("Reaction added to message:", reaction);
});
```

### newOnAck

When you send a message and obtain its **ID**, you can check the message status through this event. You can find out if the message was sent, if there was an error, if it's pending, and other situations.

```javascript
// This can include data such as delivery and read status, allowing message state tracking.
ev.on("newOnAck", async (event) => {
  // To monitor the status of each message, the following parameters can be returned:
  // SENDER_BACKFILL_SENT: -7   // Message sent after a backfill by the sender.
  // INACTIVE_RECEIVED: -6      // Message received but not active.
  // CONTENT_UNUPLOADABLE: -5   // Message content could not be uploaded.
  // CONTENT_TOO_BIG: -4        // Message content exceeds the size limit.
  // CONTENT_GONE: -3           // Message content is no longer available.
  // EXPIRED: -2                // Message expired and cannot be delivered.
  // FAILED: -1                 // Message delivery failed.
  // CLOCK: 0                   // Message is pending (waiting to be sent).
  // SENT: 1                    // Message has been sent.
  // RECEIVED: 2                // Message has been received.
  // READ: 3                    // Message has been read.
  // PLAYED: 4                  // Media message has been played.
  // Processes the acknowledgment status of the message
  console.log("Message ack status:", event);
});
```