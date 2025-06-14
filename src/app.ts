import express from "express";
import cors from "cors";
import session from 'express-session';
import flash from 'connect-flash';

import routeHome from "./routes/home";
import contactsRoute from './routes/contactsRoute';
import routeAdmin from "./routes/admin";
import routePayment from "./routes/paymentRoute";
import routeAuth from "./routes/auth";

import dotenv from 'dotenv';
import { join } from "path";

dotenv.config();

const app = express();
const MemoryStore = require('memorystore')(session)

app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname + "/public")));
app.set('views', join(__dirname + '/views'));
app.set("view engine", "ejs");

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 
  }),
  secret: process.env.SESSION_SECRET || "45730eba2e09cf2f7444bfc395d152d13c34d4b8071f286f68c8feda1caac9a67",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.render("index"); // Renderizar la vista index.ejs en la carpeta views
});

app.use(routeHome); // Importar las rutas de home.ts
app.use(contactsRoute); // Importar las rutas de contactsRoutes.ts
app.use(routeAdmin); // Importar las rutas de admin.ts
app.use(routePayment); // Importar las rutas de paymentRoute.ts
app.use(routeAuth);


app.use((_req, res) => {
  res.statusCode = 404
  res.send('404 not Found')
});

app.listen(port, () => {
  console.log(`Servidor esta corriendo en el puerto http://localhost:${port}`);
});