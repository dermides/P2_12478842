import { Request, Response } from 'express';
import ContactsModel from '../models/ContactsModel';

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
    const ip = requestIp.getClientIp(req); // Obtener la IP del cliente
    const { nombre, email, comentario } = req.body;
    //const contact = await ContactsModel.create(nombre, email, comentario, ip);
    await ContactsModel.create(nombre, email, comentario, ip);
    //res.json(contact);
    req.flash('success', '¡Contacto guardado exitosamente!');
    res.redirect('/contactos'); // Redirigir a la ruta /contact/add después de agregar el contacto
  }
}

export default new ContactsController();