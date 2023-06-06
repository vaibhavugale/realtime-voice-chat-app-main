import React from 'react'
import styles from "./Rooms.module.css"
import {FcSearch} from "react-icons/fc"
import RoomCard from '../../components/RoomCard/RoomCard'
const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 4,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
];
const Room = () => {
  return (
    <>

      <div className={` ${styles.RoomContainer} container`}>
        <div className={styles.roomsHeader}>
          {/* left section. */}
          <div className={styles.leftSection}>
            <span className={styles.Heading} >
            All voice rooms
            <div className={styles.blueLine}></div>
            </span>
            <div className={styles.inputDiv}>
              <FcSearch size={20} />
              <input type='text' />
            </div>
          </div>
          {/* right section */}
          <div>
           
            <button className={styles.roomButton}>  Start a room</button>
          </div>
        </div>

        <div className={styles.roomList}>
          {
            rooms.map((room)=><RoomCard key={room.id} room={room} />)
          }

        </div>
      </div>
    </>
  )
}

export default Room