import express from "express";
import cors from "cors";
import routeHome from "./routes/home";

import dotenv from 'dotenv'; 
import { join } from "path";

dotenv.config();

const app = express();

app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(express.static(join(__dirname +"/public")));
app.set('views', join(__dirname + '/views'));
app.set("view engine","ejs");

app.use('/', routeHome); // Importar las rutas de home.ts


app.use((req, res) => {
  res.statusCode = 404
  res.send('404 not Found')
});



app.listen(port, () => {
  console.log(`Servidor esta corriendo en el puerto http://localhost:${port}`);
});