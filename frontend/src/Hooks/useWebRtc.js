import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import { socketInit } from "../socket";
import toast from "react-hot-toast";
import freeice from "freeice";
export const useWebRtc = (roomID, user) => {
  const [clients, setClients] = useStateWithCallBack([]);
  const audioElements = useRef({}); // store userId with there audio instances
  const videoElements = useRef({});
  const connections = useRef({}); // used to store peer connection
  const localMediaStream = useRef(null); // store our stream
  const socket = useRef(null);
  const clientsRef = useRef([])
  useEffect(() => {
    socket.current = socketInit();
  }, []);

  // extra check before creating new client
  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id == newClient.id);
      if (!lookingFor) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );
  // capture media Basically we are taking our audio input
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        // video:true
      });
    };
    startCapture().then(() => {
      addNewClient({...user,muted:true}, async () => {
        const localAudioElement = audioElements.current[user.id];
        const localVideoElement = videoElements.current[user.id];
        // console.log("localMedia", localMediaStream);
        if (localAudioElement) {
          localAudioElement.volume = 0;
          localAudioElement.srcObject = localMediaStream.current;
        }
        //   if(localVideoElement){
        //     localAudioElement .volume=0;
        //     localVideoElement.srcObject = localMediaStream.current;
        //   }

        // socket emit
        socket.current.emit("join", { roomID, user });
      });
    });
    return ()=>{
     
      localMediaStream.current.getTracks().forEach((track)=>{
        return track.stop();
      })
      socket.current.emit('leave',{roomID})
    }
  }, []);

  
  useEffect(() => {
    const handelNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      // if already connected then give waring
      // console.log("in handel new peer")
      if (peerId in connections.current) {
        toast.error("Already connected");
      }
      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });
      // handel new ice candidate
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit("relay_ice", {
          peerId,
          icecandidate: event.candidate,
        });
      };
  
      // handel on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        // console.log("In add newClient")
        addNewClient({...remoteUser,muted:true}, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };
      // add local track to remote connection
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });
      // creating offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer)
        // send offer to another client
        socket.current.emit("relay_sdp", {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    socket.current.on("add_peer", handelNewPeer);
    return () => {
      socket.current.off("add_peer");
    };
  }, []);

  useEffect(() => {
    socket.current.on("relay_ice", ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });
    return () => {
      socket.current.off("relay_ice");
    };
  }, []);

  // handel remote sdp
  useEffect(() => {
    const handelRemoteSdp = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      // console.log("sessionDescription",remoteSessionDescription)
      connections.current[peerId].setRemoteDescription( new RTCSessionDescription(remoteSessionDescription) );
      // check if session description is type of offer create answer
      if (remoteSessionDescription.type == "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();
       await connection.setLocalDescription(answer);
        socket.current.emit("relay_sdp", {
          peerId,
          sessionDescription: answer,
        });
      }
    };
    socket.current.on("relay_sdp", handelRemoteSdp);
    return () => {
      socket.current.off("relay_sdp");
    };
  }, []);

  // handel remove peer
  useEffect(() => {
    const handelRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }
      delete connections.current[peerId];
      delete audioElements.current[peerId];
      setClients((list) => list.filter((client) => client.id !== userId));
    };
    socket.current.on("remove_peer", handelRemovePeer);
  }, []);
  function handelMuteUnmute(mute,userId){
    let settled = false;
    const interval = setInterval(()=>{
      if(localMediaStream.current){
        localMediaStream.current.getTracks()[0].enabled=!mute;
        if(mute){
          console.log("emit mute")
          socket.current.emit('mute',{roomID,userId:userId})
        }else{
          socket.current.emit('unmute',{roomID,userId:userId})
        }
        settled=true;
      }
      if(settled){
        clearInterval(interval);
      }
    },200)

   

  }
  // listen for mute unmute
  useEffect(()=>{
    socket.current.on('mute',({peerId,userId})=>{
      setMute(true,userId)
    })
    socket.current.on('unmute',({peerId,userId})=>{
      setMute(false,userId)
    })
    const setMute = (mute,userId) =>{
      const clientIDx =  clientsRef.current.map((client)=>{
          return client.id
      }).indexOf(userId)

      const connectedClients = JSON.parse(
        JSON.stringify(clientsRef.current)
    );
      if(clientIDx>-1){
        connectedClients[clientIDx].muted = mute
        setClients(connectedClients)
      } 
    }
  },[])
  useEffect(()=>{
    clientsRef.current = clients

  },[clients])
  const provideRef = (instances, clientId) => {
    // console.log("Value of instances", instances);
    audioElements.current[clientId] = instances;
  };
  const provideRefForVideo = (instances, clientId) => {
    // console.log("Value of instances", instances);
    videoElements.current[clientId] = instances;
  };
  return { clients, provideRef, provideRefForVideo ,handelMuteUnmute};
};
