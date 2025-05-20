import nodemailer from 'nodemailer';

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io', // Reemplaza con tu servidor SMTP
    port: 2525,
    secure: false, // true para puerto 465, falso para otros
    auth: {
        user: 'a9f933763eb536',
        pass: '29fea79f0ad467'
    }
});

// Función para enviar correo
export async function sendEmail(to: string, subject: string, text: string) {
    try {
        const info = await transporter.sendMail({
            from: '"Lujo" <tu_correo@example.com>',
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