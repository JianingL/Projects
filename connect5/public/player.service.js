/**
 * Created by JianingLiu on 11/6/16.
 */

'use strict';
var app = angular.module('connect5');

app.service('PlayerService', PlayerService);
PlayerService.$inject = ['$http'];


let urls = {
    login: '/login',
    logout: '/logout',
    getSession: '/session'
};

function PlayerService($http) {
    this.player = undefined;
    this.login = function (playerName, avatar) {
        let payload = {
            playerName: playerName,
            avatar: avatar
        };
        return $http.post(urls.login, payload)
            .then((res) => {
                this.player = res.data;
            })
            .catch(console.error);
    };
    this.logout = function() {
        return $http.post(urls.logout)
            .then(() => {
                this.player = undefined;
            })
            .catch(console.error);
    };
    this.gerPlayer = function(){
        if(this.player) return Promise.resolve(this.player);
        return $http.get(urls.getSession)
            .then((session) => {
                console.log(session);
                if(session.data){
                    this.player = session.data;
                }else{
                    this.player = undefined;
                }
                return this.player;
            })
            .catch(console.error);
    };
}