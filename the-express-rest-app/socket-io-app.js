import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import chalk from 'chalk';

//create express app
const app = express();
//create http server => pass express app to http server
const server = http.createServer(app);

//create socket.io server => pass http server to socket.io
//waiting for websocket(socket.io) connections
const io = new Server(server);

//middleware to serve static files from public folder
app.use(express.static('public'));

const clientSockets = [];

io.on('connection', (socket) => {

    clientSockets.push(socket);
    console.log(chalk.whiteBright("A new client has connected"));

    //send message to client
    socket.emit('message', 'Welcome to the socketio server');

    socket.on("data", (data) => {
        console.log(chalk.yellowBright(`Data received from client: ${data}`));
        //broadcast to all clients
        clientSockets.forEach((s) => {
            if(s != null) {
                s.emit('message', data);
            }
        })
    })

    socket.on('disconnect', () => {
        console.log(chalk.redBright('The client has disconnected'));
        const index = clientSockets.findIndex((s) => s === socket);
        if(index !== -1) {
            clientSockets.splice(index, 1);
        }
    })

});




server.listen(9040, () => {
    console.log('Server is running on 9040 with http and websockets support');
})