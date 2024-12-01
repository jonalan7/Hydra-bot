# Installation

The **Hydra-Bot** Project is an open-source application developed entirely in TypeScript and **Node.js**. To use it, it is essential to have Node.js installed in your environment, as it is responsible for running the application's code. Additionally, you will need npm (**Node.js** package manager) to download and manage the dependencies necessary for the project to work.

You can download Node.js, which includes npm, directly from the official website:
[**Download Node.js and npm**](https://nodejs.org/pt)

# Verifying the Installations

To ensure that **Node.js** and npm are correctly installed, you can run the following commands in your terminal to check their versions:

**To check the Node.js version:**

```bash
node -v  
```

This command will display the installed Node.js version.
**To check the npm version:**

```bash
npm -v 
```
This command will display the installed npm version.

# What is npm?
**npm** is the default package manager for the **Node.js** JavaScript runtime environment. It is used to download and manage libraries, including the latest version of **Hydra-Bot**, for your machine.

# Installing Hydra-Bot

### Unstable Version
You can install the latest version of **Hydra-Bot** directly via npm using the following command:

```bash
npm i --save hydra-bot  
```

### Development Version
If you want access to the current development version (beta), which includes features not yet officially released, you can download it from **GitHub** with the following command:

```bash
npm i --save https://github.com/jonalan7/Hydra-bot/releases/download/nightly/hydra-nightly.tgz  
```

# Hydra-Bot Operation Modes

### Free Mode

In this mode, you have complete freedom to create your custom automations. 
You can leverage the full power of **Node.js** to program and configure the functionalities as you wish.

[**Check out more details**](./start_bot.html)

### Web-Service Mode

This mode is ideal for those less familiar with **Node.js** or those who prefer using predefined operations. 
It provides a set of ready-to-use routes utilizing the HTTP methods **POST**, **GET**, **PUT**, and **DELETE**, allowing for simple and efficient interaction with the system.

[**Check out more details**](./web_service.html)
