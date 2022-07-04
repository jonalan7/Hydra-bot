import { Express, Request, Response } from 'express';
import { InicializeRouters } from '../functions/inicialize-routers';
import { options } from './../../model/interface';
import { CreateOptions } from '../../../webpack/model/interface';

export const getRouters = (
  router: Express,
  option: CreateOptions | options
) => {
  // Get all Contacts
  router.get('/get_all_contacts', async (req: Request, res: Response) => {
    await InicializeRouters.getAllContacts(req, res, option);
  });

  // Check if it's connected
  router.get('/check_connect/:name', async (req: Request, res: Response) => {
    await InicializeRouters.checkConnect(req, res, option);
  });

  //Get the last qrcode
  router.get('/last_qrcode', async (req: Request, res: Response) => {
    await InicializeRouters.lastQrcode(req, res, option);
  });
};
