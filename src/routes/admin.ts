import express from 'express';
import ContactsController from '../controllers/ContactsController';
import paymentController from '../controllers/paymentController';

const router = express.Router();

router.get('/admin/contactos', ContactsController.indexContactos);
router.get('/admin/pagos', paymentController.indexPagos);

export default router;

