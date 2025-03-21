const Doctor = require("../Models/doctor-model");

/*{ 
    doctorId,
    doctorName, 
    doctorSpecialization, 
    doctorProfilePicture, 
    doctorPhoneNumber, 
    doctorEmail, 
    doctorQualifications, 
    doctorExperience, 
    doctorLanguagesSpoken, 
    doctorHospitalAffiliation, 
    doctorLicenseNumber, 
    doctorAvailableDays, 
    doctorAvailableTimeStart, 
    doctorAvailableTimeEnd, 
    doctorConsultationFees 
}*/

//data display
const getAllDoctors = async (req, res, next) => {

    let doctors;
    //Get all Doctors
    try{
        doctors = await Doctor.find();
    }catch (err) {
        console.log(err);
    }
    //not found
    if(!doctors){
        return res.status(404).json({message: "Doctor is not found"});
    }
    //Display all Doctors
    return res.status(200).json({ doctors });

};

//Data insert
const addDoctors = async (req, res, next) => {
    const {
        doctorId, doctorName, doctorSpecialization, doctorPhoneNumber, doctorEmail,
        doctorQualifications, doctorExperience, doctorLanguagesSpoken, doctorHospitalAffiliation,
        doctorLicenseNumber, doctorAvailableDays, doctorAvailableTimeStart, doctorAvailableTimeEnd,
        doctorConsultationFees
    } = req.body;

    const doctorProfilePicture = req.body.doctorProfilePicture || ''; // Ensure it's defined

    let doctor;

    try {
        doctor = new Doctor({
            doctorId, doctorName, doctorSpecialization, doctorProfilePicture, doctorPhoneNumber, doctorEmail,
            doctorQualifications, doctorExperience, doctorLanguagesSpoken, doctorHospitalAffiliation,
            doctorLicenseNumber, doctorAvailableDays, doctorAvailableTimeStart, doctorAvailableTimeEnd,
            doctorConsultationFees
        });
        await doctor.save();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    // Check if doctor was created
    if (!doctor) {
        return res.status(400).json({ message: "Unable to add doctor" });
    }
    return res.status(201).json({ doctor });
};


//Get by ID
const getById = async (req, res, next) => {

    const id = req.params.id;

    let doctor;

    try{
        doctor = await Doctor.findById(id);
    } catch (err){
        console.log(err);
    }

    //not available users
    if (!doctor){
        return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ doctor });
};

//Update doctors
// Update doctor
const updateDoctor = async (req, res, next) => {
    const id = req.params.id;

    const {
        doctorId, doctorName, doctorSpecialization, doctorPhoneNumber, doctorEmail,
        doctorQualifications, doctorExperience, doctorLanguagesSpoken, doctorHospitalAffiliation,
        doctorLicenseNumber, doctorAvailableDays, doctorAvailableTimeStart, doctorAvailableTimeEnd,
        doctorConsultationFees
    } = req.body;

    try {
        // Find existing doctor
        let existingDoctor = await Doctor.findById(id);
        if (!existingDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Preserve existing profile picture if no new one is provided
        const doctorProfilePicture = req.body.doctorProfilePicture || existingDoctor.doctorProfilePicture;

        // Update doctor data
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            {
                doctorId, doctorName, doctorSpecialization, doctorProfilePicture, doctorPhoneNumber, doctorEmail,
                doctorQualifications, doctorExperience, doctorLanguagesSpoken, doctorHospitalAffiliation,
                doctorLicenseNumber, doctorAvailableDays, doctorAvailableTimeStart, doctorAvailableTimeEnd,
                doctorConsultationFees
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ doctor: updatedDoctor });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};



//Delete doctor
const deleteDoctor = async (req, res, next) => {

    const id = req.params.id;
    let doctor;

    try{
        doctor = await Doctor.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

    if (!doctor){
        return res.status(404).json({ message: "Unable to delete doctor" });
    }
    return res.status(200).json({ doctor });

};

exports.getAllDoctors = getAllDoctors;
exports.addDoctors = addDoctors;
exports.getById = getById;
exports.updateDoctor = updateDoctor;
exports.deleteDoctor = deleteDoctor;