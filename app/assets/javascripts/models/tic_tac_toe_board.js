Games.Models.TictactoeBoard = Backbone.Model.extend({

  round: 1,

  board: [ [0,0,0], [0,0,0], [0,0,0] ],

  initialize: function() {
    var that = this;
    this.boardRef = new Firebase('https://games-by-greg.firebaseIO.com/board');
    this.roundRef = new Firebase('https://games-by-greg.firebaseIO.com/round');
    this.boardRef.on('value', function(snapshot) {
      if (snapshot.val()) {
        that.board = snapshot.val();
      }
    });
    this.roundRef.on('value', function(snapshot) {
      that.round = snapshot.val();
    });
  },

  removeOldPieces: function() {
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        var piece = Math.abs(this.board[y][x]);
        if (piece === this.round-6 || piece === this.round+6) {
          this.board[y][x] = '';
          return [y,x];
        }
      }
    }
  },

  setBoard: function(board) {
    this.board = board;
  },

  setPiece: function(piece, index) {
    this.board[ index[0] ][ index[1] ] = piece;
    this.round += 1;
    this.boardRef.set(this.board);
    this.roundRef.set(this.round);
  },

  resetVars: function() {
    _.times(3, function(i) {
      delete this.board[i];
      this.board[i] = [];
    }, this);
    this.round = 1;
    this.winner = false;
  },

  getMultiplier: function() {
    if (this.round % 2 === 0) {
      return -1;
    } else {
      return 1;
    }
  },

  checkWin: function() {
    var horizOne   = this.checkForThree( [0,0],[0,1],[0,2] );
    var horizTwo   = this.checkForThree( [1,0],[1,1],[1,2] );
    var horizThree = this.checkForThree( [2,0],[2,1],[2,2] );
    var vertOne   = this.checkForThree( [0,0],[1,0],[2,0] );
    var vertTwo   = this.checkForThree( [0,1],[1,1],[2,1] );
    var vertThree = this.checkForThree( [0,2],[1,2],[2,2] );
    var diagOne    = this.checkForThree( [0,0],[1,1],[2,2] );
    var diagTwo    = this.checkForThree( [0,2],[1,1],[2,0] );
    if (vertOne || vertTwo || vertThree || horizOne || horizTwo ||
      horizThree || diagOne || diagTwo) {
      return true;
    }
  },

  checkForThree: function(space1, space2, space3) {
    var posWin = 0;
    var negWin = 0;
    _.each([space1, space2, space3], function(index) {
        var piece = this.board[ index[0] ][ index[1] ];
          if (piece < 0) {
          negWin++;
        } else if (piece > 0) {
          posWin++;
        }
      }, this);
    if (posWin === 3 || negWin === 3) {
      return true;
    }
    return false;
  }

});
