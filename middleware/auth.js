const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

require('dotenv').config();
//authentication
exports.requireLogin=(req,res,next)=>{
    try{
        if(req.headers.authorization){
            const token=req.headers.authorization.split(' ')[1]
            //verify
            const decode=jwt.verify(token,process.env.KEY)
            var userId = decode._id; 
            console.log(userId);
            const rootUser = User.findOne({ _id:user._id, "token": token });
             if(!rootUser) { throw new Error('User not found') }
            //attach token
            req.user=decode;
            req.user=rootUser;
          next();
        }
        else{
            return res.status(400).json({message:"unauthorized"});
        }

    }catch(err)
    {
        console.log(err);
    }
}