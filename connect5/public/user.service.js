/**
 * Created by JianingLiu on 11/6/16.
 */
var app = angular.module('connect5');
app.service('userService', function() {
    var _username;
    this.setUser = function (username) {
        _username = username;
    };
    this.getUser = function(){
        return _username;
    };
});