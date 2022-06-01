import express, { Express, NextFunction } from 'express';
import { options } from './model/interface';
import cors from 'cors';
import { exec } from 'child_process';
const router = express.Router();

export function appExpress(options: options): Express {
  //Kill the entire process at the hidden door! (system)
  // exec(`kill -9 $(lsof -t -i:${options.port})`);
  // exec('pkill -KILL chrome');

  const app = express();
  app.use(cors());

  const corsOptions: cors.CorsOptions = {
    origin: '*',
  };


  app.set('view engine', 'ejs');
  app.set('views',`${__dirname}/views`);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ strict: false }));

  app.on('error', (err) => {
    console.error('Server error ', err);
  });

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

  app.use(
    express.raw({
      type: 'multipart/form-data',
    })
  );

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        return callback(null, true);
      },
    })
  );

  app.get('*', function (req, res) {
    res.render('error',{titulo: 'Jonalan'})
    // res.send({
    //   text: 'Route does not exist!',
    //   status: '404',
    //   erro: true,
    // });
  });

  return app;
}
