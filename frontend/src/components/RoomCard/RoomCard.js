import React from "react";
import styles from "./RoomCard.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {FaUserAlt} from "react-icons/fa"

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  
  
  const topicCss = {
    // color:" #34a741",
    
  }
  return (
    <div
      className={styles.roomCardContainer}
      onClick={() => navigate(`/rooms/${room?.id}`)}
    >
      <h1><span style={topicCss}>{room.topic}</span></h1>
      <div className={styles.roomSpeakersInfo}>
        <div className={styles.avatarDiv}>
          {room.speakers.map(
            (speaker, index) =>
              index <= 2 && <FaUserAlt />
          )}
         
        </div>
        <div>
          {room.speakers.map(
            (speaker, index) => index <= 2 && <p key={index}>{speaker.name}</p>
          )}
         
        </div>
      </div>

      <div className={styles.totalPeople}>
        <BsFillPeopleFill />
        {room.totalPeople}
      </div>
    </div>
  );
};

export default RoomCard;
