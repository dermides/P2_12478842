import express from "express";
import { router } from "../routes/router";

const web = express();
console.log('Estoy en web:',`${router}`);
web.get('/', router);

export { web };