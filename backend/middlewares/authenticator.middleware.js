require("dotenv").config();
const jwt=require("jsonwebtoken");

const authenticator=async(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
            jwt.verify(token, process.env.key,(err, decoded)=>{
                if(decoded){
                    req.body.userID=decoded.userID;
                    req.body.userRole=decoded.userRole;
                    next();
                }else{
                    res.status(404).json({"msg":"Please login first!!"});
                }
              });
        }else{
            res.status(403).json({"msg":"please login first"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":"something went wrong with authentication"});
    }
}

module.exports={
    authenticator
}
