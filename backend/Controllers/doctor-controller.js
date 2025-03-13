const Doctor = require("../Models/doctor-model");

/*{ 
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
    const {name, specialization, profilePicture, phoneNumber, gmail, qualifications, experience, languagesSpoken, hospitalAffiliation, licenseNumber, availableDays, availableTimeStart, availableTimeEnd, consultationFees} = req.body;

    let doctors;

    try{
        doctors = new Doctor({name, specialization, profilePicture, phoneNumber, gmail, qualifications, experience, languagesSpoken, hospitalAffiliation, licenseNumber, availableDays, availableTimeStart, availableTimeEnd, consultationFees});
        await doctors.save();
    }catch (err) {
        console.log(err);
    }

    //not insert doctors
    if (!doctors){
        return res.status(404).json({ message: "unable to add doctors" });
    }
    return res.status(200).json({ doctors });
;}

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
const updateDoctor = async (req, res, next) => {

    const id = req.params.id;
    const {name, specialization, profilePicture, phoneNumber, gmail, qualifications, experience, languagesSpoken, hospitalAffiliation, licenseNumber, availableDays, availableTimeStart, availableTimeEnd, consultationFees} = req.body;

    let doctors;
    try{
        doctors = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }catch (err) {
        console.log(err);
    }
    if (!doctors) {
        return res.status(404).json({ message: "Unable to update doctor details" });
    }
    return res.status(200).json({ doctors });

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