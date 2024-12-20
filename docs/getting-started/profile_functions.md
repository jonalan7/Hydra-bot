Here you will find features related to the connected client's profile, such as displaying the **WhatsApp Web version**, user information like **name** and **image**, among others. 
Additionally, you can **close the client's browser** or **disconnect them from WhatsApp**. 
Several similar features will be available here.

## Summary
 - [**getHost**](#gethost) - Retrieve information about the device connected to the bot.
 - [**getWAVersion**](#getwaversion) - Retrieve the version of WhatsApp currently in use.
 - [**close**](#close) - Closes page and browser client
 - [**logoutSession**](#logoutsession) - Logout from WhatsApp Web
 - [**screenshot**](#screenshot) - This function captures an image of the browser screen

## getHost

This function is used to retrieve information about the main user, such as name, image, and more.

```javascript

await client.getHost();

```

## getWAVersion

Get information about the current version of WhatsApp Web.

```javascript

const version = await client.getWAVersion();

```

## close

This function closes the client's browser, shutting down the WhatsApp page.

```javascript

await client.browserClose();

```

## logout

This function is used to disconnect the client from WhatsApp.

```javascript

await client.logoutSession();

```

## screenshot

This function captures an image of the browser screen, allowing you to check the navigation behavior through a screenshot.

```javascript
// Return base64 image
await client.screenshot();

```