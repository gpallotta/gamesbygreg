Games.Views.TictactoeGame = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/game'],

  // gregbot: false,

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
    var that = this;
    this.model.on('win', this.displayWin, this);
    this.currentPlayerRef = new Firebase('https://games-by-greg.firebaseIO.com/currentPlayer');
    this.currentPlayerRef.on('value', function(snapshot) {
      that.currentPlayer = snapshot.val();
    });
    this.boardRef = new Firebase('https://games-by-greg.firebaseIO.com/board');
    this.player0Ref = new Firebase('https://games-by-greg.firebaseIO.com/players/player0');
    this.player1Ref = new Firebase('https://games-by-greg.firebaseIO.com/players/player1');
    // board is set properly here
    this.boardRef.on('value', function(snapshot) {
      if (that.model) {
        that.displayPieces(that.model.board);
        that.checkWin(that.currentPlayer);
      }
    });

    this.player0Ref.on('value', function(snapshot) {
      that.name0 = snapshot.val().name;
    });
    this.player1Ref.on('value', function(snapshot) {
      that.name1 = snapshot.val().name;
    });
  },

  // setGregbot: function(val) {
  //   this.gregbot = val;
  // },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  handleClick: function(e) {
    // debugger;
    if (this.currentPlayer === this.options.name) {
      var pieceToAdd = this.model.round * this.model.getMultiplier();
      var index = this.getXYIndex(e);
      var existingPiece = this.model.board[ index[0] ][ index[1] ];
      if (existingPiece === undefined || existingPiece === '' || existingPiece === 0) {
        this.model.setPiece(pieceToAdd, index);
        this.checkWin(this.currentPlayer);
        this.toggleCurrentPlayer();
        // if (this.gregbot && !this.winner) {
        //   this.displayGregbotThinking();
        //   var _this = this;
        //   setTimeout(function() {
        //     _this.gregbotMove();
        //   }, 1000);
        // }
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

  // displayGregbotThinking: function() {
  //   $('#gregbot-thinking').fadeIn();
  // },

  // hideGregbotThinking: function() {
  //   $('#gregbot-thinking').hide();
  // },

  // gregbotMove: function() {
  //   var index = this.gregbot.move(this.model.board, this.model.round);
  //   this.model.board[ index[0] ][ index[1] ] = this.model.round * -1;
  //   this.handleAfterPiecePlace(index, 'Gregbot');
  //   this.hideGregbotThinking();
  // },

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
    this.player1Ref.child('online').remove();
    var view = new Games.Views.TictactoeIndex();
    // $('#container').html(view.render().el);
    $('.board').append(view.render().el);

  }

});
