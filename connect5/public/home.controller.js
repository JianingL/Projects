/**
 * Created by JianingLiu on 11/6/16.
 */
'use strict';

app.controller('HomeController', HomeController);
HomeController.$inject = ['$scope', 'player', 'PlayerService', 'G_AVATARS', '$location'];

function HomeController($scope, player, PlayerService, G_AVATARS, $location){
    $scope.playerService = PlayerService;
    $scope.avatars = G_AVATARS;
    $scope.playerName = '';
    $scope.selectedAvatar = undefined;

    $scope.login = function (){
        PlayerService.login($scope.playerName, $scope.selectedAvatar)
            .then(function(){
                $location.path('/lobby');
            });
    };
}