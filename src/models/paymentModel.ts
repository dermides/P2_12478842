import Payment from './Payment';

class paymentModel {
  async create(nombre_titular: string, email:string, numero_tarjeta:string, month:number, year:number, codigo_seguridad:string, monto:number, moneda:string) {
    return await Payment.create({ nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda });
  }

  async findUserByEmail(email: string) {
    return await Payment.findOne({ where: { email } });
  }

  async findAll() {
    return await Payment.findAll();
  }
}

export default new paymentModel();