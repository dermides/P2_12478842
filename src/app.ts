import express from "express";
import cors from "cors";
import session from 'express-session';
import flash from 'connect-flash';
import "./auth/google";

import routeHome from "./routes/home";
import contactsRoute from './routes/contactsRoute';
import routeAdmin from "./routes/admin";
import routePayment from "./routes/paymentRoute";
import routeAuth from "./routes/auth";


import dotenv from 'dotenv';
import { join } from "path";
import passport from "passport";


dotenv.config();

const app = express();
//const MemoryStore = require('memorystore')(session)
//const GoogleStrategy = require('passport-google-oauth20').Strategy;


app.use(cors());
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname + "/public")));
app.set('views', join(__dirname + '/views'));
app.set("view engine", "ejs");

// Configuración de la sesión
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,           // Previene el acceso desde JavaScript
    secure: process.env.NODE_ENV === 'production', // Solo por HTTPS en producción
    sameSite: 'lax',          // Ayuda a prevenir CSRF
    maxAge: 15 * 60 * 1000    // 15 minutos en milisegundos
  }

}));

app.use(passport.initialize());
app.use(passport.session());


// Configuración de flash messages

app.use(flash());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.render("index"); // Renderizar la vista index.ejs en la carpeta views
});

app.use(routeHome); // Importar las rutas de home.ts
app.use(contactsRoute); // Importar las rutas de contactsRoutes.ts
app.use(routeAdmin); // Importar las rutas de admin.ts
app.use(routePayment); // Importar las rutas de paymentRoute.ts
app.use(routeAuth);  // Importar las rutas de auth.ts

app.get("/auth/google", passport.authenticate("google", { scope: ["profile","email"] }));
app.get("/auth/google/credencial", passport.authenticate("google", {
    failureRedirect: "/admin/login",
}), (_req, res) => res.render("admin/panel"));


app.use((_req, res) => {
  res.statusCode = 404
  res.send('404 not Found')
});

app.listen(port, () => {
  console.log(`Servidor esta corriendo en el puerto http://localhost:${port}`);
});