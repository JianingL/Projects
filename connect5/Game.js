/**
 * Created by JianingLiu on 9/10/16.
 */

'use strict';

const events = require('events');

const Board = require('./Board');


class Game extends events.EventEmitter {
    constructor(players) {
        super();
        this.players = players;
        this.clearHistory();
        this.reset();

    }

    reset(){
        this.board = new Board();
        this.currentPlayer = this.players[0];
        this.moves = [];
    }

    play(row, col) {
        if (!this.board.canPlacePiece(row, col)) {
            this.emit('invalidLocation');
            return;
        }

        let piece = this.getCurrentPiece();
        this.board.placePiece(piece, row, col);
        if (this.board.hasFiveInARow(piece, row, col)) {
            this.announceWinner();
        } else if (this.board.isFull()) {
            this.announceDraw();
        } else {
            this.endTurn();
        }
        this.moves.push([row, col]);
        this.emitGameState();
    }

    announceWinner() {
        this.emit('announceWinner', this.currentPlayer);
        this.matchHistory[this.currentPlayer.name]++;
    };

    announceDraw() {
        this.emit('announceDraw');
    };

    endTurn() {
        if (this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1];
        } else {
            this.currentPlayer = this.players[0];
        }
    };

    emitGameState() {
        this.emit('gameState', this);
    };

    getCurrentPiece() {
        return this.currentPlayer === this.players[0] ? 'x' : 'o';
    }

    isPlayersTurn(player){
        return this.currentPlayer.name === player.name;
    }

    undo(){
        let lastMove = this.moves.pop();
        if(!lastMove) return;

        this.board.clear(lastMove[0],lastMove[1]);
        this.endTurn();
        this.emitGameState();
    }

    clearHistory(){
        this.matchHistory = {};
        this.matchHistory[this.players[0].name] = 0;
        this.matchHistory[this.players[1].name] = 0;
        this.emitGameState();
    }

}


module.exports = Game;
