# Profile Functions

##### Here, `to` can be `<phone Number>@c.us`, `<phone Number>-<groupId>@g.us`, or `<phone Number><groupId>@g.us`.

To use these functions, it is necessary to initialize the bot.  
[**Click here to learn more.**](../Getting%20Started/start_bot.html)

## Summary
 - [getHost](#gethost)
 - [getWAVersion](#getWAVersion)

## getHost

Retrieve information about the device connected to the bot.

```javascript

await client.getHost();

```

## getWAVersion

Retrieve the version of WhatsApp currently in use.

```javascript

const version = await client.getWAVersion();

```