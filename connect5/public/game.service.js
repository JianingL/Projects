/**
 * Created by JianingLiu on 11/6/16.
 */

'use strict';
var app = angular.module('connect5');

app.service('GameService', GameService);
GameService.$inject = ['SocketService', 'PlayerService'];

function GameService(SocketService, PlayerService) {
    let socket = SocketService.sharedSocket;
    this.board = undefined;
    this.players = [];
    this.currentPlayer = undefined;

    this.isInProgress = function(){
        return this.players.length === 2;
    };

    this.getGameState = function(){
        console.log('ok');
        socket.emit('getGameState', '', this.updateGameState.bind(this));
    };

    this.updateGameState = function(game){
        console.log(game);
        this.board = game.board.board;
        this.players = game.players;
        this.currentPlayer = game.currentPlayer;
        this.matchHistory = game.matchHistory;
    };

    this.play = function(row, col){
        socket.emit('playLocation', {
            row: row,
            col: col
        })
    };
    this.reset = function(){
        socket.emit('reset');
    };
    this.undo = function(){
        socket.emit('undo');
    };

    this.clearHistory = function(){
        socket.emit('clearHistory');
    };

    this.numberOfWins = function(player){
        if(!this.matchHistory) return 0;

        return this.matchHistory[player.name];
    };

    socket.on('gameState', this.updateGameState.bind(this));

    socket.on('invalidLocation', () => {
        if(PlayerService.player.name !== this.currentPlayer.name) return;
        sweetAlert({
            title: "you cannot put it here",
            imageUrl: "assets/imgs/cannot.jpg"
        });
    });
    socket.on('announceWinner', function(winner){
        sweetAlert({
            title: "The winner is " + winner.name,
            imageUrl: "assets/imgs/win.jpg"
        });
    });
    socket.on('announceDraw', function(){
        sweetAlert({
            title: "It is a draw",
            imageUrl: "assets/imgs/draw.jpeg"
        });
    });
}