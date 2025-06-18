import express from 'express';
import { body } from 'express-validator';
import paymentController from '../controllers/paymentController';

const router = express.Router();

router.post('/payment/add', 
    body('nombre_titular').notEmpty().withMessage('El nombre del titular es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('numero_tarjeta').notEmpty().withMessage('El número de tarjeta es obligatorio'),
    body('numero_tarjeta').isLength({min: 12, max:19}).withMessage('El número de tarjeta no es correcto.'),
    body('month').isInt({ min: 1, max: 12 }).withMessage('El mes no es válido'),
    body('year').isInt({ min: 2010 }).withMessage('El año no es válido'),
    body('codigo_seguridad').notEmpty().withMessage('El código de seguridad es obligatorio'),
    body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor que 0'),
    body('moneda').notEmpty().withMessage('La moneda es obligatoria')
    ,paymentController.addPayment);

export default router;