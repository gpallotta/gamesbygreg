Games.Views.TictactoeHuman = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/game'],

  playingStates: { watching: 0, joining: 1, waiting: 2, playing: 3 },

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
    this.model = new Games.Models.TictactoeHuman();
    this.model.on('win', this.displayWin, this);
    this.model.resetVars();
    this.currentState = this.playingStates.watching;
    this.setFirebaseRefs();
    this.waitToJoin();
    this.watchFirebaseData();
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
    if (this.currentPlayer === this.playerNum) {
      var pieceToAdd = this.model.round * this.model.getMultiplier();
      var index = this.getXYIndex(e);
      var existingPiece = this.model.board[ index[0] ][ index[1] ];
      if (existingPiece === undefined || existingPiece === '' || existingPiece === 0) {
        this.model.setPiece(pieceToAdd, index);
        this.checkWin(this.name);
        this.setCurrentPlayer();
      }
    }
  },

  setCurrentPlayer: function() {
    // if it's 1, we want 0
    // if it's 0, we want 1
    var num = this.currentPlayer + 1;
    this.gameRef.child('currentPlayer').set(num % 2);
  },

  getXYIndex: function(e) {
    var squareId = e.currentTarget.id;
    return this.translate[squareId];
  },

  checkWin: function(playerName) {
    if (this.model.checkWin()) {
      this.winner = playerName;
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
    // this.model.resetVars();
    $('#winner').html(this.winner + ' wins!');
    $('#winner').show();
    var view = new Games.Views.TictactoeDispatcher();
    $('#buttons-after-win').html(view.render().el);
    this.myPlayerRef.child('online').remove();
    this.myPlayerRef.child('name').set('');
  },

  startGame: function() {
    this.model.resetVars();
    this.currentState = this.playingStates.playing;
    this.gameRef.child('currentPlayer').set(0);
    this.delegateEvents();
  },

  setFirebaseRefs: function() {
    this.gameRef = new Firebase('https://games-by-greg.firebaseIO.com');
    this.playersRef = new Firebase('https://games-by-greg.firebaseIO.com/players');
    this.boardRef = new Firebase('https://games-by-greg.firebaseIO.com/board');
  },

  watchFirebaseData: function() {
    var that = this;
    this.boardRef.on('value', function(snapshot) {
      if (that.model) {
        that.displayPieces(that.model.board);
        that.checkWin(that.currentPlayer);
      }
    });
    this.playersRef.on('value', function(snapshot) {
      var online0 = snapshot.val().player0.online;
      var online1 = snapshot.val().player1.online;
      if (online0 === undefined || online1 === undefined) {
        that.undelegateEvents(); // undelegate events initially - will delegate once game starts
        if (!that.winner) {
          $('#waiting-for-opponent').show();
        }
      } else {
        $('#waiting-for-opponent').hide();
        that.startGame(); // start game - both players are here
      }
    });
    this.gameRef.child('currentPlayer').on('value', function(snapshot) { // update current player
      that.currentPlayer = snapshot.val();
    });
  },

  waitToJoin: function() {
    var that = this;
    this.gameRef.child('/players/player0/online').on('value', function(snapshot) {
      if (snapshot.val() === null && that.currentState === 0) {
        that.tryToJoin(0);
      }
    });

    this.gameRef.child('/players/player1/online').on('value', function(snapshot) {
      if (snapshot.val() === null && that.currentState === 0) {
        that.tryToJoin(1);
      }
    });
  },

  tryToJoin: function(playerNum) {
    var that = this;
    var name = prompt('Enter name');
    while (name === '' || name === undefined) {
      name = prompt('Cannot be blank');
    }
    this.currentState = this.playingStates.joining;
    this.playersRef.child('player' + playerNum + '/online').transaction( function(onlineVal) {
      return (onlineVal === null);
    }, function(error, committed) {
      if (committed) { // we got in
        that.myPlayerRef = that.playersRef.child('player' + playerNum);
        that.playerNum = playerNum; // set playerNum - used to compare against currentPlayer
        that.setOnDisconnect(); // set disconenct behavior to clear online status
        that.setCurrentPlayer(playerNum);
        that.playersRef.child('player' + playerNum + '/name').set(name); // set player name
        that.name = name; // set name on view
        that.currentState = that.playingStates.waiting; // set playing state
        that.opponentRef = that.playersRef.child('player' + (1 - playerNum));
      }
    });
  },

  setOnDisconnect: function() {
    this.myPlayerRef.child('online').onDisconnect().remove();
    this.myPlayerRef.child('name').onDisconnect().set('');
  }

});
