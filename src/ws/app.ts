import express, { Express, Request, Response } from 'express';
import { options } from './model/interface';
import { rateLimit } from 'express-rate-limit';
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

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
  });

  // apply rate limiter to all requests
  app.use(limiter);

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

  app.get('/', function (req: Request, res: Response) {
    res.render('error', { titulo: 'hydra' });
  });

  return app;
}
