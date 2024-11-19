const express = require("express");
const { saveNotification,sendNotificationEmail } = require("../controllers/notificationController");
const router = express.Router();

// POST /notifications - Save a notification
router.post("/notifications", saveNotification);
router.post("/send-email", sendNotificationEmail);


module.exports = router;