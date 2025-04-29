import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Subsistema: Manejador de contactos (SQLite)
/*class ContactRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async initialize(): Promise<void> {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        ip TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);
  }

  async addContact(name: string, phone: string, ip: string, timestamp: string): Promise<void> {
    await this.db.run('INSERT INTO contacts (name, phone, ip, timestamp) VALUES (?, ?, ?, ?)', [
      name,
      phone,
      ip,
      timestamp,
    ]);
    console.log(`Contacto añadido: ${name}`);
  }

  async getContacts(): Promise<{ id: number; name: string; phone: string; ip: string; timestamp: string }[]> {
    return await this.db.all('SELECT * FROM contacts');
  }
}
*/
// Clase 'Facade': ContactsModel
class ContactsModel {
  private contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async initialize(): Promise<void> {
    await this.contactRepository.initialize();
  }

  async addContact(name: string, phone: string, ip: string, timestamp: string): Promise<void> {
    await this.contactRepository.addContact(name, phone, ip, timestamp);
  }

  async getContacts(): Promise<{ id: number; name: string; phone: string; ip: string; timestamp: string }[]> {
    return await this.contactRepository.getContacts();
  }
}



// Configuración del servidor Express
(async () => {
  const db = await open({ filename: './contacts.db', driver: sqlite3.Database });
  const contactRepository = new ContactRepository(db);
  const contactsModel = new ContactsModel(contactRepository);
  const contactsController = new ContactsController(contactsModel);

  await contactsModel.initialize();

  const app = express();
  app.use(express.json());

  app.post('/contacts', (req, res) => contactsController.add(req, res));
  app.get('/contacts', (req, res) => contactsController.get(req, res));

  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
})();