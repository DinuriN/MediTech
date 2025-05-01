const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();


const sendPdfEmail = async (req, res) => {
  const { email } = req.body;
  const pdfPath = req.file.path;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Order Details PDF",
    text: "Please find your order details PDF attached.",
    attachments: [{ filename: "order-details.pdf", path: pdfPath }],
  };

  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(pdfPath);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
};

module.exports = { sendPdfEmail };
