var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var RoomManager = require('./RoomManager');
var Game = require('./game');
app.use(express.static('public'));

io.on('connection', function(socket){
    socket.on('getRooms', function(data, callback){
        callback(RoomManager.getRooms());
    });
    socket.on('createRoom', function(data){
        RoomManager.createRoom(data.roomName, data.player);
        joinGame(data);

    });
    socket.on('joinRoom', function(data){
        RoomManager.joinRoom(data.roomName, data.player);
        joinGame(data);
    });
    function joinGame(data){
        socket.join(data.roomName);

        var room = RoomManager.getRoom(data.roomName);
        var game = room.game;
        socket.player = room.getRole(data.player);
        console.log(socket.player);
        socket.on('getGameState', function(data, callback) {
            callback(game.getGameState());
        });

        game.on('invalidLocation', function(){
            socket.emit('invalidLocation');
        });
        game.on('announceWinner', function(player){
            socket.emit('announceWinner', player);
        });
        game.on('announceDraw', function(){
            socket.emit('announceDraw');
        });
        game.on('gameState', function(gameState){

            socket.emit('gameState', gameState);
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('chat message', function(msg){
            console.log('message:' + msg);
            // send the event to everyone
            io.emit('chat message', msg);
        });

        socket.on('playLocation', function(location){
            console.log(location);
            if (socket.player != game.currentPlayer) return;
            game.play(location.row, location.col);
        });


        socket.on('reset', function(){
            game.reset();
        });
        socket.on('undo', function(){
            if (socket.player != game.currentPlayer) return;
            game.undo();
        });
    }
    socket.on('leaveRoom', RoomManager.leaveRoom);
});



http.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});