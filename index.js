const app = require('express')();
const roomRouter = require("./routes/room");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var code = [];
global.code = code;

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('join', (msg) => {
        io.emit(`ready ${msg.code}`, {
            'id': socket.id,
            'name': msg.name,
            'joined': code.includes(msg.code)
        });
    });

    socket.on('start', (msg) => {
        io.emit(`request ${msg}`);
    });

    socket.on('send', (msg) => {
        io.emit(`game ${msg.code}`, {
            'acc x': msg.accX,
            'acc y': msg.accY,
            'acc z': msg.accZ,
            'acc t': msg.accT,
            'gyr x': msg.gyrX,
            'gyr y': msg.gyrY,
            'gyr z': msg.gyrZ,
            'gyr t': msg.gyrT,
        });
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
    });
});

app.use("/api/room", roomRouter);

const port = 3000;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});