import { Express, Request, Response } from 'express';
import { InicializeRouters } from '../functions/inicialize-routers';
import { options } from './../../model/interface';
import { CreateOptions } from '../../../webpack/model/interface';

export const getRouters = (router: Express, option: CreateOptions | options) => {

  router.get('/get_all_contacts', async (req: Request, res: Response) => {
      await InicializeRouters.getAllContacts(req, res, option);
  });

};
