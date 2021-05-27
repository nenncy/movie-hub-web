const express = require('express');
const router = express.Router();
const {requireLogin} =require('../middleware/auth');
const User=require('../models/user.model');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');


require('dotenv').config();

//Registeruser


router.post('/register', async(req,res)=>{
    const {name,email,password}=req.body
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({error:"User already exist"});

        }
        const hashed_pass=await bcrypt.hash(password,10)
        user=new User({
            name,
            email,
            password:hashed_pass
        });
        await user.save();
        return res.status(200).json({message:"User created succesfully"});
    
    }catch(err)
    {
        console.log(err);
    }
});

//login user

router.post('/login',async (req,res)=>{

    const {email,password}=req.body
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"invalid credential"})
        }
        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(400).json({error:"invalid credential"})
        } 
        
         const token=jwt.sign({_id:user._id,email:user.email}, process.env.KEY,
            {
                expiresIn:"1h"
            });
            console.log(token);
       
            return res.json({token});
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                Userid:user._id
              });
            localStorage.setItem("token",token);
    }
    catch(err){
      console.log(err);
    }
});

//cookies




//middleware
router.get('/', requireLogin,async(req,res)=>{
    console.log(req.user);
    try{

        const user= await User.findById(req.user._id)
        res.json(user);
    }catch(err)
    {
        console.log(err);
    }
})
router.get('/movies', requireLogin,async(req,res)=>{
    console.log(req.user);
    try{

        const user= await User.findById(req.user._id)
        res.json(user);
    }catch(err)
    {
        console.log(err);
    }
})

module.exports=router;