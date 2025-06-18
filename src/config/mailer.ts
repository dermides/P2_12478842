import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "2525"),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const info = await transporter.sendMail({
      from: 'lujotiendas@lujo.com',
      to,
      subject,
      text,
    });
    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
}

transporter.verify(function(error, _success) {
  if (error) {
        console.log('Error de conexion en servidor:', error);
  } else {
        console.log('El servidor está listo para recibir nuestros mensajes.');
  }
});