
const otpService = require("../services/Otp-services")
const hashService = require("../services/hash-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const UserDto = require('../dtos/user-dto');
const mailBody = require("../template/otp-template")
const mailSender = require("../utils/mailSender");
class AuthController{
   async sendOtp(req,res){

    const {email} = req.body;
    const otp = await otpService.generateOtp();

    // for How much time otp is valid ttl(time to live)
    const ttl = 1000*60*60*60 // 5min
    const expires = Date.now()+ttl; //on which time it will expires
    const hashData = `${email}.${otp}.${expires}`
    const hash = hashService.generateHash(hashData);

    try{
      await mailSender(email,mailBody(otp))
      return res.json({
        hash:`${hash}.${expires}`,
        email,
        otp

      })
    }
    catch(err){
      console.log(err)
      res.status(400).send("Something wrong while sending otp!!!")
    }
    res.status(200).json({hash:hash})
    
  }
  async verifyOtp(req,res){
    const {email,otp,hash} = req.body;
    if(!otp || !hash || !email){
      return res.status(400).json({
        message:"ALl field require"
      })
    }
    // Spilt  the hash to extract expire time
    const [hashOtp,expires]=hash.split('.');
    if(Date.now() > +expires){
      return  res.status(400).json({
        message:"Otp expire"
      })
    }
    const data = `${email}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashOtp,data) ;
    if(!isValid){
      return  res.status(400).json({message:"Invalid Otp"})
    }
    let user ;
    // let accessToken;
    // let refreshToken;

    //Check user is Register or Not
     try{
      user = await userService.findUser({email})  // key or value is same the we can write onces

      if(!user){
        // Creating user  
        user = await userService.createUser({email});
      }
    }catch(err){
      console.log("error in Create user",err);
      res.status(500).json({
        message:"Db error"
      })
    }

    // JWT Token (json web token )
    const {accessToken,refreshToken}=  tokenService.generateToken({
      _id:user._id,
      activated:false
    });
    tokenService.storeRefreshToken(refreshToken,user._id);
    res.cookie('refreshToken',refreshToken,{
      maxAge:1000*60*60*24*30,
      httpOnly:true,
      secure: true,
      
    })

    res.cookie('accessToken',accessToken,{
      maxAge:1000*60*60*24*30,
      httpOnly:true,
      secure: true,
      
    })
    const userDto = new UserDto(user);

    return res.status(200).json({
    user:userDto,
    auth:true
    })

   }
   async refresh(req,res){
    try{
      // get refresh token 
      const {refreshToken: refreshTokenFromCookies} = req.cookies;
      if(!refreshTokenFromCookies){
        return res.status(404).json({
          success:false,
          message:"Token not found"
        })
      }
      
      // verify token     
      let userData;
      try{
        
       userData = await  tokenService.verifyRefreshToken(refreshTokenFromCookies);


      }catch(err){
        console.log(err)
       return  res.status(401).json({
          success:false,
          message:"Token invalid ..."
        })
      }
     
      try {
        const token = await tokenService.findRefreshToken(
            userData._id,
            refreshTokenFromCookies
        );
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal error' });
    }
     
      const user = await userService.findUser({_id:userData._id})
      if(!user){
        return res.status(404).json({
          success:false,
          message:"User not found ..."
        })
      }
    // generate new token
   const{ refreshToken,accessToken}= tokenService.generateToken({_id:userData._id})
    // update refresh token

    
    try{
      await tokenService.updateRefreshToken(userData._id,refreshToken);

    }catch(err){
      return res.status(500).json({
        success:false,
        message:"Can't update refresh token"
      })

    }
    // add in cookies
    res.cookie('refreshToken',refreshToken,{
      maxAge:1000*60*60*24*30,
      httpOnly:true,
    })

    res.cookie('accessToken',accessToken,{
      maxAge:1000*60*60*24*30,
      httpOnly:true,
    })

    const userDto = new UserDto(user);

    return res.status(200).json({
    user:userDto,
    auth:true
    })
    }catch(err){
      console.log(err)
      console.log("Error while refreshing token...")
      res.status(500).json({
        success:false,
        message:"Error in refresh controller"
      })
    }

   }

   async  logout (req,res){
    try{
       //refresh token
     const {refreshToken} = req.cookies;
     // delete token 
     await tokenService.deleteToken(refreshToken)
     // delete cookies
     res.clearCookie('refreshToken')
     res.clearCookie('accessToken')
     res.json({
      user:null,
      isAuth:false,
      
     })
    }catch(err){
      console.log(err);
      res.json({
        success:false,
        message:"error while logout "
      })
    }

   }

}

module.exports = new AuthController(); 