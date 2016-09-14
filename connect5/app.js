var express = require('express');
var app = express();


var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = require('./game');
game.init();

app.use(express.static('public'));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.emit('gameState', game.getGameState());

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

    socket.on('playLocation', function(location){
        console.log(location);
        game.play(location.row, location.col);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message:' + msg);
        // send the event to everyone
        io.emit('chat message', msg);
    });

    socket.on('reset', function(){
        game.reset();
    });
    socket.on('undo', function(){
        game.undo();
    });
});

http.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});