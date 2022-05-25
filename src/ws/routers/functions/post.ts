import { spawn } from 'child_process';
import { text } from 'stream/consumers';
import { isThisTypeNode } from 'typescript';
import { sessionClient } from '../../help/sessions';

export const init = new (class InicializePost {
  public child: any;
  public res: any;
  constructor() {
    this.child = '';
    this.res = '';
  }
  async StartSession(req: any, res: any, option: any) {
    const body = req.body;
    this.res = res;
    if (
      !!body.session &&
      body.session.length &&
      typeof body.session === 'string'
    ) {
      const session = await sessionClient.newSession(body.session);
      if (session) {
        option.session = body.session;

        const spawnArgs = [
          __dirname + '../../../services/hydra.js',
          JSON.stringify(option),
        ];

        this.child = spawn('node', spawnArgs, {
          stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
        });

        this.child.on('message', (response: any) => {
          if (response.connect) {
            sessionClient.addInfoSession(response.session, {
              connect: response.connect,
            });
          }
        });

        this.child.on('disconnect', (err: any) => {
          console.log('disconnect', err ? err : '');
        });

        this.child.on('error', async (err: any) => {
          if (err) {
            console.log('on error', err);
          }
        });

        this.child.on('close', async (code: any) => {
          console.log(`child process exited with code`, code);
        });

        this.child.on('uncaughtException', (err: any) => {
          console.log(err);
        });

        sessionClient.addInfoSession(body.session, { child: this.child });

        res.send({ erro: false, text: 'Wait for connection' });
      } else {
        const getId = await sessionClient.getSessionId(body.session);
        const check = await sessionClient.checkClient(body.session);

        if (typeof getId === 'number') {
          const client = await sessionClient.checkObjectSession(
            body.session,
            'connect',
            getId
          );
          if (check && client) {
            res.send({ erro: false, text: 'Successfully connected!' });
          } else {
            res.send({ erro: false, text: 'Wait for connection' });
          }
        }
      }
    } else {
      res.send({
        erro: true,
        text: 'Need to inform the session',
      });
    }
  }

  public async sendtext(req: any, res: any) {
    const body = req.body;
    if (
      !!body.session &&
      body.session.length &&
      !!body.to &&
      body.to.length &&
      !!body.body &&
      body.body.length
    ) {
      const check = await sessionClient.checkClient(body.session);
      if (check) {
        const getId = await sessionClient.getSessionId(body.session);
        if (typeof getId === 'number') {
          const client = await sessionClient.checkObjectSession(
            body.session,
            'connect',
            getId
          );
          if (client) {
            const getUser = await sessionClient.getUser(body.session);
            getUser.child.send({ type: 'text', ...body });
            this.child.on('message', (response: any) => {
              if (response.result) {
                return res.send(
                  response
                );
              
              }
            })
          }
        }
      } else {
        res.send({
          erro: true,
          text: 'Not connected',
        });
      }
    } else {
      res.send({
        erro: true,
        text: 'The parameters are missing',
      });
    }
  }
})();
