/**
 * Created by pengwei on 3/14/17.
 */

'use strict';

class Board{
    constructor(){
        this.boardWidth = 15;
        this.boardHeight = 15;
        this.board = [];
        for (let i = 0; i < this.boardHeight; i++) {
            this.board[i] = [];
            for (let k = 0; k < this.boardWidth; k++) {
                this.board[i][k] = '';
            }
        }
    }

    canPlacePiece(row, col){
        if (row < 0 || col < 0 || row >= this.boardWidth || col >= this.boardHeight) return false;
        return this.board[row][col] === '';
    }

    placePiece(piece, row, col){
        this.board[row][col] = piece;
    }

    hasFiveInARow(piece, row, col){
        let b = this.board;
        for (let i = col - 4; i < col + 1; i++) {
            if (this.isValid(piece, row, i) && this.isValid(piece, row, i + 1) && this.isValid(piece, row, i + 2) && this.isValid(piece, row, i + 3) && this.isValid(piece, row, i + 4) && b[row][col] != '') return true;
        }
        for (let i = row - 4; i < row + 1; i++) {
            if (this.isValid(piece, i, col) && this.isValid(piece, i + 1, col) && this.isValid(piece, i + 2, col) && this.isValid(piece, i + 3, col) && this.isValid(piece, i + 4, col) && b[row][col] != '') return true;
        }
        for (let i = -4; i < 1; i++) {
            if (this.isValid(piece, row + i, col + i) && this.isValid(piece, row + i + 1, col + i + 1) && this.isValid(piece, row + i + 2, col + i + 2) && this.isValid(piece, row + i + 3, col + i + 3) && this.isValid(piece, row + i + 4, col + i + 4) && b[row][col] != '') return true;
        }
        for (let i = -4; i < 1; i++) {
            if (this.isValid(piece, row - i, col + i) && this.isValid(piece, row - i - 1, col + i + 1) && this.isValid(piece, row - i - 2, col + i + 2) && this.isValid(piece, row - i - 3, col + i + 3) && this.isValid(piece, row - i - 4, col + i + 4) && b[row][col] != '') return true;
        }
        return false;
    }

    isValid(piece,  row, col){
        if (row < 0 || col < 0 || row >= this.boardWidth || col >= this.boardHeight) return false;
        if (this.board[row][col] !== piece) return false;
        return true;
    }

    isFull(){
        let count = 0;
        for (let k = 0; k < this.boardHeight; k++) {
            for (let i = 0; i < this.boardWidth; i++) {
                if (this.board[k][i] !== '') count++;
            }
        }
        return count === this.boardHeight * this.boardWidth;
    }
}

module.exports = Board;