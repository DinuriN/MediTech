
import { sendPaymentSuccessEmail } from "../middleware/EmailSender.js";
import Payment from "../Models/PaymentModel.js";

//Display part
const getAllPayments = async(req,res,next) =>{//display function

    let payments;

    //Get all users
    try{

        payments=await Payment.find();
    }catch(err) {
        console.log(err);
    }

    //not found

    if(!payments){
        return res.status(404).json({message:"payments not found"})
    }

    //Display all users

    return res.status(200).json({payments});

};

//Data Insert

const addPayments=async(req,res,next) =>{



const {cardNo,holderName,paymentMethod,paymentDate} = req.body;

console.log(req.body);







let payments;

try {
    payments=new Payment( {cardNo,holderName,paymentMethod,paymentDate});
    await payments.save(); //Save the detail in the data base
    await sendPaymentSuccessEmail(req.body.gmail, req.body.name, req.body.appointmentType, req.body.doctorOrScanType);  
    
} catch (err) {
    console.log(err);
}

//If not insert users

if(!payments){
    return res.status(404).send({message :"Unable to add payment"});
}

return res.status(200).json({payments});


};

//Get by Id

const getByPayId = async (req, res, next) => {
    const paymentId = req.params.paymentId; // Ensure param name matches route

    let payment;

    try { 
        payment = await Payment.findById(paymentId);
    } catch (err) {
        console.error("Error fetching payment:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!payment) {
        return res.status(404).send({ message: "Payment not found" });
    }

    return res.status(200).json({ payment });
};


//Update User detail


const UpdatePayment =async(req,res,next) =>{

    const paymentId=req.params.id;
    const {cardNo,holderName,paymentMethod,paymentDate} = req.body;

    let payments;

    try {

        payments =await Payments.findByIdAndUpdate(paymentId ,
        {cardNo :cardNo,holderName :holderName,paymentMethod :paymentMethod,paymentDate:paymentDate});

        payments=await payments.save();
        
    } catch (err) {
        console.log(err);
    }

    if(!payments){
        return res.status(404).send({message :"payments not found"});
    }
    
    return res.status(200).json({payments});
};

const deletePayment=async(req,res,next) => {
    
    const paymentId=req.params.id;

    let payment;

    try {
        payment =await Payment.findByIdAndDelete(paymentId);
        
    } catch (err) {
        console.log(err);
    }

    if(!payment){
        return res.status(404).json({message :"payment not found"});
    }
    
    return res.status(200).json({payment});
    
};

const _getAllPayments = getAllPayments;
export { _getAllPayments as getAllPayments };
const _addPayments = addPayments;
export { _addPayments as addPayments };
const _getByPayId = getByPayId;
export { _getByPayId as getByPayId };
const _UpdatePayment = UpdatePayment;
export { _UpdatePayment as UpdatePayment };
const _deletePayment = deletePayment;
export { _deletePayment as deletePayment };