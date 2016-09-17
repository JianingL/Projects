/**
 * Created by JianingLiu on 9/10/16.
 */

var util = require("util");
var events = require("events");

function Game(){
    events.EventEmitter.call(this);
    this.boardw = 15;
    this.boardh = 15;
    this.currentPlayer = 'x';
    this.board = undefined;
    this.chessRecord = [];
}

util.inherits(Game, events.EventEmitter);

Game.prototype.init = function(){
    this.board = new Array(this.boardw);
    for (var i = 0; i < this.boardw; i++) {
        this.board[i] = new Array(this.boardh);
        for (var k = 0; k < this.boardh; k++) {
            this.board[i][k] = '';
        }
    }
};

Game.prototype.play = function(row, col){
    if (this.board[row][col] != '') {
        this.emit('invalidLocation');
    } else {
        this.board[row][col] = this.currentPlayer;
        if (this.checkVictory(row, col)) {
            this.announceWinner();

        } else if (this.checkDraw()) {
            this.announceDraw();
        } else {
            this.endTurn();
        }
        this.chessRecord.push([row, col]);
    }

    this.emitGameState();
};

Game.prototype.checkVictory = function(row, col) {
    //check rows
    var b = this.board;
    for (var i = col - 4; i < col + 1; i++) {
        if (this.checkValid(row, i) && this.checkValid(row, i + 1) && this.checkValid(row, i + 2) && this.checkValid(row, i + 3) && this.checkValid(row, i + 4) && b[row][col] != '') return true;
    }
    for (var i = row - 4; i < row + 1; i++) {
        if (this.checkValid(i, col) && this.checkValid(i + 1, col) && this.checkValid(i + 2, col) && this.checkValid(i + 3, col) && this.checkValid(i + 4, col) && b[row][col] != '') return true;
    }
    for (var i = -4; i < 1; i++) {
        if (this.checkValid(row + i, col + i) && this.checkValid(row + i + 1, col + i + 1) && this.checkValid(row + i + 2, col + i + 2) && this.checkValid(row + i + 3, col + i + 3) && this.checkValid(row + i + 4, col + i + 4) && b[row][col] != '') return true;
    }
    for (var i = -4; i < 1; i++) {
        if (this.checkValid(row - i, col + i) && this.checkValid(row - i - 1, col + i + 1) && this.checkValid(row - i - 2, col + i + 2) && this.checkValid(row - i - 3, col + i + 3) && this.checkValid(row - i - 4, col + i + 4) && b[row][col] != '') return true;
    }
    return false;
};

Game.prototype.checkValid = function(row, col) {
    if (row < 0 || col < 0 || row >= this.boardw || col >= this.boardh) return false;
    if (this.board[row][col] != this.currentPlayer) return false;
    return true;
};

Game.prototype.announceWinner = function() {
    this.emit('announceWinner', this.currentPlayer);
};

Game.prototype.checkDraw = function(){
    var b = this.board;
    var count = 0;
    for (var k = 0; k < this.boardh; k++) {
        for (var i = 0; i < this.boardw; i++) {
            if (b[k][i] != '') count++;
        }
    }
    return count == this.boardh * this.boardw;
};

Game.prototype.announceDraw = function(){
    this.emit('announceDraw');
};

Game.prototype.endTurn = function(){
    if (this.currentPlayer == 'x') {
        this.currentPlayer = 'o';
    } else {
        this.currentPlayer = 'x';
    }
};

Game.prototype.emitGameState = function(){
    console.log('emitGameState');
    this.emit('gameState', {
        board: this.board,
        currentPlayer: this.currentPlayer
    });
};

Game.prototype.getGameState = function(){
    return {
        board: this.board,
        currentPlayer: this.currentPlayer
    };
};

Game.prototype.reset = function(){
    this.init();
    this.emitGameState();
};

Game.prototype.undo = function(){
    this.board[this.chessRecord[this.chessRecord.length-1][0]][this.chessRecord[this.chessRecord.length-1][1]] = '';
    this.chessRecord.pop();
    this.endTurn();
    this.emitGameState();
};

module.exports = Game;
