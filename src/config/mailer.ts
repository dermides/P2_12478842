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
export async function sendEmail(from: string,to: string, subject: string, text: string) {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    console.info(`Sending mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.error(error);
        } else {
            console.info('Email sent: ' + info.response);
        }
    });
}