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
    let player = socket.request.session.player;

    console.log('connect:', player);

    //resume session if player is already in a room
    if(player){
        let activeRoom = RoomManager.getActiveRoom(player);
        if(activeRoom){
            joinGameRoom(activeRoom.name);
        }
    }

    socket.on('disconnect', function(){
        console.log('disconnect:', player);
    });

    // room api
    socket.on('getRooms', function(data, callback){
        console.log('getRooms', RoomManager.getRooms());
        callback(RoomManager.getRooms());
    });
    socket.on('createRoom', function(room){
        console.log('createRoom', room);
        let roomName = room.name;

        RoomManager.createRoom(roomName, player);
        joinGameRoom(roomName);
        updateRoomInfo();

    });
    socket.on('joinRoom', function(room){
        console.log('joinRoom', room);
        let roomName = room.name;
        RoomManager.joinRoom(roomName, player);
        joinGameRoom(roomName);

        let _room = RoomManager.getRoom(roomName);
        if(_room.players.length === 2){
            startGame(_room);
        }
        updateRoomInfo();
    });

    socket.on('leaveRoom', function(room){
        console.log('leaveRoom', room);
        let roomName = room.name;
        let _room = RoomManager.getRoom(roomName);
        endGame(_room);
        RoomManager.leaveRoom(roomName, player);
        leaveGameRoom(roomName);
        updateRoomInfo();
    });

    // game api
    socket.on('getGameState', function(data, callback) {
        if(!socket.gameRoom) return callback(undefined);
        callback(socket.gameRoom.game);
    });
    socket.on('playLocation', function(location){
        if(!socket.gameRoom) return;
        let game = socket.gameRoom.game;
        if (!game.isPlayersTurn(player)) return;
        game.play(location.row, location.col);
    });

    socket.on('reset', function(){
        if(!socket.gameRoom) return;
        let game = socket.gameRoom.game;
        game.reset();
        game.emitGameState();
    });

    socket.on('undo', function(){
        if(!socket.gameRoom) return;
        let game = socket.gameRoom.game;
        if (game.isPlayersTurn(player)) return;
        game.undo();
    });

    socket.on('clearHistory', function(){
        if(!socket.gameRoom) return;
        let game = socket.gameRoom.game;
        game.clearHistory();
    });

    function updateRoomInfo(){
        io.sockets.emit('updateRoomInfo', RoomManager.getRooms());
    }

    function startGame(room){
        let game = room.startGame();
        addGameCallbacks(room, game);
        io.in(room.name).emit('startGame');
        io.in(room.name).emit('gameState', game);
    }

    function endGame(room){
        room.endGame();
        //TODO: remove callbacks? i think they are garbage collected
        io.in(room.name).emit('endGame');
    }

    function addGameCallbacks(room, game){
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

    function joinGameRoom(roomName){
        socket.join(roomName);
        let room = RoomManager.getRoom(roomName);
        socket.gameRoom = room;
    }

    function leaveGameRoom(roomName){
        socket.leave(roomName);
        socket.gameRoom = undefined;
    }
}

