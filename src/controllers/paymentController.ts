import { Request, Response } from 'express';
import paymentModel from '../models/paymentModel';
import { validationResult } from 'express-validator';
import axios from 'axios';

class paymentController {

  async indexPagos(_req: Request, res: Response) {
    const pagos = await paymentModel.findAll();
    res.render('admin/listpagos', { pagos });
  }

  async procesarPago(monto: number, tarjeta: string, cvv: number, mes: string, ano:string) {
    try {
      const response = await axios.post(`${process.env.PAYMENT_API_URL}/pay`, {
        amount: monto,
        "card-number": tarjeta,
        cvv: cvv,
        "expiration-month": mes,
        "expiration-year": ano
      });
      return response.data;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      return null;
    }
  }

  async addPayment(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const valores = req.body
      const validaciones = errors.array()
      res.render('home/pagos', { message: req.flash(), validaciones: validaciones, valores: valores })
    } else {
      const { nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda } = req.body;
      const resultado = await this.procesarPago(monto, numero_tarjeta, codigo_seguridad, month, year);

      if (resultado) {
        await paymentModel.create(nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda);
        req.flash('success', '¡Pago realizado exitosamente!');
        res.redirect('/pagos');
      } else {
        req.flash('success', '¡Pago no realizado!');
        res.redirect('/pagos');
      }

    }

  }
}

export default new paymentController();

