// controllers/notificationController.js
const Notification = require('../models/Notification');

// Function to save notification in the database
const saveNotification = async (req, res) => {
    try {
        const { userId, email, message } = req.body;

        // Create a new notification using the Notification model
        const notification = new Notification({
            userId,
            email,
            message,
            status: 'pending',  // Default status when notification is saved
            createdAt: new Date(),
        });

        // Save the notification to the database
        await notification.save();

        res.status(201).json({ message: 'Notification saved successfully.' });
    } catch (error) {
        console.error('Failed to save notification:', error.message);
        res.status(500).json({ error: 'Failed to save notification.' });
    }
};

const transporter = require("../services/emailService");

async function sendNotificationEmail(req, res) {
  const { email, message } = req.body;

  try {
    await transporter.sendMail({
      from: '"IT Support" <support@example.com>', // Sender address
      to: email,                                  // Recipient address
      subject: "Ticket Update",                  // Subject
      text: message                               // Plain text body
    });

    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
}

module.exports = { saveNotification,
    sendNotificationEmail
 };
