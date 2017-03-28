/**
 * Created by pengwei on 3/26/17.
 */

'use strict';
var app = angular.module('connect5');

app.controller('NavController', NavController);
NavController.$inject = ['$scope', 'PlayerService'];

function NavController($scope, PlayerService){
    $scope.playerService = PlayerService;
    /*
    let init = Promise.coroutine(function*(){
        let user = yield UserService.getUser();
        $scope.user = user;
    });

    init();
    */
}

