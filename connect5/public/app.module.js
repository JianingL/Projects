/**
 * Created by JianingLiu on 9/5/16.
 */
var app = angular.module('connect5', [
    'btford.socket-io',
    "ngRoute"
]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "login.html"
        })
        .when("/game", {
            templateUrl : "game.html"
        })
        .when("/login", {
            templateUrl : "login.html"
        })
        .when("/lobby", {
            templateUrl : "lobby.html"
        });
});