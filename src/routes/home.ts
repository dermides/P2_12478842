import { Router} from "express";
import { 
    renderBeneficios,
    renderVentajas,
    renderNosotros,
    renderContactos,
    renderPagos
} from "../controllers/homeController";

const routeHome = Router();

//routeHome.get("/", renderHome);

routeHome.get("/beneficios", renderBeneficios);
routeHome.get("/ventajas", renderVentajas);
routeHome.get("/nosotros", renderNosotros);
routeHome.get("/contactos", renderContactos);
routeHome.get("/pagos", renderPagos);

export default routeHome;