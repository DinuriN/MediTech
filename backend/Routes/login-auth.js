const express=require("express");
const jwt = require("jsonwebtoken");
const PatientModelFLogin = require("../Models/register-patient-model");

const router=express.Router();

router.post("/loginForUsers",async(req,res)=>{
    const {email, password}=req.body;

    try{
        const patient=await PatientModelFLogin.findOne({email});
        if(!patient){
            return res.status(400).json({message:"Invalid credentials"});
        }
        if (patient.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token=jwt.sign({id:patient._id},"yourSecretKey", {expiresIn:"1h"});

        res.json({token, patientId: patient.patientId, name:patient.name});
    } catch(error){
        res.status(500).json({message:"Server error"});
    }
});

module.exports=router;