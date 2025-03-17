import Patient from "../Models/ConsultationModel.js";

//Display part
const getAllPatients = async(req,res,next) =>{//display function

    let patients;

    //Get all users
    try{

        patients=await Patient.find();
    }catch(err) {
        console.log(err);
    }

    //not found

    if(!patients){
        return res.status(404).json({message:"patients not found"})
    }

    //Display all users

    return res.status(200).json({patients});

};

//Data Insert

const addPatients=async(req,res,next) =>{

const {name,gmail,age,contact,address,appointmentType,doctorOrScanType} = req.body;

let patients;

try {
    patients=new Patient( {name,gmail,age,contact,address,appointmentType,doctorOrScanType});
    await patients.save(); //Save the detail in the data base
    
} catch (err) {
    console.log(err);
}

//If not insert users

if(!patients){
    return res.status(404).send({message :"Unable to add patients"});
}

return res.status(200).json({patients});


};

//Get by Id

const getById =async(req,res,next) =>{

    const id=req.params.id;

    let patient;

    try { 
        patient = await Patient.findById(id);
        
    } catch (err) {
        console.log(err);
    }

    //If not available id

if(!patient){
    return res.status(404).send({message :"patient not found"});
}

return res.status(200).json({patient});

};


//Update User detail


const UpdatePatient =async(req,res,next) =>{

    const id=req.params.id;
    const {name,gmail,age,contact,address,appointmentType,doctorOrScanType} = req.body;

    let patients;

    try {

        patients =await Patient.findByIdAndUpdate(id ,
        {name :name,gmail :gmail,age :age,contact:contact,address :address,appointmentType:appointmentType,doctorOrScanType:doctorOrScanType});

        patients=await patients.save();
        
    } catch (err) {
        console.log(err);
    }

    if(!patients){
        return res.status(404).send({message :"patient not found"});
    }
    
    return res.status(200).json({patients});
};

const deletePatient =async(req,res,next) => {
    
    const id=req.params.id;

    let patient;

    try {
        patient =await Patient.findByIdAndDelete(id);
        
    } catch (err) {
        console.log(err);
    }

    if(!patient){
        return res.status(404).json({message :"patient not found"});
    }
    
    return res.status(200).json({patient});
    
};



const _getAllPatients = getAllPatients;
export { _getAllPatients as getAllPatients };
const _addPatients = addPatients;
export { _addPatients as addPatients };
const _getById = getById;
export { _getById as getById };
const _UpdatePatient = UpdatePatient;
export { _UpdatePatient as UpdatePatient };
const _deletePatient = deletePatient;
export { _deletePatient as deletePatient };