import { options } from './../../model/interface';
import { InicializePost } from './post';

export class InicializeRouters extends InicializePost {
  static inicialize: Boolean = false;

  constructor(child: any, option: any) {
    super();
    InicializeRouters.inicialize = true;
    InicializeRouters.child = child;
  }
}
