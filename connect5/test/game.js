/**
 * Created by pengwei on 3/26/17.
 */

'use strict';

const assert = require('assert');
const Game = require('../Game');
const Player = require('../Player');

let player1 = new Player('peng');
let player2 = new Player('esther');

describe('Simulate a game', function(){
    describe('Initial states', function(){
        let game = new Game([player1, player2]);
        it('should have 2 players', function(){
            assert.equal(game.players.length, 2);
        });
        it('currentPlayer should be player1', function(){
            assert.equal(game.currentPlayer, player1);
        });
        it('should have a valid board', function(){
            let board = game.board;
            assert(board);
        });
    });

    describe('Should be able to play', function(){
        let game = new Game([player1, player2]);
        it('should be able to make a move', function(){
            game.play(1,1);
            assert.equal(game.currentPlayer, player2);
            let boardData = game.board.board;
            assert.equal(boardData[1][1], 'x');
        });
        it('should be able to make another move', function(){
            game.play(2,2);
            assert.equal(game.currentPlayer, player1);
            let boardData = game.board.board;
            assert.equal(boardData[2][2], 'o');
        });

        it('should not able place at invalid position', function(){
            assert.equal(game.board.canPlacePiece(2, 2), false);
            assert.equal(game.board.canPlacePiece(-1, 2), false);
            assert.equal(game.board.canPlacePiece(16, 16), false);
        });
    });
});