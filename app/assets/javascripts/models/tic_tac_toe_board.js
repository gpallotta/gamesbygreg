Games.Models.TictactoeBoard = Backbone.Model.extend({

  board: [ [], [], [] ],

  round: 1,

  removeOldPieces: function() {
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        var piece = Math.abs(this.board[y][x]);
        if (piece === this.round-6 || piece === this.round+6) {
          this.board[y][x] = undefined;
          return [y,x];
        }
      }
    }
  },

  resetVars: function() {
    _.times(3, function(i) {
      delete this.board[i];
      this.board[i] = [];
    }, this);
    this.round = 1;
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

  // 0,0  |  1,1  |  2,2
  // 0,2  |  1,1  |  2,0

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
