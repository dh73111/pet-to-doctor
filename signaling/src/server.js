import { createServer } from "https";
import { Server } from "socket.io";
import express from "express";
const app = express();

const fs = require("fs");
const options = {
    ca: fs.readFileSync("./fullchain.pem"),
    key: fs.readFileSync("./privkey.pem"),
    cert: fs.readFileSync("./cert.pem"),
};

const httpServer = createServer(app);
var cors = require("cors");
const io = new Server(httpServer, {
    cors: {
        origin: ["https://i6b209.p.ssafy.io", "https:/kapi.kakao.com", "http://localhost"],
        transports: ["ws", "wss", "websocket", "polling"],

        credentials: true,
    },
    allowEIO3: true,
});

const PORT = 443;
const hostname = "0.0.0.0";
let users = {};

let socketToRoom = {};
let members = [];
const maximum = 1000;

io.of("/signaling").on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
        if (members.includes(data.userId)) {
            io.sockets.to(socket.id).emit("invalid");
            console.log("중복입장!");
            return;
        } else {
            members.push(data.userId);
        }
        console.log(members, "입장유저들");

        if (users[data.room]) {
            const length = users[data.room].length;
            if (length === maximum) {
                socket.to(socket.id).emit("room_full");
                return;
            }
            users[data.room].push({ id: socket.id, userId: data.userId });
        } else {
            users[data.room] = [{ id: socket.id, userId: data.userId }];
        }
        socketToRoom[socket.id] = data.room;

        socket.join(data.room); // id 로 넣음
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

        const usersInThisRoom = users[data.room].filter((user) => user.id !== socket.id);

        io.of("/signaling").to(socket.id).emit("all_users", usersInThisRoom);
    });

    socket.on("disconnectA", (userId) => {
        console.log(userId);
        for (let i = 0; i < members.length; i++) {
            if (members[i] === userId) {
                members.splice(i, 1);
                break;
            }
        }

        console.log(members, " exit members");
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
        // disconnect한 user가 포함된 roomID
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
        console.log(users, " users!!");
    });

    // 다른 user들에게 offer를 보냄 (자신의 RTCSessionDescription)
    socket.on("offer", (sdp) => {
        console.log("offer: " + socket.id);
        // room에는 두 명 밖에 없으므로 broadcast 사용해서 전달
        // 여러 명 있는 처리는 다음 포스트 1:N에서...
        socket.broadcast.emit("getOffer", sdp);
    });

    // offer를 보낸 user에게 answer을 보냄 (자신의 RTCSessionDescription)
    socket.on("answer", (sdp) => {
        console.log("answer: " + socket.id);
        socket.broadcast.emit("getAnswer", sdp);
    });

    // 자신의 ICECandidate 정보를 signal(offer 또는 answer)을 주고 받은 상대에게 전달
    socket.on("candidate", (candidate) => {
        socket.broadcast.emit("getCandidate", candidate);
    });

    // user가 연결이 끊겼을 때 처리
});

httpServer.listen(PORT, hostname, () => {
    console.log(`server running on http:/${hostname}:${PORT}`);
});
