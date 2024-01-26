const tokenService = require("../services/token-service");

module.exports = async function(req,res,next){
    try{
        const { accessToken } = req.cookies;
        // console.log(userData)
     


        // console.log(accessToken)
      

        if(!accessToken){
          
            throw new Error("Authentication failed !!!.");
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        // res.send(accessToken,userData)
        // console.log(userData)
        if (!userData) {
            throw new Error("user not found");
        }
        req.user = userData;
        next();
    }catch(err){
     console.log(err)
     res.status(401).json({success:false,message:err.message})
    // res.send(accessToken)
    }
 
}