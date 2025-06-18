import { Router} from "express";
import { renderBeneficios } from "../controllers/homeController";

const routeHome = Router();

routeHome.get("/beneficios", renderBeneficios);

export default routeHome;