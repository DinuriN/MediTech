const tesseract = require("node-tesseract-ocr");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
  executablePath: "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
};

const extractTextFromImage = async (req, res) => {
  try {
    const text = await tesseract.recognize(req.file.path, config);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { extractTextFromImage };
