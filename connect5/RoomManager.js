/**
 * Created by JianingLiu on 11/6/16.
 */
'use strict';
const _ = require('lodash');
const Room = require('./Room');

let rooms = {};
function getRooms(){
    console.log(_.toArray(rooms));
    return _.toArray(rooms);
}
function createRoom(roomName, player){
    let room = new Room(roomName, player);
    rooms[roomName] = room;
}
function joinRoom(roomName, player){
    rooms[roomName].join(player);
}
function leaveRoom(roomName, player){
    rooms[roomName].leave(player);
    if(rooms[roomName].players.length === 0){
        delete rooms[roomName];
    }
}
function getRoom(roomName){
    return rooms[roomName];
}
function getActiveRoom(player){
    return getRooms().find(function(room){
        return room.isPlayerInRoom(player);
    });
}
module.exports = {
    getRooms: getRooms,
    createRoom: createRoom,
    joinRoom: joinRoom,
    leaveRoom: leaveRoom,
    getRoom: getRoom,
    getActiveRoom: getActiveRoom
};