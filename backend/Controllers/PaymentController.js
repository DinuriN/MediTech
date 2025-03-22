const Payment = require("../models/PaymentModel"); // Import the Payment model

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find(); // Fetch all payment records from the database
        res.status(200).json(payments); // Return payments with a 200 status
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Add a new payment
const addPayments = async (req, res) => {
    console.log("Received data:", req.body); // Log received request data for debugging

    const { cardNo, holderName, paymentMethod, expires, cvv } = req.body;

    // Check if all required fields are provided
    if (!cardNo || !holderName || !paymentMethod || !expires || !cvv) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Create a new payment record
        const payment = new Payment({ cardNo, holderName, paymentMethod, expires, cvv });
        await payment.save(); // Save payment to the database
        res.status(201).json({ message: "Payment added successfully", payment });
    } catch (err) {
        console.error("Error saving payment:", err); // Log error
        res.status(500).json({ message: "Internal server error" }); // Handle server errors
    }
};

// Get a payment by ID
const getByPayId = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id); // Find payment by ID
        if (!payment) return res.status(404).json({ message: "Payment not found" }); // If not found, return 404
        res.status(200).json(payment); // Return the found payment
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update payment details
        if (!updatedPayment) return res.status(404).json({ message: "Payment not found" }); // If not found, return 404
        res.status(200).json(updatedPayment); // Return updated payment details
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle update errors
    }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id); // Find and delete the payment by ID
        if (!payment) return res.status(404).json({ message: "Payment not found" }); // If not found, return 404
        res.status(200).json({ message: "Payment deleted" }); // Return success message
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Export all functions for use in routes
module.exports = {
    getAllPayments,
    addPayments,
    getByPayId,
    updatePayment,
    deletePayment,
};
