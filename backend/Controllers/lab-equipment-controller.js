const labEquipment = require("../Models/lab-equipment-model");

//display
const getAllLabEquipments = async(req, res, next) => {
    let labEquipments;

    try{
        labEquipments = await labEquipment.find();
    }catch(err){
        console.log(err);
    }
    //if not found
    if(!labEquipments){
        return res.status(400).json({message:"lab equipments not found"});
    }

    //display all lab equipments
    return res.status(200).json({labEquipments});
};

//insert
const addLabEquipment = async(req, res, next) => {
    const{EquipmentId, EquipmentName, EquipmentCategory, EquipmentBrand, EquipmentSerialNum, EquipmentLocation, EquipmentCost, EquipmentLastMaintenance, EquipmentNextMaintenance, status} = req.body;
    let labEquipments;

    try{
        labEquipments = new labEquipment({EquipmentId, EquipmentName, EquipmentCategory, EquipmentBrand, EquipmentSerialNum, EquipmentLocation, EquipmentCost, EquipmentLastMaintenance, EquipmentNextMaintenance, status});
        await labEquipments.save();
    }catch(err){
        console.log(err);
    }

    //not insert labEquipments
    if(!labEquipments){
        return res.status(404).send({message:"unable to add lab equipments"});
    }
    return res.status(200).json({labEquipments});


} 

//get by id
const getLabEquipmentById = async(req, res, next) => {
    const id = req.params.id;

    let labEquipments;

    try{
        labEquipments = await labEquipment.findById(id);
    }catch(err){
        console.log(err);
    }
     
    if(!labEquipments){      //if not found
        return res.status(404).json({message: 'lab rquipment not found'});
    }
    return res.status(200).json({labEquipments})
}

//update 
const updateLabEquipmentDetails = async(req, res, next) => {
    const id = req.params.id;

    const{EquipmentId, EquipmentName, EquipmentCategory, EquipmentBrand, EquipmentSerialNum, EquipmentLocation, EquipmentCost, EquipmentLastMaintenance, EquipmentNextMaintenance, status} = req.body;

    let labEquipments;

    try{
        labEquipments = await labEquipment.findByIdAndUpdate(id, 
            {EquipmentId: EquipmentId, EquipmentName: EquipmentName, EquipmentCategory: EquipmentCategory, EquipmentBrand: EquipmentBrand, EquipmentSerialNum: EquipmentSerialNum, EquipmentLocation: EquipmentLocation, EquipmentCost: EquipmentCost, EquipmentLastMaintenance: EquipmentLastMaintenance, EquipmentNextMaintenance: EquipmentNextMaintenance, status: status});
        labEquipments = await labEquipments.save();
    }catch(err){
        console.log(err);
    }

    //update failed
    if(!labEquipments){
        return res.status(404).json({message: 'cannot update lab equipment details'});
    }
    return res.status(200).json({labEquipments})
}

//delete
const deleteLabEquipment = async(req, res, next) => {
    const id = req.params.id;

    let labEquipments;

    try{
        labEquipments = await labEquipment.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //deletion failed
    if(!labEquipments){
        return res.status(404).json({message: 'cannot delete lab equipment details'});
    }
    return res.status(200).json({labEquipments})
}

 



exports.getAllLabEquipments = getAllLabEquipments;
exports.addLabEquipment = addLabEquipment;
exports.getLabEquipmentById = getLabEquipmentById;
exports.updateLabEquipmentDetails = updateLabEquipmentDetails;
exports.deleteLabEquipment = deleteLabEquipment;


