const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labEquipmentSchema = new Schema({
    EquipmentId:{
        type:String,
        required:true,
    },
    EquipmentName:{
        type:String,
        required:true,
    },
    EquipmentCategory:{
        type:String,
        required:true,
    },
    EquipmentBrand:{
        type:String,
        required:true,
    },
    EquipmentSerialNum:{
        type:String,
        required:true,
    },
    EquipmentLocation:{
        type:String,
        required:true,
    },
    EquipmentCost:{
        type:Number,
        required:true,
    },
    EquipmentLastMaintenance:{
        type:Date,
        required:false,
    },
    EquipmentNextMaintenance:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        required:true,
    }


});

module.exports = mongoose.model(
    "lab-equipment-model",
    labEquipmentSchema
)