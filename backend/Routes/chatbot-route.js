// backend/Routes/chatbot-route.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../Controllers/chatbot-controller');

// Route for processing chat messages
router.post('/chat', chatbotController.processChat);

module.exports = router;