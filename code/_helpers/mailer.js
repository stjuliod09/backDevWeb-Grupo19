const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config(); // Para cargar credenciales desde un archivo .env

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

/**
 * Enviar correo usando una plantilla EJS
 * @param {string} to - Dirección de correo del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} template - Nombre del archivo de la plantilla
 * @param {Object} params - Datos a inyectar en la plantilla
 */
async function sendEmail(to, subject, template, params) {
    try {
        const file = path.join(__dirname, `../templates/${template}.html`);
        const html = await ejs.renderFile(file, params);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log("Correo enviado correctamente a:", to);
    } catch (error) {
        console.error("Error enviando el correo:", error);
    }
}

module.exports = sendEmail;
    