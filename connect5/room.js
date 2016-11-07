/**
 * Created by JianingLiu on 11/6/16.
 */

var Game = require('./Game');
function Room(roomName, player){
    this.roomName = roomName;
    this.player1 = player;
    this.player2 = undefined;
    this.game = new Game();
    this.game.init();
}

Room.prototype.join = function(player) {
    if (this.player1 && this.player2) {
        throw new Error('The room is full');
    } else if (!this.player1 && !this.player2){
        this.player1 = player;
    } else {
        this.player1 ? this.player2 = player : this.player1 = player;
    }
};

Room.prototype.leave = function(player) {
    player == this.player1 ? this.player1 = undefined : this.player2 = undefined;
};
Room.prototype.getRole = function(player) {
    if (player == this.player1) {
        return 'x';
    } else {
        return 'o';
    }
};
module.exports = Room;