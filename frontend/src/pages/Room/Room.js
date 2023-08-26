import React, { useEffect, useState } from "react";
import { useWebRtc } from "../../Hooks/useWebRtc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { BsArrowLeft } from "react-icons/bs";
import { FcLeave } from "react-icons/fc";
import {BsMicMuteFill} from "react-icons/bs"
import{BsMicFill} from "react-icons/bs"
import { getRoom } from "../../http";

const Room = () => {
  const unmuteStyle={
    color:"rgb(91, 235, 52)"
  }
  const muteStyle={
    color:"rgb(232, 35, 28)"
  }
  const { id: roomID } = useParams();
  const user = useSelector((state) => state.authSlice.user);
  const { clients, provideRef, provideRefForVideo ,handelMuteUnmute} = useWebRtc(roomID, user);
  const [room,setRoom] = useState({})
  const [isMute,setIsMute] = useState(true)
  const navigate = useNavigate();
  useEffect(()=>{
      handelMuteUnmute(isMute,user.id)
  },[isMute])
  function handelGoBack() {
    navigate("/rooms");
  }
 
  useEffect(()=>{
    
   const fetchRoom = async ()=>{
    const {data} = await getRoom({roomID:roomID})
    
    setRoom(data?.topic);
    
   }
   fetchRoom();
  },[])
  const handelMuteBtn = (id)=>{
    if(id!==user.id) return ;
    setIsMute(prv =>!prv)
  }
  // console.log(room)
  // console.log("clients-->", clients);
  return (
    <div>
      <div className={`container ${styles.roomContainer}`}>
        <button className={styles.goBackBtn} onClick={handelGoBack}>
          <BsArrowLeft />
          All voice rooms
        </button>
        <div className={styles.clientContainer}>
          <div className={styles.clientHeader}>
            <h1>{room?.topic}</h1>
            <button onClick={handelGoBack} className={styles.leaveBtn}>
              <FcLeave />
              <h1>Leave quietly</h1>
            </button>
          </div>

          <div className={styles.clients}>
            {clients.map((client) => {
              {/* console.log("client ID", client?.id); */}
              return (
                <div key={client?.id} className={styles.userHead}>
                 
                    <audio
                      ref={(instance) => {
                        provideRef(instance, client.id);
                      }}
                      // controls
                      autoPlay
                    ></audio>
                    <img
                      src={client.avatar}
                      className={styles.userAvatar}
                      alt=""
                    />
                   <button className={styles.mic} onClick={()=>handelMuteBtn(client.id)}>
                   {console.log("client mute",client.muted)}
                    {
                      client.muted ? (<BsMicMuteFill size={13} style={muteStyle}/>):(<BsMicFill size={13} style={unmuteStyle}/>)
                    }
                   </button>

                  <h4>{client.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
