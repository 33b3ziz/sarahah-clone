const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendEmail } = require('../email/user.email');
module.exports.signUp=async(req,res)=>{
    const {name,email,password,age}=req.body;
    let user=await userModel.findOne({email});
    if(user){
        res.json({message:"user already exist"});
    }else{
        let token=jwt.sign({email},'wael')
        sendEmail({email,token,name})
        bcrypt.hash(password,4,async function(err, hash) {
            await userModel.insertMany({name,email,password:hash,age});
            res.json({message:'signUp done successfully, Please confirm your Email'});
        });
    }
}
module.exports.signIn=async(req,res)=>{
    const {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
        let match=await bcrypt.compare(password,user.password);
        if(match){
            if(user.emailConfirm){
                let token=jwt.sign({id:user._id,name:user.name,emailConfirm:user.emailConfirm},'hash ya basha')
                res.json({message:"signIn done successfully",token})
            }else{
                res.json({message:"please verify you account first"});
            }
        }else{
            res.json({message:"incorrect Password"})
        }
    }else{
        res.json({message:"user dosn't exist"})
    }
}
module.exports.verifyEmail=(req,res)=>{
    const {token}=req.params;
    jwt.verify(token,'wael',async(err,decoded)=>{
        if(err){
            res.json(err);
        }else{
            let user=await userModel.findOne({email:decoded.email});
            if(user){
                await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true});
                res.json({message:'verified'});
            }else{
                res.json({message:"user not found"});
            }
        }
    })
}