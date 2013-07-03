Games.Views.TictactoeGregbot = Games.Views.Tictactoe.extend({

  initialize: function() {
    this.model = new Games.Models.TictactoeGregbot();
    this.model.on('win', this.displayWin, this);
  },

  handleClick: function(e) {
    var pieceToAdd = this.round * this.model.getMultiplier();
    var index = this.getXYIndex(e);
    var existingPiece = this.model.board[ index[0] ][ index[1] ];
    if (existingPiece === undefined || existingPiece === '' || existingPiece === 0) {
      this.placeHumanPiece(pieceToAdd, index);
      if (!this.winner) {
        this.hideYourTurnMessage();
        this.displayGregbotThinking();
        var _this = this;
        setTimeout(function() {
          _this.gregbotMove();
        }, 1000);
      }
    }
  },

  placeHumanPiece: function(pieceToAdd, index) {
    this.model.setPiece(pieceToAdd, index);
    this.model.removeOldPieces(this.round);
    this.round += 1;
    this.displayPieces();
    this.checkWin('Human');
  },

  displayPieces: function() {
    var piece, key;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        piece = this.model.board[i][j];
        key = this.getKeyByValue([i,j]);
        if (piece && piece > 0) {
          $('#' + key).css('background-color', '#C0392B'); // if a positive piece, add x
        } else if (piece && piece < 0) {
          $('#' + key).css('background-color', '#34495E'); // if a negative piece, add o
        } else {
          $('#' + key).css('background-color', 'white');
        }
      }
    }
  },

  displayGregbotThinking: function() {
    $('#gregbot-thinking').fadeIn();
  },

  hideGregbotThinking: function() {
    $('#gregbot-thinking').hide();
  },

  showYourTurnMessage: function() {
    $('#your-turn').fadeIn();
  },

  hideYourTurnMessage: function() {
    $('#your-turn').hide();
  },

  gregbotMove: function() {
    var index = Gregbot.move(this.model.board, this.round);
    var piece = this.round * -1;
    this.model.setPiece(piece, index);
    this.hideGregbotThinking();
    this.model.removeOldPieces(this.round);
    this.round += 1;
    this.displayPieces();
    this.showYourTurnMessage();
    this.checkWin('Gregbot');
  },

  displayWin: function() {
    this.undelegateEvents();
    this.model.resetVars();
    $('#winner').html(this.winner + ' wins!');
    $('#winner').show();
    var view = new Games.Views.TictactoeDispatcher();
    $('#buttons-after-win').html(view.render().el);
    this.hideYourTurnMessage();
  }

});
