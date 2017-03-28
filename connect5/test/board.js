/**
 * Created by pengwei on 3/26/17.
 */

'use strict';

const assert = require('assert');

const Board = require('../Board');
describe('Board', function(){
    describe('Initial states', function(){
        it('should have right size and be empty', function(){
            let board = new Board();
            let boardData = board.board;
            assert(boardData);
            assert.equal(boardData.length, board.boardHeight);
            assert.equal(boardData[0].length, board.boardWidth);
            for(let row = 0; row < board.boardHeight; row++){
                for(let col = 0; col < board.boardWidth; col++){
                    assert.equal(boardData[row][col], '');
                }
            }
        });
    });

    describe('hasFiveInARow', function(){
        it('should work horizontally', function(){
            let board = new Board();
            let boardData = board.board;
            let row = 8;
            let col = 2;
            let piece = 'x';
            boardData[row][col] = piece;
            assert.equal(board.hasFiveInARow(piece, row, col), false);
            boardData[row][++col] = piece;
            assert.equal(board.hasFiveInARow(piece, row, col), false);
            boardData[row][++col] = piece;
            assert.equal(board.hasFiveInARow(piece, row, col), false);
            boardData[row][++col] = piece;
            assert.equal(board.hasFiveInARow(piece, row, col), false);
            boardData[row][++col] = piece;
            assert.equal(board.hasFiveInARow(piece, row, col), true);
        });

        it('should work vertically', function(){
            let board = new Board();
            let boardData = board.board;

            let col = 6;
            let piece = 'x';
            boardData[4][col] = piece;
            assert.equal(board.hasFiveInARow(piece, 4, col), false);
            boardData[5][col] = piece;
            assert.equal(board.hasFiveInARow(piece, 5, col), false);
            boardData[7][col] = piece;
            assert.equal(board.hasFiveInARow(piece, 7, col), false);
            boardData[8][col] = piece;
            assert.equal(board.hasFiveInARow(piece, 8, col), false);
            boardData[6][col] = piece;
            assert.equal(board.hasFiveInARow(piece, 6, col), true);
        });

        it('should work diagnally', function(){
            let board = new Board();
            let boardData = board.board;

            let piece = 'o';
            boardData[1][2] = piece;
            assert.equal(board.hasFiveInARow(piece, 1, 2), false);
            boardData[2][3] = piece;
            assert.equal(board.hasFiveInARow(piece, 2, 3), false);
            boardData[3][4] = piece;
            assert.equal(board.hasFiveInARow(piece, 3, 4), false);
            boardData[4][5] = piece;
            assert.equal(board.hasFiveInARow(piece, 4, 5), false);
            boardData[0][1] = piece;
            assert.equal(board.hasFiveInARow(piece, 0, 1), true);
        });
    });

});