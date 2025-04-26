import { Router} from "express";
import { 
    renderRegistro,
    renderLogin
} from "../controllers/authController";

const routeAuth = Router();

//routeHome.get("/", renderHome);

routeAuth.get("/registro", renderRegistro);
routeAuth.get("/login", renderLogin);

export default routeAuth;