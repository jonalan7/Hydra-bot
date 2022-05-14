import { Browser, BrowserContext, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
import { CreateOptions } from "../interface";
import { puppeteerConfig } from "../help";

export async function initBrowser(Browser: Browser): Promise<Page | boolean> {
  const wpage: Page = await oneTab(Browser);
  if (wpage) {
    try {
      await wpage.setUserAgent(puppeteerConfig.useragentOverride);
      await wpage.goto(puppeteerConfig.whatsappUrl, {
        waitUntil: "domcontentloaded",
      });
      Browser.userAgent();
      return wpage;
    } catch {
      return false;
    }
  }
  return false;
}

export async function initLaunch(
  options: CreateOptions
): Promise<Browser | boolean> {
  puppeteer.use(StealthPlugin());
  try {
    return await puppeteer.launch({
      headless: options.puppeteerOptions?.headless,
      args: options.puppeteerOptions?.args,
    });
  } catch {
    return false;
  }
}

export async function oneTab(
  Browser: Browser | BrowserContext
): Promise<Page | any> {
  try {
    const page: Page[] = await Browser.pages();
    if (page.length) return page[0];
    return await Browser.newPage();
  } catch {
    return false;
  }
}
