const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const { configureSocketIO } = require('./sockets/socketRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const chatsRouter = require('./routes/chatsRouter.js');
const messagesRouter = require('./routes/messagesRouter.js');

const PORT = 3001;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/user', usersRouter);
app.use('/chats', chatsRouter);
app.use('/messages', messagesRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', (req, res, next) => {
    console.log(`Requesting file: ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

configureSocketIO(server);

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
