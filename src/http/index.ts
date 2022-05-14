import express from "express";
import cors from "cors";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen("8080", () => {
  
});
