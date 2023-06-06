
const crypto = require("crypto")
const hashService = require("../services/hash-service")
const smsSid = process.env.SMS_SID;
const smsAuth = process.env.SMS_AUTH_TOKEN;
// const twilio = require('twilio')(smsSid,smsAuth,{
//     lazyLoading:true
// })

class OtpServices {
   async generateOtp(){
   const otp = crypto.randomInt(1000,9999);
   return otp;
   }
//    async senOtpBySms(phone,otp){
//    try{
//     return await twilio.messages.create({
//         to:phone,
//         from:process.env.SMS_NUMBER,
//         body:`Your otp is ${otp} , please don't share it`
//     })
//    }
//    catch(err){
//     console.log(err);
//    }
//    }
   verifyOtp(hashOtp,data){
   let computedHash = hashService.generateHash(data);
    return  computedHash==hashOtp ;

   }
}
module.exports = new OtpServices();