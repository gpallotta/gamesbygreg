Games.Models.TictactoeHuman = Games.Models.TictactoeBoard.extend({

  initialize: function() {
    var that = this;
    this.boardRef = new Firebase('https://games-by-greg.firebaseIO.com/board');
    this.boardRef.on('value', function(snapshot) {
      if (snapshot.val()) {
        that.board = snapshot.val();
      }
    });
  },

  setPiece: function(piece, index) {
    this.board[ index[0] ][ index[1] ] = piece;
    this.boardRef.set(this.board);
  },

  resetVars: function() {
    _.times(3, function(i) {
      delete this.board[i];
      this.board[i] = ['','',''];
    }, this);
    this.boardRef.set(this.board);
    this.winner = false;
  }

});
