const Appointment = require("../Models/ConsultationModel.js");
const Payment = require("../Models/PaymentModel.js");

// Get all appointments
const getAllAppointments = async (req, res, next) => {  
    try {
        const appointments = await Appointment.find().populate('payment');
        return res.status(200).json({ appointments });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching appointments" });
    }
};

// Add a new appointment
const addAppointments = async (req, res, next) => {
    try {
        console.log('Received request body:', JSON.stringify(req.body, null, 2));

        const { 
            name, gmail, age, contact, appointmentDate, appointmentTime, 
            address, guardianName, appointmentType, doctorOrScanType
        } = req.body;

        console.log('Parsed fields:', {
            name, gmail, age, contact, appointmentDate, appointmentTime, 
            address, guardianName, appointmentType, doctorOrScanType
        });

        // Validate required appointment fields
        if (!name || !gmail || !age || !contact || !appointmentDate || !appointmentTime || 
            !address || !guardianName || !appointmentType || !doctorOrScanType) {
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!gmail) missingFields.push('gmail');
            if (!age) missingFields.push('age');
            if (!contact) missingFields.push('contact');
            if (!appointmentDate) missingFields.push('appointmentDate');
            if (!appointmentTime) missingFields.push('appointmentTime');
            if (!address) missingFields.push('address');
            if (!guardianName) missingFields.push('guardianName');
            if (!appointmentType) missingFields.push('appointmentType');
            if (!doctorOrScanType) missingFields.push('doctorOrScanType');
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Create appointment
        const appointment = new Appointment({ 
            name, 
            gmail, 
            age: parseInt(age),
            contact: parseInt(contact),
            appointmentDate: new Date(appointmentDate),
            appointmentTime, 
            address, 
            guardianName,
            appointmentType, 
            doctorOrScanType,
            status: 'pending'
        });
        await appointment.save();

        return res.status(201).json({ 
            success: true,
            appointment
        });

    } catch (err) {
        console.error('Detailed error:', {
            message: err.message,
            stack: err.stack,
            body: req.body
        });
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: "Validation error",
                error: Object.values(err.errors).map(e => e.message)
            });
        }
        return res.status(500).json({ 
            success: false,
            message: "Error creating appointment",
            error: err.message 
        });
    }
};

// Get an appointment by ID
const getById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('payment');
            
        if (!appointment) {
            return res.status(404).json({ 
                success: false,
                message: 'Appointment not found' 
            });
        }

        return res.status(200).json({ 
            success: true,
            appointment 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false,
            message: "Error fetching appointment",
            error: err.message 
        });
    }
};

// Update an existing appointment
const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true,
                runValidators: true 
            }
        ).populate('payment');

        if (!updatedAppointment) {
            return res.status(404).json({ 
                success: false,
                message: 'Appointment not found' 
            });
        }

        return res.status(200).json({ 
            success: true,
            appointment: updatedAppointment 
        });
    } catch (err) {
        return res.status(400).json({ 
            success: false,
            message: "Error updating appointment",
            error: err.message 
        });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({ 
                success: false,
                message: "Appointment not found" 
            });
        }

        // Delete associated payment
        if (appointment.payment) {
            await Payment.findByIdAndDelete(appointment.payment);
        }

        // Delete appointment
        await Appointment.findByIdAndDelete(req.params.id);

        return res.status(200).json({ 
            success: true,
            message: "Appointment and associated payment deleted successfully" 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false,
            message: "Error deleting appointment",
            error: err.message 
        });
    }
};

// Add payment for an existing appointment
const addPaymentForAppointment = async (req, res) => {
    try {
        const { appointmentId, cardNo, holderName, paymentMethod, expires, cvv } = req.body;

        // Validate required fields
        if (!appointmentId || !cardNo || !holderName || !paymentMethod || !expires || !cvv) {
            return res.status(400).json({ message: "All payment fields and appointmentId are required" });
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
            amount: 2000, // Fixed amount
        });
        await payment.save();

        // Update appointment with payment reference and status
        appointment.payment = payment._id;
        appointment.status = 'confirmed';
        await appointment.save();

        // Send confirmation email
        await sendConfirmationEmail(appointment, payment);

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

// Email sending function
const sendConfirmationEmail = async (appointment, payment) => {
    try {
        const emailContent = {
            to: appointment.gmail,
            subject: 'Appointment Confirmation',
            html: `
                <h2>Appointment Confirmation</h2>
                <p>Dear ${appointment.name},</p>
                
                <h3>Appointment Details:</h3>
                <ul>
                    <li>Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}</li>
                    <li>Time: ${appointment.appointmentTime}</li>
                    <li>Type: ${appointment.appointmentType}</li>
                    <li>Doctor/Scan: ${appointment.doctorOrScanType}</li>
                </ul>
                
                <h3>Payment Details:</h3>
                <ul>
                    <li>Amount: Rs. ${payment.amount}</li>
                    <li>Payment Method: ${payment.paymentMethod}</li>
                    <li>Transaction ID: ${payment._id}</li>
                    <li>Date: ${new Date(payment.paymentDate).toLocaleDateString()}</li>
                </ul>
            `
        };

        // Implement your email sending logic here
        console.log('Email content prepared:', emailContent);
    } catch (err) {
        console.error('Error sending confirmation email:', err);
    }
};

module.exports = {
    getAllAppointments,
    addAppointments,
    getById,
    updateAppointment,
    deleteAppointment,
    addPaymentForAppointment
};