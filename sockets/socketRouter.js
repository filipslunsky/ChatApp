const { Server } = require("socket.io");
const { handleSocketEvents } = require('./socketHandlers.js');

const configureSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        handleSocketEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

module.exports = { configureSocketIO };
