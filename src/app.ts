import express from "express";
import cors from "cors";
import session from 'express-session';
import flash from 'connect-flash';

import routeHome from "./routes/home";
import routeAuth from "./routes/auth";
import contactsRoute from './routes/contactsRoute';

import dotenv from 'dotenv'; 
import { join } from "path";

dotenv.config();

const app = express();

app.use(session({
  secret: 'mi_secreto',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname +"/public")));
app.set('views', join(__dirname + '/views'));
app.set("view engine","ejs");

app.get("/", (_req, res) => {
  res.render("index"); // Renderizar la vista index.ejs en la carpeta views
});

app.use(routeHome); // Importar las rutas de home.ts
app.use(routeAuth); // Importar las rutas de auth.ts
app.use(contactsRoute); // Importar las rutas de contactsRoutes.ts

app.use((_req, res) => {
  res.statusCode = 404
  res.send('404 not Found')
});

app.listen(port, () => {
  console.log(`Servidor esta corriendo en el puerto http://localhost:${port}`);
});