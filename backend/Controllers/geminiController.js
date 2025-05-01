// geminiController.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load your API key from environment variable or config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // ✅ Correct

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Correct

// Define the function
exports.checkInteraction = async (req, res) => {
  try {
    const { drugs } = req.body;

    const prompt = `Check for possible interactions between these drugs: ${drugs}`;

    const result = await model.generateContent(prompt); // ✅ Correct usage
    const response = await result.response;
    const text = response.text();

    res.json({ interactionDetails: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate content using Gemini API" });
  }
};
