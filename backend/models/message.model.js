const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    content:String,
    userId:mongoose.SchemaTypes.ObjectId
})

module.exports=mongoose.model('message',schema)