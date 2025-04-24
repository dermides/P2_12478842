import express from "express";
import cors from "cors";
import routeHome from "./routes/home";

import dotenv from 'dotenv'; 

dotenv.config();

const app = express();

app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(express.static(__dirname +"/public"));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.use('/', routeHome); // Importar las rutas de home.ts


app.use((req, res) => {
  res.statusCode = 404
  res.send('404 not Found')
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});