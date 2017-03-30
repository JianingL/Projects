/**
 * Created by JianingLiu on 9/5/16.
 */

'use strict';

let app = angular.module('connect5', [
    'btford.socket-io',
    'ngRoute',
]);

app.constant('G_AVATARS', [
    'riceball',
    'doge',
    'esther'
]);

app.config(function($routeProvider) {
    let resolvePlayer = {
        player: ['PlayerService', function(PlayerService){
            return PlayerService.gerPlayer();
        }]
    };
    $routeProvider
        .when("/", {
            templateUrl : "home.html",
            controller: 'HomeController',
            resolve:resolvePlayer
        })
        .when("/game", {
            templateUrl : "game.html",
            controller: 'GameController',
            resolve:resolvePlayer
        })
        .when("/home", {
            templateUrl : "home.html",
            controller: 'HomeController',
            resolve:resolvePlayer
        })
        .when("/lobby", {
            templateUrl : "lobby.html",
            controller: 'LobbyController',
            resolve:resolvePlayer
        });
});