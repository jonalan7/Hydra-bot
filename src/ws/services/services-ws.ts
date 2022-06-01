import { Express, Router } from 'express';
import postWebpack from '../routers/webpack/post';
import postAdmin from '../routers/admin/post';
import { CreateOptions } from '../../webpack/model/interface';
import { options } from './../model/interface';

export class ServiceWs {
  constructor(public app: Express, public option: CreateOptions | options) {
    this.requireRouter();
  }
  public requireRouter() {
    postWebpack(this.app, this.option);
    postAdmin(this.app);
  }
}
