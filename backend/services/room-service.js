const roomModel = require("../Models/room-model");

class RoomServices{
    async create(payload){
         const  {topic,roomType,ownerId} = payload
         const room = await roomModel.create({
            topic,
            roomType,
            ownerId,
            speakers:[ownerId]
         })
     return room;

    }
    async getall(type){
        const rooms = await roomModel.find({roomType:type}).populate('speakers')
        return rooms;
    }
}
module.exports = new RoomServices();