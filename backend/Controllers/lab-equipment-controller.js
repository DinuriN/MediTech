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
    let labEquipment;

    try{
        labEquipments = new labEquipments({EquipmentId, EquipmentName, EquipmentCategory, EquipmentBrand, EquipmentSerialNum, EquipmentLocation, EquipmentCost, EquipmentLastMaintenance, EquipmentNextMaintenance, status});
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


exports.getAllLabEquipments = getAllLabEquipments;
exports.addLabEquipment = addLabEquipment;