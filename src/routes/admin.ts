import express from 'express';
import ContactsController from '../controllers/ContactsController';
import paymentController from '../controllers/paymentController';
import authController from '../controllers/authController';
//import adminController from '../controllers/adminController';
import { isAuthenticated } from '../middleware/passport';


const router = express.Router();

router.get('/admin', isAuthenticated, (req, res) => {
    res.render('admin/panel', { user: req.session.userId });
});
router.get('/admin/login', authController.userLogin);
router.post('/admin/login', authController.userPass);

//router.get('/admin',adminController.panelAdmin);

router.get('/admin/contactos', isAuthenticated, ContactsController.indexContactos);
router.get('/admin/pagos', isAuthenticated, paymentController.indexPagos);
router.get('/admin/registro', isAuthenticated, authController.userRegistro);
router.post('/admin/registro/add', isAuthenticated, authController.userAdd);

router.post('/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('No se pudo cerrar la sesión');
    } else {
      res.clearCookie('connect.sid'); // Opcional: limpia la cookie de sesión
      return res.redirect('/admin/login'); // Redirige al login después de cerrar sesión
    }
  });

});

export default router;

