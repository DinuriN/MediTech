import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderViewMore.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function OrderViewMore() {
  const [orderBrief, setOrderBrief] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();
  const [paymentAmount, setPaymentAmount] = useState("");

  useEffect(() => {
    const fetchOrderBrief = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/onlinePharmacy/${id}`);
        console.log("API Response:", response.data); // Check what the API returns
        setOrderBrief(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderBrief();
  }, [id]);

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    const images = element.querySelectorAll("img");
  
    // Ensure all images are loaded
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY // optional: avoids scroll issues
    });
  
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
  
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Order-${orderBrief.orderId}.pdf`);
  };


  const generateAndSendPDF = async (orderBrief, userEmail) => {
    const doc = new jsPDF();
  
    // Set Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("MediTech Health Care Center", 105, 15, { align: "center" });
    doc.setFontSize(14);
    doc.text("Online Pharmacy - Order Invoice", 105, 25, { align: "center" });
  
    // Draw line under header
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30);
  
    // Set default font for content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
  
    let y = 40;
  
    const lineSpacing = 8;
  
    const printLine = (label, value) => {
      doc.text(`${label}:`, 10, y);
      doc.text(`${value}`, 60, y);
      y += lineSpacing;
    };
  
    printLine("Order ID", orderBrief.orderId);
    printLine("Patient Name", orderBrief.patientName);
    printLine("Age", orderBrief.patientAge);
    printLine("Gender", orderBrief.gender);
    printLine("Email", orderBrief.patientEmail);
    printLine("Contact", orderBrief.patientContact);
    printLine("Date of Birth", orderBrief.dateofbirth);
    printLine("Payment Method", orderBrief.paymentMethod);
    printLine("Delivery Address", orderBrief.deliveryAddress);
    printLine("Uploaded Date", orderBrief.uploadedDate);
    printLine("Comments", orderBrief.comments || "N/A");
    printLine("Payment Amount", `LKR ${paymentAmount}`);
  
    // Add footer
    doc.setFontSize(10);
    doc.text("Thank you for choosing MediTech Health Care Center", 105, 285, {
      align: "center",
    });
 
    const pdfBlob = doc.output("blob");
  
    const formData = new FormData();
    formData.append("pdfFile", pdfBlob, "order-details.pdf");
    formData.append("email", userEmail);
  
    try {
      await axios.post("http://localhost:5000/onlinePharmacy/send-pdf-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Email sent successfully!");
    } catch (error) {
      alert("Failed to send email.");
      console.error("Error:", error);
    }
  };

  if (!orderBrief) {
    return <div>Loading...</div>;
  }

  const {
    orderId,
    patientName,
    patientAge,
    gender,
    patientEmail,
    patientContact,
    dateofbirth,
    prescriptionFile,
    paymentMethod,
    deliveryAddress,
    uploadedDate,
    comments
  } = orderBrief;

  return (
    <div className="container">
      <br />
      <hr />
      <h2 style={{ color: 'green', fontSize: '24px', marginTop: '20px' }}>
        Order ID: {orderId || 'N/A'}
      </h2>
      <hr />
      <div className="prescription" ref={pdfRef}>
        <div className="pres">
          <img
            src={`http://localhost:5000${prescriptionFile}`}
            alt={patientName}
            className="img-fluid"
            onError={(e) => e.target.src = "http://localhost:5000/uploads/order-prescription-files/default-prescription.png"} // Fallback image
          />
        </div>
        <p><strong>Patient Age:</strong> {patientAge}</p>
        <p><strong>Patient Gender:</strong> {gender}</p>
        <p><strong>Patient Email:</strong> {patientEmail}</p>
        <p><strong>Patient Contact:</strong> {patientContact}</p>
        <p><strong>Patient date of birth:</strong> {dateofbirth}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
        <p><strong>Uploaded Date:</strong> {uploadedDate}</p>
        <p><strong>Comments:</strong> {comments}</p>
        <label htmlFor="paymentAmount"><strong>Payment Amount (LKR):</strong></label>
    <input
        type="number"
        id="paymentAmount"
        className="form-control"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        placeholder="Enter payment amount"
    />
        <div className="mt-3">
          
          <button className="btn btn-secondary" onClick={handleDownloadPDF}>
              Download PDF
          </button><br/>
          <button
            className="btn btn-secondary"
            onClick={() => generateAndSendPDF(orderBrief, patientEmail, paymentAmount)}
          >
              Send Invoice PDF via Email
          </button><br/>

          <button className="btn btn-secondary" onClick={() => navigate("/order-details")}>
              Back
          </button>
        </div>


      </div>
      
    </div>
  );
}

export default OrderViewMore;