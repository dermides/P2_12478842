import express from 'express';
import authController from '../controllers/authController';


const router = express.Router();

routeHome.get("/", renderHome);

router.get("auth/registro", authController.userRegistro);
routeAuth.get("admin/login");



export default router;
