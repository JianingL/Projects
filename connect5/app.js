'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const RoomManager = require('./RoomManager');
const Player = require('./Player');

app.use(express.static('public'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

let sessionMiddleware = session({
    secret: 'meimaobing!a!laopo!',
    name: 'connect5',
    resave: true,
    saveUninitialized: true
});

app.use(sessionMiddleware);

app.post('/login', function(req, res){
    let player = new Player(req.body.playerName, req.body.avatar);
    req.session.player = player;
    res.status(200).send(player);
});

app.post('/logout', function(req, res){
    req.session.destroy(function(err){
        if(!err){
            res.status(200).send('Logged out');
        }else{
            res.status(400).send('Error logging out');
        }
    });
});

app.get('/session', function(req, res){
    res.send(req.session.player);
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

io.on('connection', socketApi);

http.listen(8080, function () {
    console.log('App listening on port 8080!');
});

// main api
function socketApi(socket){
    console.log('new connection');

    let player = socket.request.session.player;

    let activeRoom = RoomManager.getActiveRoom(player);
    if(activeRoom){
        socket.join(activeRoom.name);
        let activeGame = activeRoom.game;
        if(activeGame){
            addGameApi(activeGame);
        }
    }
    socket.on('getRooms', function(data, callback){
        console.log('getRooms');
        console.log(RoomManager.getRooms());
        callback(RoomManager.getRooms());
    });
    socket.on('createRoom', function(room){
        console.log('createRoom');
        console.log(room);
        let roomName = room.name;

        RoomManager.createRoom(roomName, player);
        updateRoomInfo();
        socket.join(roomName);

    });
    socket.on('joinRoom', function(room){
        console.log('joinRoom');
        console.log(room);
        let roomName = room.name;
        RoomManager.joinRoom(roomName, player);
        updateRoomInfo();
        socket.join(roomName);

        let _room = RoomManager.getRoom(roomName);
        if(_room.players.length === 2){
            startGame(_room);
        }
    });

    socket.on('leaveRoom', function(room){
        console.log('leaveRoom');
        console.log(room);
        let roomName = room.name;
        RoomManager.leaveRoom(roomName, player);
        updateRoomInfo();
        socket.leave(roomName);
    });

    socket.on('disconnect', function(){
        console.log('disconnect');
    });

    function updateRoomInfo(){
        io.sockets.emit('updateRoomInfo', RoomManager.getRooms());
    }

    function startGame(room){
        let game = room.startGame();
        addGameCallbacks(room, game);
        io.in(room.name).emit('startGame');
    }

    function addGameCallbacks(room, game){
        console.log('addGameCallbacks');

        game.on('invalidLocation', function(){
            io.in(room.name).emit('invalidLocation');
        });
        game.on('announceWinner', function(player){
            io.in(room.name).emit('announceWinner', player);
        });
        game.on('announceDraw', function(){
            io.in(room.name).emit('announceDraw');
        });
        game.on('gameState', function(gameState){
            io.in(room.name).emit('gameState', gameState);
        });

    }

    function addGameApi(game){
        console.log('addGameApi');

        socket.on('getGameState', function(data, callback) {
            console.log('getGameState');
            console.log(game);
            callback(game);
        });
        socket.on('playLocation', function(location){
            console.log(location);
            if (!game.isPlayersTurn(player)) return;
            game.play(location.row, location.col);
        });

        socket.on('reset', function(){
            game.reset();
        });
        socket.on('undo', function(){
            if (!game.isPlayersTurn(player)) return;
            game.undo();
        });
    }
}

