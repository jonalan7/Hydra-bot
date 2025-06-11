import { OnMode, TypeStatusFind } from '../enum';
import { Page, Browser } from 'puppeteer';
import { WebPack } from '../../inject/webpack';
export interface StatusFind {
  erro: boolean;
  text: string;
  status: TypeStatusFind;
  statusFind: string;
  onType: OnMode;
  session: string;
  browserContext: {
    page: Page;
    browser: Browser;
  };
  connect: boolean;
  qrcode: string;
  client: WebPack;
  base64Image: string;
  result: any;
}

export type OptionalStatusFind = Partial<StatusFind>;
