/**
 * Created by JianingLiu on 9/5/16.
 */
'use strict';

app.service('SocketService', SocketService);

SocketService.$inject = ['socketFactory'];

//create a socket singleton, because the app only needs 1 socket
function SocketService(socketFactory) {
    if(!this.sharedSocket){
        this.sharedSocket = socketFactory();
    }
}