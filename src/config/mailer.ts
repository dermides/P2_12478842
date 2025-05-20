import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Reemplaza con tu servidor SMTP
    port: Number(process.env.SMTP_PORT),
    secure: false, // true para puerto 465, falso para otros
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Función para enviar correo
export async function sendEmail(to: string, subject: string, text: string) {
    try {
        const info = await transporter.sendMail({
            from: '"Lujo" <${process.env.SMTP_FROM}>',
            to,
            subject,
            text
        });

        console.log(`Correo enviado: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Error enviando correo:`, error);
        throw error;
    }
}