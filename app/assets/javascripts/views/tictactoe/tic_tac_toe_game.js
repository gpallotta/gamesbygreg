Games.Views.TictactoeGame = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/game'],

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
    this.player1 = prompt('Enter name of player 1:');
    this.player2 = prompt('Enter name of player 2:');
    this.model.on('win', this.displayWin, this);
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  handleClick: function(e) {
    var pieceToAdd = this.model.round * this.model.getMultiplier();
    var index = this.getXYIndex(e);
    var existingPiece = this.model.board[ index[0] ][ index[1] ];
    if (existingPiece === undefined) {
      this.model.board[ index[0] ][ index[1] ] = pieceToAdd;
      this.handleAfterPiecePlace(index);
    }
  },

  getXYIndex: function(e) {
    var squareId = e.currentTarget.id;
    return this.translate[squareId];
  },

  handleAfterPiecePlace: function(index) {
    var oldIndex = this.model.removeOldPieces();
    this.displayPiece(index);
    if (oldIndex) { this.displayPiece(oldIndex); }
    this.model.round += 1;
    this.checkWin();
  },

  checkWin: function() {
    if (this.model.checkWin()) {
      alert('win');
      this.model.trigger('win');
    }
  },

  displayPiece: function(index) {
    var piece = this.model.board [ index[0] ][ index[1] ]; //get piece at current location (+/- num)
    var key = this.getKeyByValue(index); // get square id from arr
    if (piece && piece > 0) {
      $('#' + key).css('background-color', 'red'); // if a positive piece, add x
    } else if (piece && piece < 0) {
      $('#' + key).css('background-color', 'black'); // if a negative piece, add o
    } else {
      $('#' + key).css('background-color', 'white');
    }
  },

  getKeyByValue: function(value) {
    for (var key in this.translate) {
      if ( this.translate[key].toString() == value.toString() ) {
        return key;
      }
    }
  },

  displayWin: function() {
    this.model.clear();
    this.model.resetVars();
    var view = new Games.Views.TictactoeIndex();
    $('#canvas-container').hide();
    $('#container').html(view.render().el);
  }

});
