Games.Models.TictactoeGregbot = Games.Models.TictactoeBoard.extend({

  resetVars: function() {
    _.times(3, function(i) {
      delete this.board[i];
      this.board[i] = ['','',''];
    }, this);
    this.winner = false;
  },

  setPiece: function(piece, index) {
    this.board[ index[0] ][ index[1] ] = piece;
  }

});
