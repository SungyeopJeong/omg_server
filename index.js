const app = require('express')();
const roomRouter = require("./routes/room");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var room = new Map();
global.room = room;

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('join', (msg) => {
        const emit = (statusCode) => {
            io.emit(`ready ${msg.code}`, {
                'statusCode': statusCode,
                'name': msg.name,
            })
        };
        if (room.has(msg.code)) {
            if (!room.get(msg.code).includes(msg.name)) {
                room.get(msg.code).push(msg.name);
                emit(201);
            } else {
                emit(400);
            }
        } else {
            emit(401);
        }
    });

    socket.on('exit', (msg) => {
        if (room.has(msg.code)) {
            const names = room.get(msg.code);
            const index = names.indexOf(msg.name);
            if (index !== -1) {
                names.splice(index, 1);
                io.emit(`ready ${msg.code}`, {
                    'statusCode': 200,
                    'name': msg.name,
                });
            }
        }
    });

    socket.on('start', (msg) => {
        io.emit(`request ${msg}`);
    });

    socket.on('send', (msg) => {
        io.emit(`game ${msg.code}`, {
            'name': msg.name,
            'accX': msg.accX,
            'accY': msg.accY,
            'accZ': msg.accZ,
            'accT': msg.accT,
            'gyrX': msg.gyrX,
            'gyrY': msg.gyrY,
            'gyrZ': msg.gyrZ,
            'gyrT': msg.gyrT,
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