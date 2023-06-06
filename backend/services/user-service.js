const userModel = require("../Models/User-model");

class UserServices{
 async  findUser(filter){
    const user = await userModel.findOne(filter);
    return user;
 }
 async createUser(data){
    const user = await userModel.create(data);
    return user;
 }
}

module.exports = new UserServices();