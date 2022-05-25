import { options, defaultConfigWs } from './model/interface';
import { appExpress } from './app';
import express, { Express } from 'express';
import { ServiceWs } from './services/services-ws';
import { CreateOptions, defaultConfig } from '../webpack/model/interface';

export async function initWs(
  createOption?: CreateOptions | options | any
): Promise<any>;

export function initWs(options?: CreateOptions | options | any): any {
  const mergeOptions = { ...defaultConfigWs, ...options };
  const mergeWebPack = { ...defaultConfig, ...mergeOptions };

  if (!!options?.puppeteerOptions) {
    mergeWebPack.puppeteerOptions = {
      ...defaultConfig.puppeteerOptions,
      ...options.puppeteerOptions,
    };
  }

  const app: Express = appExpress(mergeOptions);

  new ServiceWs(app, mergeOptions);

  app.listen(mergeOptions.port, () => {
    console.log(`Web service on http://localhost:${mergeOptions.port}`);
  });
}
