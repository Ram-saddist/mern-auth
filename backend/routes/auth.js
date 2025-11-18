const express=require("express")
const router=express.Router()
const bcrypt = require("bcrypt")
const User =require("../models/User.js")


router.post("/register",async (req,res)=>{
    const {name,email, password,address,mobile,gender}=req.body

    //check existing user or not
    const existingUser= await User.findOne({email})
    console.log(existingUser)
    if(existingUser){
        return res.status(409).json({"message":"User already exists"})
    }

    const hashedPassword =await bcrypt.hash(password,10)
    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        gender,
        address,
        mobile
    }) 
    await newUser.save()
    res.status(201).json({"message":"User created successfully"})
})

module.exports=router