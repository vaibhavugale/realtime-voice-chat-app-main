const mongoose = require("mongoose");



const roomSchema = mongoose.Schema(
  {
   topic:{type:String , required:true},
   userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
   roomType:{type:String,require:true},
   speakers:[{type:mongoose.Schema.Types.ObjectId,ref:"User",require:false}]
    
   
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Room',roomSchema,'Room');