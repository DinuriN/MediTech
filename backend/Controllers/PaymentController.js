const Payment = require('../models/PaymentModel');  // Assuming a Mongoose model

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new payment
const addPayments = async (req, res) => {
    const { cardNo, holderName, paymentMethod, expires, cvv } = req.body;

    console.log('Received data:', req.body); // Log received data to debug

    let payment;

    try {
        payment = new Payment({ cardNo, holderName, paymentMethod, expires, cvv });
        await payment.save();  // Save the details in the database
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

    // If not inserted
    if (!payment) {
        return res.status(404).send({ message: "Unable to add payment" });
    }

    return res.status(201).json({ message: "Payment added successfully", payment });
};

// Get a payment by ID
const getByPayId = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(updatedPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json({ message: 'Payment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPayments,
    addPayments,
    getByPayId,
    updatePayment,
    deletePayment,
};