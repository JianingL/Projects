/**
 * Created by Jianing on 15-7-22.
 */
var app = angular.module('connect5');
app.controller('GameController', GameController);
GameController.$inject = ['$scope', 'SocketFactory'];

function GameController($scope, socket){

    $scope.players = {
        'x': 'Brian',
        'o': 'Esther'
    };
    $scope.photo = {
        'x': 'assets/x.jpeg',
        'o': 'assets/o.JPG'
    };

    socket.emit('getGameState', '', function(state) {
        $scope.board = state.board;
        $scope.currentPlayer = state.currentPlayer;
    });
    socket.on('gameState', function(state){
        $scope.board = state.board;
        $scope.currentPlayer = state.currentPlayer;
    })
    socket.on('invalidLocation', function(){
        sweetAlert({
            title: "you cannot put it here",
            imageUrl: "assets/cannot.jpg"
        });
    });
    socket.on('announceWinner', function(winner){
        sweetAlert({
            title: "The winner is "+$scope.players[winner],
            imageUrl: "assets/win.jpg"
        });
    });
    socket.on('announceDraw', function(){
        sweetAlert({
            title: "It is a draw",
            imageUrl: "assets/draw.jpeg"
        });
    });

    $scope.messages = [];
    socket.on('chat message', function(msg){
        $scope.messages.push(msg);
    });
    $scope.submit = function(){
        socket.emit('chat message', $scope.text);
        $scope.text = '';
    };
    $scope.play = function(row, col){
        socket.emit('playLocation', {
            row: row,
            col: col
        })
    };
    $scope.reset = function(){
        socket.emit('reset');
    };
    $scope.undo = function(){
        socket.emit('undo');
    }
}
