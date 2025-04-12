import { Router } from "express";

export const routerMain = Router();

routerMain.get('/', (req, res) => {
    res.render('index', { titulo : "Sistema de alquiler"});
});