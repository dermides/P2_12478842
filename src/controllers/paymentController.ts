import { Request, Response } from 'express';
import paymentModel from '../models/paymentModel';
import { validationResult } from 'express-validator';


class ContactsController {

  async indexContactos(_req: Request, res: Response) {
    const contactos = await paymentModel.findAll();
    res.render('admin/listpagos', { contactos });
  }

  async getContacts(_req: Request, res: Response) {
    const contacts = await paymentModel.findAll();
    res.json(contacts);
  }

  async addPayment(req: Request, res: Response) {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const valores = req.body
        const validaciones = errors.array()
        res.render('home/pagos', {message: req.flash(), validaciones:validaciones, valores: valores})
    } else {
      const { nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda } = req.body;
      await paymentModel.create(nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda);
      
      req.flash('success', '¡Pago realizado exitosamente!');
      res.redirect('/pagos'); // Redirigir a la ruta /contact/add después de agregar el contacto

    }

  }
}

export default new ContactsController();