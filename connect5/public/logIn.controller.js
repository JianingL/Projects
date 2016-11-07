/**
 * Created by JianingLiu on 11/6/16.
 */
var app = angular.module('connect5');
app.controller('LoginController', LoginController);
LoginController.$inject = ['$scope', 'userService', '$location'];

function LoginController($scope, userService, $location){
    $scope.setUser = function (){
        userService.setUser($scope.username);
        $location.path('/lobby');
    };
}