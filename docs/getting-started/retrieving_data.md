# Retrieving Data
data reception functions

##### Here, `to` can be `<phone Number>@c.us`, `<phone Number>-<groupId>@g.us`, or `<phone Number><groupId>@g.us`.

To use these functions, it is necessary to initialize the bot.  
[**Click here to learn more.**](../Getting%20Started/start_bot.html)

## Summary
 - [getAllContacts](#getallcontacts)
 - [checkNumber](#checknumber)
 - [loadAndGetAllMessagesInChat](#loadAndGetAllMessagesInChat)

### getAllContacts

Returns a list of contacts
```javascript
const contacts = await client.getAllContacts();
```

### checkNumber

Check if the number exists
```javascript
const result = await client.checkNumber("<phone Number>@c.us");
```

### loadAndGetAllMessagesInChat

Load all messages in chat by date for the given period
```javascript
const result = await client.loadAndGetAllMessagesInChat("<phone Number>@c.us", "YYYY-MM-DD", "YYYY-MM-DD");
```