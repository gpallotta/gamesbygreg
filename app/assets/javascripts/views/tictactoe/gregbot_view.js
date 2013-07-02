Games.Views.TictactoeGregbot = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/game'],

  winner: false,

  round: 1,

  translate: {
    'top-left': [0,0],
    'top-middle': [0,1],
    'top-right': [0,2],
    'middle-left': [1,0],
    'middle-middle': [1,1],
    'middle-right': [1,2],
    'bottom-left': [2,0],
    'bottom-middle': [2,1],
    'bottom-right': [2,2]
  },

  events: {
    'click .square': 'handleClick'
  },

  initialize: function() {
    this.model = new Games.Models.TictactoeGregbot();
    this.model.on('win', this.displayWin, this);
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  handleClick: function(e) {
    var pieceToAdd = this.round * this.model.getMultiplier();
    var index = this.getXYIndex(e);
    var existingPiece = this.model.board[ index[0] ][ index[1] ];
    if (existingPiece === undefined || existingPiece === '' || existingPiece === 0) {
      this.model.setPiece(pieceToAdd, index);
      this.model.removeOldPieces(this.round);
      this.round += 1;
      this.displayPieces();
      this.checkWin('Human');
      if (!this.winner) {
        this.displayGregbotThinking();
        var _this = this;
        setTimeout(function() {
          _this.gregbotMove();
        }, 1000);
      }
    }
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

  getXYIndex: function(e) {
    var squareId = e.currentTarget.id;
    return this.translate[squareId];
  },

  displayGregbotThinking: function() {
    $('#gregbot-thinking').fadeIn();
  },

  hideGregbotThinking: function() {
    $('#gregbot-thinking').hide();
  },

  getKeyByValue: function(value) {
    for (var key in this.translate) {
      if ( this.translate[key].toString() == value.toString() ) {
        return key;
      }
    }
  },

  gregbotMove: function() {
    var index = Gregbot.move(this.model.board, this.round);
    var piece = this.round * -1;
    this.model.setPiece(piece, index);
    this.hideGregbotThinking();
    this.model.removeOldPieces(this.round);
    this.round += 1;
    this.displayPieces();
    this.checkWin('Gregbot');
  },

  checkWin: function(name) {
    if (this.model.checkWin(name)) {
      this.winner = name;
      this.model.trigger('win');
    }
  },

  displayWin: function() {
    this.model.resetVars();
    $('#winner').html(this.winner + ' wins!');
    $('#winner').show();
    var view = new Games.Views.TictactoeDispatcher();
    $('#buttons-after-win').html(view.render().el);
  }


});
