

const roomModel = require("../Models/room-model");
const roomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");
const RoomService = require("../services/room-service");

class rooms{
    async create(req,res){
        // console.log(req.body)
        const {topic,roomType} = req.body
        if(!topic || !roomType){
            return res.status(400).json({
                success:false,
                message:"All fields required..."
            })}



        // creating room   
        const room = await RoomService.create({
            topic,
            roomType,
            ownerId:req.user._id
        })  
        return res.status(200).json(new roomDto(room))
        }
        async fetch(req,res){
            const result = await roomService.getall('open')
            const allRooms = result .map((room)=>{
               return new roomDto(room)
            })
            return res.status(200).json(allRooms)
        }
      async fetchRoomTopic(req,res){
        // console.log(req.body)
        const {roomID} = req.body;
       
       try{
        // console.log("roomID",roomID)
         // find room in database
         const topic = await roomModel.findOne({_id:roomID})
         
         if(topic){
             return res.status(200).json({
                topic: topic
             })
         }

       }catch(err){
         return res.status(500).json({
            success:false,
            message:err.message
         })
       }
      }
    }

module.exports = new rooms();