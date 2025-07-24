import express from 'express';
import ContactsController from '../controllers/ContactsController';

const router = express.Router();

router.get('/contactos', ContactsController.getContacts);
router.post('/contact/add', ContactsController.addContact);

export default router;

