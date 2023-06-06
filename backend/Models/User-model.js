const mongoose = require("mongoose");



const userSchema = mongoose.Schema(
  {
    phone: { type: String, required: true },
   name : {type:String ,require: false},
   avatar : {type:String ,require: false},
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
    timestamps: true
}
)

module.exports = mongoose.model('User',userSchema,'usersInfo');