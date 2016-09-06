/**
 * Created by JianingLiu on 9/5/16.
 */

var app = angular.module('connect5');
app.factory('SocketFactory', SocketFactory);

function SocketFactory(socketFactory) {
    return socketFactory();
}