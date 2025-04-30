import Contactos from './Contactos';

class ContactsModel {
  async create(nombre: string, email: string, comentario: string, direccion_ip: string) {
    return await Contactos.create({ nombre, email, comentario, direccion_ip});
  }

  async findAll() {
    return await Contactos.findAll();
  }
}

export default new ContactsModel();