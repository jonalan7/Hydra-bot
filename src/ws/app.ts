import express, {Express} from 'express';
const { exec } = require('child_process');
import { options } from './model/interface';
import cors from 'cors'

export function appExpress (options:  options): Express {

    //Kill the entire process at the hidden door! (system)
    exec(`kill -9 $(lsof -t -i:${options.port})`);
    exec('pkill -KILL chrome');

    const app = express();
    app.use(cors());

    const corsOptions: cors.CorsOptions = {
        origin: '*'
    };
    
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
  
    app.use(
      express.json({
        limit: '60mb',
      })
    );
  
    app.use(
      express.raw({
        type: '*/*',
      })
    );

    return app;
}