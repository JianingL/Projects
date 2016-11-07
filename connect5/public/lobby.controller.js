/**
 * Created by JianingLiu on 11/6/16.
 */
var app = angular.module('connect5');
app.controller('LobbyController', LobbyController);
LobbyController.$inject = ['$scope', 'userService', '$location', 'SocketFactory', '$timeout'];

function LobbyController($scope, userService, $location, socket, $timeout){
    $scope.username = userService.getUser();
    $scope.rooms = [];
    $scope.createRoom = function(){
        socket.emit('createRoom', {
            roomName: $scope.roomName,
            player: $scope.username
        });
        $timeout(function(){
            $location.path('/game');
        }, 1000);
    };
    $scope.getRooms = function () {
        socket.emit('getRooms', '', function(rooms){
            console.log(rooms);
            $scope.rooms = rooms;
        });
    };
    $scope.joinRoom = function(room){
        socket.emit('joinRoom', {
            roomName: room.roomName,
            player: $scope.username
        });
        $timeout(function(){
            $location.path('/game');
        }, 1000);
    };

}