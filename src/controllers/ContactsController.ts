import { Request, Response } from 'express';
import { ContactsModel } from '../models/ContactsModel'; // Asegúrate de que la ruta sea correcta
import { ContactRepository } from '../models/ContactsModel'; // Asegúrate de que la ruta sea correcta    

class ContactsController {
  private contactsModel: ContactsModel;

  constructor(contactsModel: ContactsModel) {
    this.contactsModel = contactsModel;
  }

  async add(req: Request, res: Response): Promise<void> {
    const { name, phone } = req.body;
    const ip = req.ip;
    const timestamp = new Date().toISOString();
    await this.contactsModel.addContact(name, phone, ip, timestamp);
    res.status(201).send(`Contacto añadido: ${name}`);
  }

  async get(req: Request, res: Response): Promise<void> {
    const contacts = await this.contactsModel.getContacts();
    res.json(contacts);
  }
}