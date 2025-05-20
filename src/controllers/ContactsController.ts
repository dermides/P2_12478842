import { Request, Response } from 'express';
import ContactsModel from '../models/ContactsModel';
import getGeo from './geoController';
import axios from 'axios';


const requestIp = require('request-ip')

class ContactsController {

  async indexContactos(_req: Request, res: Response) {
    const contactos = await ContactsModel.findAll();
    res.render('admin/listcontactos', { contactos });
  }

  async getContacts(_req: Request, res: Response) {
    const contacts = await ContactsModel.findAll();
    res.json(contacts);
  }

  async addContact(req: Request, res: Response) {
    const recaptchaToken = req.body.recaptchaResponse;
    const secretKey = '6LeGm0ErAAAAAI-y5O-bZMJp8roN-VeMwVZQEB4j';

    try {
      const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
          secret: secretKey,
          response: recaptchaToken,
        },
      });

      if (response.data.success && response.data.score > 0.5) {

        const ip = requestIp.getClientIp(req); // Obtener la IP del cliente y asegurar que sea string
        const country = await getGeo(ip) || ""; // Obtener el país a partir de la IP
        const { nombre, email, comentario } = req.body;
        //const contact = await ContactsModel.create(nombre, email, comentario, ip);
        await ContactsModel.create(nombre, email, comentario, ip, country);
        //res.json(contact);
        req.flash('success', '¡Contacto guardado exitosamente!');
        res.redirect('/contactos'); // Redirigir a la ruta /contact/add después de agregar el contacto
      } else {
        res.status(400).send('Error en la validación de reCAPTCHA');
      }
    } catch (error) {
      res.status(500).send('Error en la validación');
    }
  }
}

export default new ContactsController();




