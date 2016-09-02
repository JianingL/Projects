/**
 * Created by Jianing on 15-7-22.
 */
var app = angular.module('connect5', []);
app.controller('GameController', GameController);

function GameController($scope){
    var boardw = 15;
    var boardh = 15;
    var chessRecord = [];
    $scope.currentPlayer = 'x';
    $scope.players = {
        'x': '胖对象',
        'o': '胖胖脸'
    };
    $scope.photo = {
        'x': 'assets/x.jpeg',
        'o': 'assets/o.JPG'
    };
    $scope.recordx=0;
    $scope.recordo=0;

    function init(){
        $scope.board = new Array(boardw);
        for (var i=0;i<boardw;i++){
            $scope.board[i]= new Array(boardh);
            for(var k=0;k<boardh;k++){
                $scope.board[i][k]='';
            }
        }
    }
    $scope.reset = init;
    $scope.resetRecord = function () {
        $scope.recordx=0;
        $scope.recordo=0;
    };
    $scope.undo = function(){
        $scope.board[chessRecord[chessRecord.length-1][0]][chessRecord[chessRecord.length-1][1]] = '';
        chessRecord.pop();
        endTurn();
    };
    $scope.play = function(row, col){
        if($scope.board[row][col] !=''){
            sweetAlert({
                title: "you cannot put it here",
                imageUrl: "assets/cannot.jpg"
            });
        }else{
            $scope.board[row][col] = $scope.currentPlayer;
            if(checkVictory(row,col)){
                announceWinner();

            }else if(checkDraw()){
                announceDraw();
            }else{
                endTurn();
            }
            chessRecord.push([row,col]);
        }
    };

    function checkVictory(row,col){
        //check rows
        var b = $scope.board;
        for(var i=col-4;i<col+1;i++){
            if(checkValid(row,i) && checkValid(row,i+1) && checkValid(row,i+2) && checkValid(row,i+3) && checkValid(row,i+4) && b[row][col] !='') return true;
        }
        for(var i=row-4;i<row+1;i++){
            if(checkValid(i,col) && checkValid(i+1,col) && checkValid(i+2,col) && checkValid(i+3,col) && checkValid(i+4,col) && b[row][col] !='') return true;
        }
        for(var i=-4;i<1;i++){
            if(checkValid(row+i,col+i) && checkValid(row+i+1,col+i+1) && checkValid(row+i+2,col+i+2) && checkValid(row+i+3,col+i+3) && checkValid(row+i+4,col+i+4) && b[row][col] !='') return true;
        }
        for(var i=-4;i<1;i++){
            if(checkValid(row-i,col+i) && checkValid(row-i-1,col+i+1) && checkValid(row-i-2,col+i+2) && checkValid(row-i-3,col+i+3) && checkValid(row-i-4,col+i+4) && b[row][col] !='') return true;
        }
        return false;
    }
    function checkValid(row, col){
        if(row<0 || col<0 || row>=boardw || col>=boardh) return false;
        if($scope.board[row][col] != $scope.currentPlayer) return false;
        return true;
    }

    function announceWinner(){
        sweetAlert({
                title: "The winner is "+$scope.players[$scope.currentPlayer],
                imageUrl: "assets/win.jpg"
            });
        if($scope.currentPlayer=='x'){
            $scope.recordx++;
        }else{
            $scope.recordo++;
        }
    }
    function checkDraw(){
        var b = $scope.board;
        var count=0;
        for(var k=0;k<boardh;k++){
            for (var i=0;i<boardw;i++){
                if(b[k][i] != '') count ++;
            }
        }
        return count == boardh*boardw;
    }
    function announceDraw(){
        sweetAlert({
            title: "It is a draw",
            imageUrl: "assets/draw.jpeg"
        });
    }
    function endTurn(){
        if($scope.currentPlayer == 'x'){
            $scope.currentPlayer = 'o';
        }else{
            $scope.currentPlayer = 'x';
        }
    }


    init();
}
