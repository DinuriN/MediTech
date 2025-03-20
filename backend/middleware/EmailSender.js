const nodemailer = require('nodemailer');

// Create a transporter with SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-app-password', // Replace with your Gmail app password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendPaymentSuccessEmail(userEmail, name, appointmentType, doctorOrScanType) {
  console.log('Sending email to:', userEmail);

  const mailOptions = {
    from: 'MediTec PVT <your-email@gmail.com>', // Your email address
    to: userEmail,
    subject: `✅ Payment Successful for ${appointmentType || 'your appointment'}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
        <div style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #28a745;">✅ Payment Successful</h2>
          <p style="font-size: 16px;">Dear <b>${name}</b>,</p>
          <p style="font-size: 16px;">We have received your payment for <b>${appointmentType || 'N/A'}</b> - <b>${doctorOrScanType || 'N/A'}</b>.</p>
          <p style="font-size: 16px;">Your appointment is confirmed. We look forward to serving you.</p>
          <hr>
          <p style="font-size: 14px; color: gray;">If you have any questions, please contact our support Team.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Payment success email sent to ${userEmail}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

// Export the function to use in other parts of the application
module.exports = { sendPaymentSuccessEmail };
