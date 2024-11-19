const nodemailer = require("nodemailer");
const logger = require("../utils/logger");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set true for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // App password goes here
    },
});

module.exports = transporter;



const sendEmail = async (to, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Ticket Update Notification",
            text: message,
        });
        logger.info(`Email sent to ${to}: ${message}`);
    } catch (err) {
        logger.error(`Failed to send email to ${to}: ${err.message}`);
    }
};

module.exports = { sendEmail };
