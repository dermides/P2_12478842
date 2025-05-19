import Contactos from './Contactos';

class ContactsModel {
  async create(nombre: string, email: string, comentario: string, direccion_ip: string, pais: string) {
    return await Contactos.create({ nombre, email, comentario, direccion_ip, pais});
  }

  async findAll() {
    return await Contactos.findAll();
  }
}

export default new ContactsModel();