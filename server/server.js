const express = require('express');
const http = require("http");
const {Server} = require("socket.io") //“From the socket.io package, take only the thing called Server.”

const app = express();
const server = http.createServer(app);
/*Why is this needed?
Express alone cannot handle WebSockets
Socket.io needs an actual HTTP server*/

//creating socket.io server ↓ . Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*"              //“Allow frontend to connect from ANY website.”
  }
});

// these functions are called callback functions
//A callback function is a function that you give to another function, so it can be called later.
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("send-message", (data)=>{
        socket.broadcast.emit("receive-message", data);
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnected: ", socket.id);
    });
});

server.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
})
