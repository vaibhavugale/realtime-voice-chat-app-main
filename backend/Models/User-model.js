const mongoose = require("mongoose");



const userSchema = mongoose.Schema(
  {
    phone: { type: String, required: true },
   name : {type:String ,require: false},
   avatar : {type:String ,require: false,get:(avatar)=>{

    return `${process.env.BASE_URL}${avatar }`
   }},
    activated: { type: Boolean, required: false, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true
    }
},
{
    timestamps: true,
    toJSON:{getters:true}
}
)

module.exports = mongoose.model('User',userSchema,'usersInfo');