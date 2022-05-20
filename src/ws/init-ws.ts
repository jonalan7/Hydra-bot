import { options, defaultConfig } from './model/interface';
import { appExpress } from './app';
import { Express } from 'express';
import { ServiceWs } from './services/services-ws';
 
export async function initWs(createOption: options): Promise<any>;

export function initWs(options: options): any {
  const mergeOptions = { ...defaultConfig, ...options };

  const app: Express = appExpress(options);
  
  app.listen(options.port, () => {
    console.log(`Web service on http://localhost:${options.port}`);
  });
}
