const OnlinePharmacy = require("../Models/online-pharmacy-model");

//data dispaly
const getOnlinePharamcyDetails = async(req, res, next)=>{
    let onlinePharmacy;

    //get Online Pharmacy details
    try{
        onlinePharmacy = await OnlinePharmacy.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!onlinePharmacy){
        return res.status(404).json({message: "No details found"});
    }

    //display online pharmacy details
    return res.status(200).json({onlinePharmacy});

};

//data insert
const addPharmacyOrder = async(req, res, next)=>{

    const{patientName,patientAge,gender,patientEmail,patientContact,prescriptionFile,paymentMethod,deliveryAddress,uploadedDate,comments} = req.body;

    let onlinePharmacy;

    try{
        onlinePharmacy = new OnlinePharmacy({patientName,patientAge,gender,patientEmail,patientContact,prescriptionFile,paymentMethod,deliveryAddress,uploadedDate,comments});
        await onlinePharmacy.save();
    }catch (err){
        console.log(err);
    }

    //not insert orders
    if(!onlinePharmacy){
        return res.status(404).json({message: "Unable to place orders"});
    }
    return res.status(200).json({onlinePharmacy});

};

//Get by Id
const getOrderById = async (req, res,next) =>{

    const id = req.params.id;

    let onlinePharmacy;

    try{
        onlinePharmacy = await OnlinePharmacy.findById(id);
    }catch (err){
        console.log(err);
    }

    if(!onlinePharmacy){
        return res.status(404).json({message: "Order could not found"});
    }
    return res.status(200).json({onlinePharmacy});
}

//Update order details
const updatePharmacyOrder = async(req, res, next) =>{

    const id = req.params.id;

    const{patientName,patientAge,gender,patientEmail,patientContact,prescriptionFile,paymentMethod,deliveryAddress,uploadedDate,comments} = req.body;

    let onlinePharmacy;

    try{
        onlinePharmacy = await OnlinePharmacy.findByIdAndUpdate(id,
        {patientName: patientName ,patientAge:patientAge ,gender: gender,patientEmail:patientEmail ,patientContact:patientContact ,prescriptionFile:prescriptionFile ,paymentMethod:paymentMethod ,deliveryAddress:deliveryAddress ,uploadedDate:uploadedDate ,comments:comments});
    }catch(err){
        console.log(err);
    }
    if(!onlinePharmacy){
        return res.status(404).json({message: "Order could not found"});
    }
    return res.status(200).json({onlinePharmacy});

};

//Delete user details
const deletePharmacyOrder = async(req, res, next) =>{

    const id = req.params.id;

    let onlinePharmacy;

    try{
        onlinePharmacy = await OnlinePharmacy.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!onlinePharmacy){
        return res.status(404).json({message: "Unable to delete order details"});
    }
    return res.status(200).json({onlinePharmacy});
}

exports.getOnlinePharamcyDetails = getOnlinePharamcyDetails;
exports.addPharmacyOrder = addPharmacyOrder;
exports.getOrderById = getOrderById;
exports.updatePharmacyOrder = updatePharmacyOrder;
exports.deletePharmacyOrder = deletePharmacyOrder;
