import Input from "../shared/Input/Input";
import styles from "./AddRoomModel.module.css";
import React, { useRef, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { createRoom } from "../../http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

const AddRoomModel = ({ handelClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const navigate= useNavigate()
  
  function handelInputTopic(e){
    setTopic(e.target.value)
  }
 async  function handelCreateRoom(){
      try{
        if(!topic) {
          toast.error("Topic name required....")
          return;
        }
        const {data} = await createRoom({
          topic,
          roomType
        })
        if(!data){
          toast.error("Fail to create room...")
          
        }
        if(data){
          toast.success("Room created successfully")
          navigate(`/rooms/${data?.id}`)
        }

      }catch(err){
        console.log(err.message)
      }
  }
  return (
    <div className={styles.roomModel}>
      <div className={styles.modelContain}>
        <button className={styles.cancelButton} onClick={handelClose}>
          <FcCancel />
        </button>
        {/* section 1 */}
        <div>
          <p>Enter the topic to be disscussed</p>
          <Input   value={topic} onChange={(e)=>handelInputTopic(e)} />
        </div>
        {/* section 2 */}
        <div className={styles.section2}>
          <p>Room type</p>
          <div className={styles.section2Contain}>
            <div
              className={styles.roomType}
              onClick={() => setRoomType("open")}
            >
              <img src="/images/icon/Globe.png" />
              <p>open</p>
            </div>
            <div
              onClick={() => {
                setRoomType("social");
              }}
              className={styles.roomType}
            >
              <img src="/images/icon/Globe.png" />
              <p>Social</p>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={styles.roomType}
            >
              <img src="/images/icon/Globe.png" />
              <p>Private </p>
            </div>
          </div>
        </div>
        {/* section 3 */}

        <div>
          <p>Start a room, open to everyone</p>
          <button onClick={handelCreateRoom}>Let's go</button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
