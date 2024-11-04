import { Express } from 'express';
import { postRouters } from '../routers/webpack/post';
import { getRouters } from '../routers/webpack/get';
import { CreateOptions } from '../../webpack/model/interface';
import { options } from './../model/interface';

import RouterpostAdmin from '../routers/admin/post';
import RoutergetAdmin from '../routers/admin/get';
import RouterdeleteAdmin from '../routers/admin/delete';
import RouterputAdmin from '../routers/admin/put';

export class ServiceWs {
  constructor(
    public app: Express,
    public option: CreateOptions | options
  ) {
    this.requireRouter();
  }

  public requireRouter() {
    // User Routers
    postRouters(this.app, this.option);
    getRouters(this.app, this.option);

    // Admin Routers
    RouterpostAdmin(this.app);
    RoutergetAdmin(this.app);
    RouterdeleteAdmin(this.app);
    RouterputAdmin(this.app);
  }
}
