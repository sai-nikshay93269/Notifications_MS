const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const notificationRoutes = require("./routes/notificationRoutes");
const connectMessageBroker = require("./services/messageBroker");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api", notificationRoutes);

// Start RabbitMQ listener
connectMessageBroker();

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
