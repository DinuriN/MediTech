const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.processChat = async (req, res) => {
  try {
    const { message, equipmentId } = req.body;
    
    // Get equipment details if provided (keep your existing code)
    let equipmentContext = "";
    if (equipmentId) {
      const Equipment = require('../Models/lab-equipment-model');
      const equipment = await Equipment.findById(equipmentId);
      if (equipment) {
        equipmentContext = `Equipment Type: ${equipment.EquipmentCategory}, Model: ${equipment.EquipmentBrand}, Name: ${equipment.EquipmentName}`;
      }
    }
    
    // Set up the model (Gemini-1.0-pro or Gemini-1.5-flash are good options)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create the prompt with system instructions and user message
    const systemPrompt = `You are a medical lab equipment troubleshooting assistant. Provide helpful, step-by-step guidance to fix equipment issues. ${equipmentContext}`;
    
    const prompt = `${systemPrompt}\n\nUser question: ${message}`;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Send response back to client
    res.status(200).json({
      success: true,
      message: text
    });
    
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      success: false,
      message: "Sorry, I encountered an error. Please try again later."
    });
  }
};
