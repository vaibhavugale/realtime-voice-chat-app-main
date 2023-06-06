
const jwt = require('jsonwebtoken');
const refreshModel = require('../Models/refresh-model');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService{
    generateToken(payload){
      const accessToken =  jwt.sign(payload,accessTokenSecret,{
        expiresIn:'1h',
    
      })
      const refreshToken =  jwt.sign(payload,refreshTokenSecret,{
        expiresIn:'1y',
      })
      return {accessToken,refreshToken}
    }
   async storeRefreshToken(token,userId){
       try{
        await refreshModel.create({
          token,
          userId
        })

      }catch(err){
        
        console.log("Error in storeRefreshToken",err);
      }
    }
    async findRefreshToken(userId,refreshToken){
    return  await refreshModel.findOne({userId:userId,token:refreshToken})

    }
    async verifyAccessToken(token){
        // console.log(token)
        // token.split(' ')[1];
        return jwt.verify(token,accessTokenSecret);
    }
    async verifyRefreshToken(refreshTokenFromCookies){
    
      return jwt.verify(refreshTokenFromCookies,refreshTokenSecret)

    }
    async updateRefreshToken(userId,refreshToken){
      return await refreshModel.updateOne({_id:userId},{$push:{token:refreshToken}})
       
    }
    async deleteToken(token){
     return  await refreshModel.deleteOne({token:token})

    }
    

}
module.exports = new TokenService();