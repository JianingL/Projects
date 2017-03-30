/**
 * Created by pengwei on 3/26/17.
 */

'use strict';

app.controller('NavController', NavController);
NavController.$inject = ['$scope', 'PlayerService', '$location'];

function NavController($scope, PlayerService, $location){
    $scope.playerService = PlayerService;
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.logout = function(){
        PlayerService.logout();
        $location.path('/');
    };
}

