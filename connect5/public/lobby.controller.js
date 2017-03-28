/**
 * Created by JianingLiu on 11/6/16.
 */

'use strict';

var app = angular.module('connect5');
app.controller('LobbyController', LobbyController);
LobbyController.$inject = ['$scope', 'player', 'LobbyService', '$location', '$rootScope'];

function LobbyController($scope, player, LobbyService, $location, $rootScope){
    if(!player){
        $location.path('/');
        return;
    }

    $scope.player = player;
    $scope.lobby = LobbyService;
    $scope.roomName = '';
    $scope.createRoom = function(){
        LobbyService.createRoom($scope.roomName, console.log);
    };

    $scope.joinRoom = function(room){
        LobbyService.joinRoom(room, console.log);
    };

    $scope.leaveRoom = function(room){
        LobbyService.leaveRoom(room, console.log);
    };

    $rootScope.$on('startGame', ()=>{
        $location.path('/game');
    });
    LobbyService.getRooms();
}