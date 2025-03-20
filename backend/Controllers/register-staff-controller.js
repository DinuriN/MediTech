const Staff = require("../Models/register-staff-models");

//display data
const getRegisteredStaffDetails = async(req, res, next) =>{

    let staffM;
    
    try{       
        staffM = await Staff.find();
    }catch(err){
        console.log(err);
    }
    
    if(!staffM){      
        return res.status(404).json({message: "No details found"});
    }
    
    return res.status(200).json({staffM}); 

};

//data insert
const addStaff = async(req, res, next) =>{
    const{staffId, name, email, password, contactNo, address, role} = req.body;

    let staffM;
    
    try{
        staffM = new Staff({staffId, name, email, password, contactNo, address, role});
        await staffM.save();
    }catch(err){
        console.log(err);
    }

    
    if(!staffM){      //insertion error
        return res.status(404).json({message: 'unable to add users'});
    }
    return res.status(200).json({staffM})

}

//find patient by id
const getStaffById = async(req, res, next) => {
    const id = req.params.id;

    let staffM;

    try{
        staffM = await Staff.findById(id);
    }catch(err){
        console.log(err);
    }
     
    if(!staffM){      //if not found
        return res.status(404).json({message: 'user not found'});
    }
    return res.status(200).json({staffM})
}

//update patient details
const editStaffDetails = async(req, res, next) => {
    const id = req.params.id;

    const{staffId, name, email, password, contactNo, address, role} = req.body;

    let staffM;

    try{
        staffM = await Staff.findByIdAndUpdate(id, {staffId: staffId, name: name, email: email, password: password, contactNo: contactNo, address:address, role:role});
        staffM = await staffM.save();
    }catch(err){
        console.log(err);
    }

    //update failed
    if(!staffM){
        return res.status(404).json({message: 'cannot update staff details'});
    }
    return res.status(200).json({staffM})
}

//delete patient 
const deleteStaff = async(req, res, next) => {
    const id = req.params.id;

    let staffM;

    try{
        staffM = await Staff.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //deletion failed
    if(!staffM){
        return res.status(404).json({message: 'cannot delete staff details'});
    }
    return res.status(200).json({staffM})
}

exports.getRegisteredStaffDetails = getRegisteredStaffDetails;
exports.addStaff=addStaff;
exports.getStaffById=getStaffById;
exports.editStaffDetails=editStaffDetails;
exports.deleteStaff=deleteStaff;