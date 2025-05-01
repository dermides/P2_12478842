import express from 'express';
import ContactsController from '../controllers/ContactsController';

const router = express.Router();

router.get('/admin/contactos', ContactsController.indexContactos);

export default router;

