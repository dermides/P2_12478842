import express from 'express';
import ContactsController from '../controllers/ContactsController';
import paymentController from '../controllers/paymentController';
import authController from '../controllers/authController';
import adminController from '../controllers/adminController';

const router = express.Router();

router.get('/admin',adminController.panelAdmin);
router.get('/admin/contactos', ContactsController.indexContactos);
router.get('/admin/pagos', paymentController.indexPagos);
router.get('/admin/registro',authController.userRegistro);

export default router;

