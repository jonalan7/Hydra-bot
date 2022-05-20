import express from "express";
import cors from 'cors'
export async function initWs(createOption: any): Promise<any>;

export function initWs(options: any): any {

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
app.listen("8080", () => {
  
});

}





