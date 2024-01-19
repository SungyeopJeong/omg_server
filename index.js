const app = require('express')();
const roomRouter = require("./routes/room");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var code = [];
global.code = code;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (msg) => {
        console.log('code: ', msg);
        io.emit(`ready ${msg}`, code.includes(msg));
    });
});

app.use("/api/room", roomRouter);

const port = 3000;
server.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});