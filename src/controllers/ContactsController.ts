import { Request, Response } from 'express';
import ContactsModel from '../models/ContactsModel';
import getGeo from './geoController';
import axios from 'axios';
import { sendEmail } from '../config/mailer';
import dotenv from 'dotenv';

dotenv.config();

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
    const secretKey = process.env.API_KEY;

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
        const emails =  email + ',programacion2ais@yopmail.com';

        await sendEmail(emails, 'Formulario Contacto', ['Nombre: ' + nombre, 'Email: ' + email, 'Comentario: ' + comentario, 'Direcion Ip: ' + ip, 'Pais: ' + country].join('\n'))
          .then(() => req.flash('success', 'Correo enviado correctamente'))
          .catch(err => req.flash('success','Error enviando correo', err));

        await ContactsModel.create(nombre, email, comentario, ip, country);
        
        req.flash('success', '¡Contacto guardado exitosamente!');
        res.redirect('/contactos'); // Redirigir a la ruta /contact/add después de agregar el contacto
      } else {
        req.flash('success','Error en la validación de reCAPTCHA');
      }
    } catch (error) {
      req.flash('success', 'Error en la validación');
    }
  }
}

export default new ContactsController();




