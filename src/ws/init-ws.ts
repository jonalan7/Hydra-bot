import { options, defaultConfigWs } from './model/interface';
import { appExpress } from './app';
import { Express, Request, Response } from 'express';
import { ServiceWs } from './services/services-ws';
import { CreateOptions, defaultConfig } from '../webpack/model/interface';
import { checkUpdates } from '../webpack/api/check-up-to-date';

export async function initWs(
  createOption?: CreateOptions | options
): Promise<any>;

/**
 * Start the Web Service
 */
export async function initWs(options?: CreateOptions & options): Promise<any> {
  const mergeOptions: options = { ...defaultConfigWs, ...options };
  const mergeWebPack: CreateOptions & options = {
    ...defaultConfig,
    ...mergeOptions,
  };

  if (!!options?.puppeteerOptions) {
    mergeWebPack.puppeteerOptions = {
      ...defaultConfig.puppeteerOptions,
      ...options.puppeteerOptions,
    };
  }

  if (mergeWebPack.updatesLog) {
    await checkUpdates();
  }

  const app: Express = appExpress(mergeWebPack);

  new ServiceWs(app, mergeWebPack);

  app
    .listen(mergeWebPack.port, () => {
      console.log(
        `Web service on ${mergeWebPack.hostServer}:${mergeWebPack.port}`
      );
    })
    .on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${mergeWebPack.port} is already in use.`);
      } else {
        console.error(`Server error: ${err.message}`);
      }
    });

  app.use(function (req: Request, res: Response) {
    res.send({
      text: 'Route does not exist!',
      status: '404',
      erro: true,
    });
  });
}
