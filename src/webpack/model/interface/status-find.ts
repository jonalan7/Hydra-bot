import { OnMode, TypeStatusFind } from '../enum';
import { Page } from 'puppeteer';
import { WebPack } from '../../inject/webpack';

export interface StatusFind {
  erro: boolean;
  text: string;
  status: TypeStatusFind;
  statusFind: string;
  onType: OnMode;
  session: string;
  page: Page;
  connect: boolean;
  qrcode: string;
  client: WebPack;
  base64Image: string;
  result: any;
}

export type OptionalStatusFind = Partial<StatusFind>;
