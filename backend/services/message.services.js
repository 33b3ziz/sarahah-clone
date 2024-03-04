const messageModel=require('../models/message.model')
module.exports.addMessage=async(req,res)=>{
    const {userId,content}=req.body;
    await messageModel.insertMany({userId,content});
    res.json({message:"message was added successfully"})
}
module.exports.getMessages=async(req,res)=>{
    const userId=req.id
    let messages=await messageModel.find({userId},{content:1,_id:0});
    res.json({messages});
}