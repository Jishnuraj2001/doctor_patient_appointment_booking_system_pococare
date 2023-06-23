const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);


require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { appointmentRouter } = require("./routes/appointment.router");

app.get("/", (req, res) => {
  res.send("Basic API endpoint for MediConnect");
});

app.use("/", userRouter);
app.use("/", appointmentRouter);

app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/:room",(req,res)=>{
  res.render('room',{roomId: req.params.room});
});

io.on("connection",socket=>{
  socket.on('join-room',(roomId,userId)=>{
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected',userId);

    socket.on('disconnect',()=>{
      socket.broadcast.to(roomId).emit('user-disconnected',userId);
    });
  })
});

server.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Server Connected to MongoDB");
        console.log(`Server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log("Unable to connect to DataBase");
        console.log(error.message);
    }
});