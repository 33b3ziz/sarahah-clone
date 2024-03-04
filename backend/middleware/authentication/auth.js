var jwt = require('jsonwebtoken');
module.exports.auth=(req,res,next)=>{
    let token=req.headers['token'];
    jwt.verify(token,'hash ya basha',(err,decoded)=>{
        if(err){
            res.json({err});
        }else{
            req.id=decoded.id;
            next();
        }
    })

}