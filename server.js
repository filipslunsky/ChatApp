const express = require('express');
const cors = require('cors');
const path = require("path");

const usersRouter = require('./routes/usersRouter.js');
const chatsRouter = require('./routes/chatsRouter.js');

const PORT = 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use('/user', usersRouter);
app.use('/chats', chatsRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
