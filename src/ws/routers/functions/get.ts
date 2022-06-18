import { options } from './../../model/interface';
import Users from '../../help/treatment';
import { sessionClient } from '../../help/sessions';
import { Request, Response } from 'express';
import { InicializeRouters } from './inicialize-routers';

export class InicializeGet {
  static child: any;

  static async getAllContacts(req: Request, res: Response, option: options) {
    const $_HEADERS_USER = req.headers?.user;

    if (option.authentication) {
      const user = await Users.CheckUserLogin(req);
      if (user.erro) {
        return res.send(user);
      }
    }
    const check = await sessionClient.checkClient($_HEADERS_USER);
    if (check) {
      const getId = await sessionClient.getSessionId($_HEADERS_USER);
      if (typeof getId === 'number') {
        const client = await sessionClient.checkObjectSession(
          $_HEADERS_USER,
          'connect',
          getId
        );
        if (client && InicializeRouters.inicialize) {
          const getUser = await sessionClient.getUser($_HEADERS_USER);
          getUser.child.send({ type: 'getAllContacts' });
          this.child.on('message', (response: any) => {
            if (response.result && response.typeGet === 'getAllContacts') {
              try {
                return res.status(200).send(response);
              } catch {}
            }
          });
        } else {
          return res.send({
            erro: true,
            text: 'Waiting for connection with whatsapp',
          });
        }
      }
    } else {
      return res.send({
        erro: true,
        text: 'Not connected',
      });
    }
  }
}
