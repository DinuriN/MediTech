const Payment = require("../Models/PaymentModel.js");
const Appointment = require("../Models/ConsultationModel.js");

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('appointment');
        return res.status(200).json({ payments });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching payments" });
    }
};

// Add a new payment
const addPayments = async (req, res) => {
    try {
        const { cardNo, holderName, paymentMethod, expires, cvv, appointmentId } = req.body;

        // Validate required fields
        if (!cardNo || !holderName || !paymentMethod || !expires || !cvv || !appointmentId) {
            return res.status(400).json({ message: "All fields and appointmentId are required" });
        }

        // Check if appointment exists
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Create payment
        const payment = new Payment({
            cardNo,
            holderName,
            paymentMethod,
            expires,
            cvv,
            appointment: appointmentId,
            amount: 2000,
        });
        await payment.save();

        // Update appointment
        appointment.payment = payment._id;
        appointment.status = 'confirmed';
        await appointment.save();

        return res.status(201).json({ 
            success: true,
            payment,
            appointment 
        });
    } catch (err) {
        console.error('Error creating payment:', err);
        return res.status(500).json({ 
            success: false,
            message: "Error creating payment",
            error: err.message 
        });
    }
};

// Get a payment by ID
const getByPayId = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId).populate('appointment');
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ payment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching payment" });
    }
};

// Update a payment
const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('appointment');
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ payment: updatedPayment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating payment" });
    }
};

// Delete a payment
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Update associated appointment
        const appointment = await Appointment.findById(payment.appointment);
        if (appointment) {
            appointment.payment = null;
            appointment.status = 'pending';
            await appointment.save();
        }

        await Payment.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Payment deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting payment" });
    }
};

module.exports = {
    getAllPayments,
    addPayments,
    getByPayId,
    updatePayment,
    deletePayment
};