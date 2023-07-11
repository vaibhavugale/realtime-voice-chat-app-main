require("dotenv").config();
const dbConnect = require("../backend/dataBase-config");
const express = require("express");
const app = express();
const Routes = require("./routes");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cookiesParser());

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

// this middleware convert data request body into json
app.use(express.json({ limit: "8mb" }));
// all url go through Routes middleware
app.use(Routes);

app.get("/", (req, res) => {
  res.send("hello from vaibhav");
});
dbConnect();
const PORT = process.env.PORT || 5500;
const socketUserMapping = {};
// sockets
io.on("connection", (socket) => {
  // console.log("ID", socket.id);
  socket.on("join", ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId)|| []) ;
    clients.forEach((clientId) => {
      io.to(clientId).emit("add_peer", {
        peerId: socket.id,
        createOffer: false,
        user: user,
      });
      socket.emit("add_peer", {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });
    socket.join(roomId);
  });

  // handel relay ice
  socket.on("relay_ice", ({ peerId, icecandidate }) => {
    io.to(peerId).emit("relay_ice", {
      peerId: socket.id,
      icecandidate,
    });
  });

  // handel relay sdp
  socket.on("relay_sdp", ({ peerId, sessionDescription }) => {
    io.to(peerId).emit("relay_sdp", {
      peerId: socket.id,
      sessionDescription,
    });
  });
  const leaveRoom = ({ roomId }) => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit("remove_peer", {
          peerId:socket.id,
          userId: socketUserMapping[socket.id]?.id,
        });
        socket.emit("remove_peer", {
            peerId:socket.id,
          userId: socketUserMapping[clientId]?.id,
        });
      });
      socket.leave(roomId);
    });
    delete socketUserMapping[socket.id];
  };
  // handel leaving the room
  socket.on("leave", leaveRoom);
  socket.on('disconnect',leaveRoom)
});
server.listen(PORT, () => {
  console.log(`Listing  on Port ${PORT}`);
});
