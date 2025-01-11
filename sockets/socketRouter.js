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
        handleSocketEvents(io, socket);
        socket.on('disconnect', () => {
        });
    });
};

module.exports = { configureSocketIO };
