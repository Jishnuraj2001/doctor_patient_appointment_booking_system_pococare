const express=require("express");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const{Usermodel}=require("../models/user.model");


userRouter.post("/register",async(req,res)=>{
    const{name,email,password,role,location,doctor_specialization}=req.body;
    try {
        const checker=await Usermodel.findOne({email});
        if(checker){
            res.status(202).json({"msg":`${role} already exsits with same email`});
        }else{
            bcrypt.hash(password,7,async(err, hash)=>{
                if(hash){
                    const user=new Usermodel({name,email,password:hash,role,location,doctor_specialization:doctor_specialization||"None"});
                    await user.save();
                    res.status(201).json({"msg":`${role} registration successful`});
                }else{
                    res.status(400).json({"msg":"unable to hash password"});
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"something went wrong while registering"})
    }
})



userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await Usermodel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password,async(err, result)=>{
                if(result == true){
                    const token = jwt.sign({userID:user._id,userRole:user.role},process.env.key);
                    res.status(201).json({"msg":"login successful.","token":token});
                }else{
                    res.status(404).json({"msg":"wrong password,please enter the correct password"});
                }
            });
        }else{
            res.status(404).json({"msg":"wrong email,please enter the correct email"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"something went wrong while login"})
    }
})


userRouter.get("/alluser",async(req,res)=>{
    try {
        const users=await Usermodel.find();
        res.status(200).json({"msg":"alluser are here","data":users});
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":"unable to fetch users"});
    }
})



module.exports={
    userRouter
}

