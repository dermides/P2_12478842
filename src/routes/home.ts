import { Router} from "express";
import { renderHome,renderBeneficios } from "../controllers/homeController";

const routeHome = Router();

routeHome.get("/", renderHome);

routeHome.get("/beneficios", renderBeneficios);

export default routeHome;