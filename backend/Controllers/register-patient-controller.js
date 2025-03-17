const Patient = require("../Models/patient-registration-model");

//display data
const getRegisteredPatientDetails = async(req, res, next) =>{

    let patients;
    
    try{        //get patient details
        patients = await Patient.find();
    }catch(err){
        console.log(err);
    }
    
    if(!patients){      //if not found
        return res.status(404).json({message: "No details found"});
    }
    
    return res.status(200).json({patients}); //display patient details

};

//data insert
const addPatient = async(req, res, next) =>{
    const{patientId, name, email, password, contactNo, address} = req.body;

    let patients;
    
    try{
        patients = new Patient({patientId, name, email, password, contactNo, address});
        await patients.save();
    }catch(err){
        console.log(err);
    }

    
    if(!patients){      //insertion error
        return res.status(404).json({message: 'unable to add users'});
    }
    return res.status(200).json({patients})

}

//find patient by id
const getPatientById = async(req, res, next) => {
    const id = req.params.id;

    let patients;

    try{
        patients = await Patient.findById(id);
    }catch(err){
        console.log(err);
    }
     
    if(!patients){      //if not found
        return res.status(404).json({message: 'user not found'});
    }
    return res.status(200).json({patients})
}

//update patient details
const editPatientDetails = async(req, res, next) => {
    const id = req.params.id;

    const{patientId, name, email, password, contactNo, address} = req.body;

    let patients;

    try{
        patients = await Patient.findByIdAndUpdate(id, {patientId: patientId, name: name, email: email, password: password, contactNo: contactNo, address:address});
        patients = await patients.save();
    }catch(err){
        console.log(err);
    }

    //update failed
    if(!patients){
        return res.status(404).json({message: 'cannot update patient details'});
    }
    return res.status(200).json({patients})
}

//delete patient 
const deletePatient = async(req, res, next) => {
    const id = req.params.id;

    let patients;

    try{
        patients = await Patient.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //deletion failed
    if(!patients){
        return res.status(404).json({message: 'cannot delete patient details'});
    }
    return res.status(200).json({patients})
}

exports.getRegisteredPatientDetails = getRegisteredPatientDetails;
exports.addPatient=addPatient;
exports.getPatientById=getPatientById;
exports.editPatientDetails=editPatientDetails;
exports.deletePatient=deletePatient;