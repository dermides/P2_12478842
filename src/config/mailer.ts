import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "2525"),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail(from: string, to: string, subject: string, text: string) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });
    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
}