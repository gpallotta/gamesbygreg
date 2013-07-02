Games.Views.TictactoeGame = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/game'],

  winner: false,

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
    this.model.on('win', this.displayWin, this);
    this.setFirebaseRefs();
    this.watchFirebaseData();
  },

  setFirebaseRefs: function() {
    this.currentPlayerRef = new Firebase('https://games-by-greg.firebaseIO.com/currentPlayer');
    this.boardRef = new Firebase('https://games-by-greg.firebaseIO.com/board');
    this.player0Ref = new Firebase('https://games-by-greg.firebaseIO.com/players/player0');
    this.player1Ref = new Firebase('https://games-by-greg.firebaseIO.com/players/player1');
    this.playersRef = new Firebase('https://games-by-greg.firebaseIO.com/players');
  },

  watchFirebaseData: function() {
    var that = this;
    this.currentPlayerRef.on('value', function(snapshot) {
      that.currentPlayer = snapshot.val();
    });
    this.boardRef.on('value', function(snapshot) {
      if (that.model) {
        that.displayPieces(that.model.board);
        that.checkWin(that.currentPlayer);
      }
    });
    this.player0Ref.on('value', function(snapshot) {
      that.name0 = snapshot.val().name;
      if (that.name0 === '') {
        that.showWaitingMessage();
        that.undelegateEvents();
        that.model.resetVars();
      } else {
        that.hideWaitingMessage();
        that.delegateEvents();
      }
    });
    this.player1Ref.on('value', function(snapshot) {
      that.name1 = snapshot.val().name;
      if (that.name1 === '') {
        that.showWaitingMessage();
        that.undelegateEvents();
        that.model.resetVars();
      } else {
        that.hideWaitingMessage();
        that.delegateEvents();
      }
    });
  },

  showWaitingMessage: function() {
    $('#waiting-for-opponent').show();
  },

  hideWaitingMessage: function() {
    $('#waiting-for-opponent').hide();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  handleClick: function(e) {
    if (this.currentPlayer === this.options.name) {
      var pieceToAdd = this.model.round * this.model.getMultiplier();
      var index = this.getXYIndex(e);
      var existingPiece = this.model.board[ index[0] ][ index[1] ];
      if (existingPiece === undefined || existingPiece === '' || existingPiece === 0) {
        this.model.setPiece(pieceToAdd, index);
        this.checkWin(this.currentPlayer);
        this.toggleCurrentPlayer();
      }
    }
  },

  toggleCurrentPlayer: function() {

    if (this.currentPlayer === this.name0) {
      this.currentPlayerRef.set(this.name1);
    } else {
      this.currentPlayerRef.set(this.name0);
    }
  },

  getXYIndex: function(e) {
    var squareId = e.currentTarget.id;
    return this.translate[squareId];
  },

  checkWin: function(name) {
    if (this.model.checkWin()) {
      this.winner = name;
      this.model.trigger('win');
    }
  },

  displayPieces: function(board) {
    var piece, key;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        piece = board[i][j];
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

  getKeyByValue: function(value) {
    for (var key in this.translate) {
      if ( this.translate[key].toString() == value.toString() ) {
        return key;
      }
    }
  },

  displayWin: function() {
    this.model.resetVars();
    $('#winner').html(this.winner + ' wins!');
    $('#winner').show();
    this.player0Ref.child('online').remove();
    this.player0Ref.child('name').set('');
    this.player1Ref.child('online').remove();
    this.player1Ref.child('name').set('');
    var view = new Games.Views.TictactoeIndex();
    $('#buttons-after-win').html(view.render().el);
  }

});
