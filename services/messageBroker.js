const amqp = require("amqplib");
const logger = require("../utils/logger");
const { sendEmail } = require("./emailService");

const connectMessageBroker = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        const channel = await connection.createChannel();
        const queue = "ticket_updates";

        await channel.assertQueue(queue, { durable: true });
        console.log("Connected to RabbitMQ and listening for messages...");

        channel.consume(queue, (message) => {
            const content = JSON.parse(message.content.toString());
            logger.info(`Received message: ${JSON.stringify(content)}`);

            // Send email notification
            sendEmail(content.email, content.message);
            channel.ack(message);
        });
    } catch (err) {
        logger.error("Failed to connect to RabbitMQ:", err.message);
    }
};

module.exports = connectMessageBroker;
