import {io} from "socket.io-client"
export const socketInit = () =>{
    const options = {
        'force new connection': true,
        reconnectionAttempts: 10,
        timeout: 10000,
        transports: ['websocket'],
    }
    return io("https://real-time-backend.onrender.com",options )
}