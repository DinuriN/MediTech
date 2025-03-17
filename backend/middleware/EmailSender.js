import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "chamodkalhara144@gmail.com", // Your email
    pass: "oacu jnjo dxsz pwjp", // Your app password
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export  async function sendPaymentSuccessEmail(userEmail, name, appointmentType, doctorOrScanType) {

  console.log("Sending email to:", userEmail);
  console.log("Appointment Type:", appointmentType);
  console.log("Doctor/Scan Type:", doctorOrScanType);
  const mailOptions = {
    from: "MediTec PVT", // Use the same email as the sender for consistency
    to: userEmail,
    subject: `✅ Payment Successful for ${appointmentType}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
        <div style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #28a745;">✅ Payment Successful</h2>
          <p style="font-size: 16px;">Dear <b>${name}</b>,</p>
          <p style="font-size: 16px;">We have received your payment for <b>${appointmentType}</b> - <b>${doctorOrScanType}</b>.</p>
          <p style="font-size: 16px;">Your appointment is confirmed. We look forward to serving you.</p>
          <hr>
          <p style="font-size: 14px; color: gray;">If you have any questions, please contact our support.</p>
        </div>
      </div>
    `,
  };
  
  

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Payment success email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

export async function sendOrderConfirmationEmail(userEmail, name, appointmentType, doctorOrScanType) {
  console.log("Sending email to:", userEmail);
  console.log("Appointment Type:", appointmentType);
  console.log("Doctor/Scan Type:", doctorOrScanType);
  const mailOptions = {
    from: "bandarasumith326@gmail.com",
    to: userEmail,
    subject: `🛒 Order Confirmed for ${appointmentType}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
        <div style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #007bff;">🛒 Order Confirmed</h2>
          <p style="font-size: 16px;">Dear <b>${name}</b>,</p>
          <p style="font-size: 16px;">Your order for <b>${appointmentType}</b> - <b>${doctorOrScanType}</b> has been successfully placed.</p>
          <p style="font-size: 16px;">We will notify you with further details soon.</p>
          <hr>
          <p style="font-size: 14px; color: gray;">If you have any questions, please contact support.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Order confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}
