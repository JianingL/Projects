/**
 * Created by JianingLiu on 11/6/16.
 */
var _ = require('lodash');
var Room = require('./Room');
var rooms = {};
function getRooms(){
    return _.toArray(rooms);
}
function createRoom(roomName, player){
    var room = new Room(roomName, player);
    rooms[roomName] = room;
}
function joinRoom(roomName, player){
    rooms[roomName].join(player);
}
function leaveRoom(roomName, player){
    rooms[roomName].leave(player);
}
function getRoom(roomName){
    return rooms[roomName];
}
module.exports = {
    getRooms: getRooms,
    createRoom: createRoom,
    joinRoom: joinRoom,
    leaveRoom: leaveRoom,
    getRoom: getRoom
};