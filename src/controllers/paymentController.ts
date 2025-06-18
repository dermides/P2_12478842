import { Request, Response } from 'express';
import paymentModel from '../models/paymentModel';
import { validationResult } from 'express-validator';
import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const url: string = process.env.PAYMENT_API ?? '';

class paymentController {

  async indexPagos(_req: Request, res: Response) {
    const pagos = await paymentModel.findAll();
    res.render('/admin/listpagos', { pagos });
  }

  async addPayment(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const valores = req.body
      const validaciones = errors.array()
      res.render('/home/pagos', { message: req.flash(), validaciones: validaciones, valores: valores })
    } else {
      const { nombre_titular, email, numero_tarjeta, month, year, codigo_seguridad, monto, moneda } = req.body;
      
      const resultado = await procesarPago(monto, numero_tarjeta, codigo_seguridad, month, year, moneda);

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

async function procesarPago(monto: string, tarjeta: string, cvv: string, mes: string, ano: string, moneda: string) {
    try {
      if (!url) {
        throw new Error('Error en url');
      }
      const response = await axios.post(`${process.env.PAYMENT_API}/payments`, {
        "amount": monto,
        "card-number": tarjeta,
        "cvv": cvv,
        "expiration-month": mes,
        "expiration-year": ano,
        "currency": moneda
        
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