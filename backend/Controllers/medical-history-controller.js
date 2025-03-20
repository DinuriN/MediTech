const MedicalHistory = require("../Models/medical-history-model");

//data display
const getMedicalHistoryDetails = async(req, res, next)=>{
    let medicalHistory;
    //get medical history details
    try{
        medicalHistory = await MedicalHistory.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!medicalHistory){
        return res.status(404).json({message: "No details found"});
    }
    //display medical history details
    return res.status(200).json({medicalHistory});
}

//data insert
const addMedicalHistory = async(req, res, next)=>{
    const{patientId, appointmentDate, department, doctor, diagnoses, requiredReports, comments} = req.body;

    let medicalHistory;

    try{
        medicalHistory = new MedicalHistory({patientId, appointmentDate, department, doctor, diagnoses, requiredReports, comments});
        await medicalHistory.save();
    }catch(err){
        console.log(err);
    }

    //insertion error
    if(!medicalHistory){
        return res.status(404).json({message: "unable to update records"});
    }
    return res.status(200).json({medicalHistory});
}

//get by id
const getmedicalHistoryById = async(req, res, next) => {
    const id = req.params.id;

    let medicalHistory;

    try{
        medicalHistory = await MedicalHistory.findById(id);
    }catch(err){
        console.log(err);
    }

    //not found
    if(!medicalHistory){
        return res.status(404).json({message: 'user not found'});
    }
    return res.status(200).json({medicalHistory})
}

//update medical history details
const updatemedicalHistory = async(req, res, next) =>{
    const id = req.params.id;
    const{patientId, appointmentDate, department, doctor, diagnoses, requiredReports, comments} = req.body;

    let medicalHistory;

    try{
        medicalHistory = await MedicalHistory.findByIdAndUpdate(id, {patientId: patientId, appointmentDate: appointmentDate, department: department, doctor: doctor, diagnoses:diagnoses, requiredReports: requiredReports, comments: comments});
        medicalHistory = await medicalHistory.save();
    }catch(err){
        console.log(err);
    }

    //update failed
    if(!medicalHistory){
        return res.status(404).json({message: 'unable to update records'});
    }
    return res.status(200).json({medicalHistory});
    
}

//delete medical history records
const deletemedicalHistory = async(req, res, next) =>{
    const id = req.params.id;

    let medicalHistory;

    try{
        medicalHistory = await MedicalHistory.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //delete failed
    if(!medicalHistory){
        return res.status(404).json({message: 'unable to delete records'});
    }
    return res.status(200).json({message: 'Medical history deleted successfully'});
 
}

exports.getMedicalHistoryDetails = getMedicalHistoryDetails;
exports.addMedicalHistory = addMedicalHistory;
exports.getmedicalHistoryById = getmedicalHistoryById;
exports.updatemedicalHistory = updatemedicalHistory;
exports.deletemedicalHistory = deletemedicalHistory;