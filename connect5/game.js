/**
 * Created by JianingLiu on 9/10/16.
 */
var events = require('events');
var eventEmitter = new events.EventEmitter();

var boardw = 15;
var boardh = 15;
var currentPlayer = 'x';
var board;
var chessRecord = [];

function init() {
    board = new Array(boardw);
    for (var i = 0; i < boardw; i++) {
        board[i] = new Array(boardh);
        for (var k = 0; k < boardh; k++) {
            board[i][k] = '';
        }
    }
}

function play(row, col){
    if (board[row][col] != '') {
        eventEmitter.emit('invalidLocation');
    } else {
        board[row][col] = currentPlayer;
        if (checkVictory(row, col)) {
            announceWinner();

        } else if (checkDraw()) {
            announceDraw();
        } else {
            endTurn();
        }
        chessRecord.push([row, col]);
    }

    emitGameState();
}

function checkVictory(row, col) {
    //check rows
    var b = board;
    for (var i = col - 4; i < col + 1; i++) {
        if (checkValid(row, i) && checkValid(row, i + 1) && checkValid(row, i + 2) && checkValid(row, i + 3) && checkValid(row, i + 4) && b[row][col] != '') return true;
    }
    for (var i = row - 4; i < row + 1; i++) {
        if (checkValid(i, col) && checkValid(i + 1, col) && checkValid(i + 2, col) && checkValid(i + 3, col) && checkValid(i + 4, col) && b[row][col] != '') return true;
    }
    for (var i = -4; i < 1; i++) {
        if (checkValid(row + i, col + i) && checkValid(row + i + 1, col + i + 1) && checkValid(row + i + 2, col + i + 2) && checkValid(row + i + 3, col + i + 3) && checkValid(row + i + 4, col + i + 4) && b[row][col] != '') return true;
    }
    for (var i = -4; i < 1; i++) {
        if (checkValid(row - i, col + i) && checkValid(row - i - 1, col + i + 1) && checkValid(row - i - 2, col + i + 2) && checkValid(row - i - 3, col + i + 3) && checkValid(row - i - 4, col + i + 4) && b[row][col] != '') return true;
    }
    return false;
}
function checkValid(row, col) {
    if (row < 0 || col < 0 || row >= boardw || col >= boardh) return false;
    if (board[row][col] != currentPlayer) return false;
    return true;
}

function announceWinner() {
    eventEmitter.emit('announceWinner', currentPlayer);
}

function checkDraw() {
    var b = board;
    var count = 0;
    for (var k = 0; k < boardh; k++) {
        for (var i = 0; i < boardw; i++) {
            if (b[k][i] != '') count++;
        }
    }
    return count == boardh * boardw;
}

function announceDraw() {
    eventEmitter.emit('announceDraw');
}

function endTurn() {
    if (currentPlayer == 'x') {
        currentPlayer = 'o';
    } else {
        currentPlayer = 'x';
    }
}

function emitGameState(){
    console.log('emitGameState');
    eventEmitter.emit('gameState', {
        board: board,
        currentPlayer: currentPlayer
    });
}

function getGameState(){
    return {
        board: board,
        currentPlayer: currentPlayer
    };
}

function reset(){
    init();
    emitGameState();
}

function undo(){
    board[chessRecord[chessRecord.length-1][0]][chessRecord[chessRecord.length-1][1]] = '';
    chessRecord.pop();
    endTurn();
    emitGameState();
}
module.exports.getGameState = getGameState;
module.exports.init = init;
module.exports.on = eventEmitter.on.bind(eventEmitter);
module.exports.play = play;
module.exports.reset = reset;
module.exports.undo = undo;