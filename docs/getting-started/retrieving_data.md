# Retrieving Data
data reception functions

##### Here, `to` can be `<phone Number>@c.us` or `<phone Number>-<groupId>@g.us` or `<phone Number><groupId>@g.us`

[to use these functions it is necessary to initialize the bot, click and learn more.](../Getting%20Started/start_bot.html)

## Summary
 - [getAllContacts](#getallcontacts)

### getAllContacts

Returns a list of contacts
```javascript
const contacts = await client.getAllContacts();
```