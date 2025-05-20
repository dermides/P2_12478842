import { Request, Response } from 'express';
import paymentModel from '../models/paymentModel';
import { validationResult } from 'express-validator';
import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();


class paymentController {

  async indexPagos(_req: Request, res: Response) {
    const pagos = await paymentModel.findAll();
    res.render('admin/listpagos', { pagos });
  }

  async addPayment(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const valores = req.body
      const validaciones = errors.array()
      res.render('home/pagos', { message: req.flash(), validaciones: validaciones, valores: valores })
    } else {
      const { nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda } = req.body;
      
      const resultado = await procesarPago(Number(monto), numero_tarjeta, Number(codigo_seguridad), month, year);

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

async function procesarPago(monto: number, tarjeta: string, cvv: number, mes: string, ano: string) {
    try {
      const response = await axios.post(`/payment/add`, {
        amount: monto,
        "card-number": tarjeta,
        cvv: cvv,
        "expiration-month": mes,
        "expiration-year": ano
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.PAYMENT_KEY}`
        }

      });
      return response.data;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      return null;
    }
  }


  export default new paymentController();