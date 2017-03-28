/**
 * Created by Jianing on 15-7-22.
 */
var app = angular.module('connect5');
app.controller('GameController', GameController);
GameController.$inject = ['$scope', 'GameService', 'player', '$location'];

function GameController($scope, GameService, player, $location){
    if(!player){
        $location.path('/');
        return;
    }
    console.log('game controller');
    $scope.game = GameService;

    GameService.getGameState();
}
