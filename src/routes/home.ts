import { Router} from "express";
import { 
    renderBeneficios,
    renderVentajas,
    renderNosotros,
    renderContactos
} from "../controllers/homeController";

const routeHome = Router();

//routeHome.get("/", renderHome);

routeHome.get("/beneficios", renderBeneficios);
routeHome.get("/ventajas", renderVentajas);
routeHome.get("/nosotros", renderNosotros);
routeHome.get("/contactos", renderContactos);

export default routeHome;