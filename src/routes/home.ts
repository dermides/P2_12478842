import { Router } from "express";

const home = Router();

home.get('/', (req, res) => {
    res.render("index", { titulopage : "Sistema de alquiler"});
});

export { home };