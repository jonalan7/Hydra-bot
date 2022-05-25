
import { init } from '../functions/post';
import { options } from './../../model/interface';
import { CreateOptions } from '../../../webpack/model/interface';

export = (router: any, option: CreateOptions | options) => {
    // Connect user
    router.post('/connect', async (req: any, res: any) => {
        await init.StartSession(req, res, option);
    });

    router.post('/sendtext', async (req: any, res: any) => {
        await init.sendtext(req, res);
    });
}