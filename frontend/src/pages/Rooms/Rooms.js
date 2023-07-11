import React, { useEffect, useState } from 'react'
import styles from "./Rooms.module.css"
import {FcSearch} from "react-icons/fc"
import RoomCard from '../../components/RoomCard/RoomCard'
import AddRoomModel from '../../components/AddRoomModel/AddRoomModel'
import { getAllRooms } from '../../http'



const Room = () => {
  
  const [showModel,setShowModel] = useState(false)
  const [rooms,setRooms]= useState([])
  // console.log("dirname:",__dirname)
 const fetch =  async  () =>{
  const {data} = await getAllRooms();
  setRooms(data)
      
  } 
  useEffect(()=>{
    fetch();
  },[])
  function handelClose(){
    setShowModel(false)
  }
  function handelStartRoom(){
    setShowModel((prve)=>!prve)
  }
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
           
            <button className={styles.roomButton}  onClick={handelStartRoom}>  Start a room</button>
          </div>
        </div>

        <div className={styles.roomList}>
          {
            rooms.map((room)=><RoomCard key={room.id} room={room} />)
          }

        </div>
       
      </div>
      {showModel &&  <AddRoomModel handelClose={handelClose}  />}
    </>
  )
}

export default Room