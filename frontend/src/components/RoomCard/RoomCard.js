import React from 'react'
import styles from "./RoomCard.module.css"
import {BsFillPeopleFill} from "react-icons/bs"

const RoomCard = ({room}) => {
  return (
    <div className={styles.roomCardContainer}>
    <h3>{room.topic}</h3>
    <div>
        {
            room.speakers.map((speaker)=>{
                return <p>

                {speaker.name}
                     
                </p>
            })
        }
    </div>

    <div className={styles.totalPeople}>
        <BsFillPeopleFill/>
        {room.totalPeople}
    </div>

    </div>
  )
}

export default RoomCard