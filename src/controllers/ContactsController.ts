import { join } from 'path';
import { Request, Response } from 'express';
import ContactsModel from '../models/ContactsModel';
import getGeo from './geoController';
import axios from 'axios';
import { sendEmail } from '../config/mailer';



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

        await ContactsModel.create(nombre, email, comentario, ip, country);

        sendEmail('programacion2ais@yopmail.com,todocomputerve@gmail.com', 'Formulario Contacto', [nombre, email, comentario, ip, country].join('\n'))
          .then(() => req.flash('success', 'Correo enviado correctamente'))
          .catch(err => req.flash('success','Error enviando correo', err));

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




