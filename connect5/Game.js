/**
 * Created by JianingLiu on 9/10/16.
 */

'use strict';

const events = require('events');

const Board = require('./Board');


class Game extends events.EventEmitter {
    constructor(players) {
        super();
        this.board = new Board();
        this.players = players;
        this.currentPlayer = players[0];
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
        this.emitGameState();
    }

    announceWinner() {
        this.emit('announceWinner', this.currentPlayer);
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
        console.log('emitGameState');
        this.emit('gameState', this);
    };

    getCurrentPiece() {
        return this.currentPlayer === this.players[0] ? 'x' : 'o';
    }

    isPlayersTurn(player){
        return this.currentPlayer.name === player.name;
    }

}


module.exports = Game;
