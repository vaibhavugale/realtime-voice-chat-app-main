const crypto = require("crypto")


class HashService{
    generateHash(data){
     // generating hash for otp 
    return  crypto.createHmac('sha256',`${process.env.HASH_KEY}`)  
     .update(data) //data--> hashData
     .digest('hex') // that data in buffer so , we are converting that in string i.e hex type
    }

}
module.exports = new HashService();