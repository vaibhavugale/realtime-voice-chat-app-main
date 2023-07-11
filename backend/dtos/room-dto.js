class roomDto{
    id;
    roomType;
    ownerId;
    speakers;
    createdAt;
    constructor(room){
        this.id=room._id;
        this.roomType=room.roomType,
        this.topic=room.topic;
        this.ownerId=room.ownerId;
        this.createdAt=room.createdAt;
        this.speakers=room.speakers;


    }

}
module.exports =  roomDto;