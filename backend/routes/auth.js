const express=require("express")
const router=express.Router()
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
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

router.post("/login",async (req,res)=>{
    const {email,password}= req.body
    const user=await User.findOne({email})
    if(!user)
        return res.status(400).json({"message":"user not found"})
    //compare passsword
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        return res.status(400).json({"message":"Pasword is invalid"})
    const token= jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )
    res.status(200).json({"message":"User identified",token})
})
module.exports=router