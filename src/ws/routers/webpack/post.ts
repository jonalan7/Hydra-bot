import { init } from '../functions/post';
import { options } from './../../model/interface';
import { CreateOptions } from '../../../webpack/model/interface';

export = (router: any, option: CreateOptions | options) => {
  // Connect user
  router.post('/connect', async (req: any, res: any) => {
    await init.StartSession(req, res, option);
  });

  // Send a text message
  router.post('/sendtext', async (req: any, res: any) => {
    await init.sendtext(req, res);
  });

  // Send file
  router.post('/sendFile', async (req: any, res: any) => {
    await init.sendFile(req, res);
  });

  // Send Voice
  router.post('/sendAudio', async (req: any, res: any) => {
    await init.sendAudio(req, res);
  });

  // Route to test webhook
  router.post('/webhooktest', async (req: any, res: any) => {
    console.log('Return object ', req.body);
  });
};
