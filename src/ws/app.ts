import express, { Express, NextFunction } from 'express';
import { options } from './model/interface';
import cors from 'cors';


export function appExpress(options: options): Express {
  const app = express();
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

  const corsOptions: cors.CorsOptions = {
    origin: '*',
  };

  app.set('view engine', 'ejs');
  app.set('views', `${__dirname}/views`);

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

  app.get('/', function (req, res) {
    res.render('error', { titulo: 'hydra' });
  });

  return app;
}
