/**
 * Created by JianingLiu on 11/6/16.
 */
'use strict';

const _ = require('lodash');
const Game = require('./Game');

const MAX_PLAYERS = 2;
class Room {
    constructor(name, player) {
        this.name = name;
        this.players = [player];
        this.game = undefined;
    }

    join(player) {
        if(this.players.length === 2) throw new Error('The room is full');
        this.players.push(player);
    };

    leave(player) {
        _.remove(this.players, (_player) => {
            return _player.name === player.name;
        })
    };

    startGame(){
        this.game = new Game(this.players);
        return this.game;
    }

    isPlayerInRoom(player){
        return this.players.some(function(_player){
            return _player.name === player.name;
        });
    }

}

module.exports = Room;