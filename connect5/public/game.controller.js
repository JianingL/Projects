/**
 * Created by Jianing on 15-7-22.
 */

'use strict';

app.controller('GameController', GameController);
GameController.$inject = ['$scope', 'GameService', 'player', '$location'];

function GameController($scope, GameService, player, $location){
    if(!player){
        $location.path('/');
        return;
    }
    $scope.game = GameService;

    GameService.getGameState();
}
