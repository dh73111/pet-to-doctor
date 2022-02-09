let express = require("express");
let http = require("http");
let app = express();
let cors = require("cors");
let server = http.createServer(app);
let socketio = require("socket.io");
let io = socketio.listen(server);

app.use(cors());
const PORT = process.env.PORT || 9000;
const hostname = "192.168.35.26";
let users = {};

let socketToRoom = {};

const maximum = process.env.MAXIMUM || 2;

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        console.log("join_room  room id :" + data.id);
        if (users[data.room]) {
            const length = users[data.room].length;
            if (length === maximum) {
                socket.to(socket.id).emit("room_full");
                return;
            }
            users[data.room].push({ id: socket.id, email: data.email });
        } else {
            users[data.room] = [{ id: socket.id, email: data.email }];
        }
        socketToRoom[socket.id] = data.room;

        socket.join(data.room); // id 로 넣음
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

        const usersInThisRoom = users[data.room].filter((user) => user.id !== socket.id);

        console.log(usersInThisRoom);
        io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
    });

    socket.on("offer", (sdp) => {
        console.log("offer: " + socket.id);
        socket.broadcast.emit("getOffer", sdp);
    });

    socket.on("answer", (sdp) => {
        console.log("answer: " + socket.id);
        socket.broadcast.emit("getAnswer", sdp);
    });

    socket.on("candidate", (candidate) => {
        socket.broadcast.emit("getCandidate", candidate);
    });

    socket.on("disconnect", () => {
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
        const roomID = socketToRoom[socket.id];
        // room에 포함된 유저
        let room = users[roomID];
        // room이 존재한다면(user들이 포함된)
        if (room) {
            // disconnect user를 제외
            room = room.filter((user) => user.id !== socket.id);
            users[roomID] = room;
        }
        // 어떤 user가 나갔는 지 room의 다른 user들에게 통보
        socket.broadcast.to(room).emit("user_exit", { id: socket.id });
        console.log(users);
    });

    socket.on("videoOff", () => {
        console.log(`${socket.id} 비디오 껐음`);
        let room = users[socketToRoom[socket.id]];
        console.log(room, "전달");
        socket.broadcast.to(room).emit("otherVideoOff", { id: socket.id });
    });
});

server.listen(PORT, hostname, () => {
    console.log(`server running on http:/${hostname}:${PORT}`);
});
