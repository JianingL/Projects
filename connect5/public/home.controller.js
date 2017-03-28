/**
 * Created by JianingLiu on 11/6/16.
 */
var app = angular.module('connect5');
app.controller('HomeController', HomeController);
HomeController.$inject = ['$scope', 'player', 'PlayerService', 'G_AVATARS'];

function HomeController($scope, player, PlayerService, G_AVATARS){
    console.log('homecontroller', player);
    $scope.playerService = PlayerService;
    $scope.avatars = G_AVATARS;
    $scope.playerName = '';
    $scope.selectedAvatar = undefined;

    $scope.login = function (){
        PlayerService.login($scope.playerName, $scope.selectedAvatar)
            .then(function(){
                //$location.path('/lobby');
            });
    };
}