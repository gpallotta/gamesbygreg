Games.Views.TictactoeHuman = Games.Views.Tictactoe.extend({

  playingStates: { watching: 0, joining: 1, waiting: 2, playing: 3 },

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

  handleClick: function(e) {
    if (this.currentPlayer === this.playerNum) {
      var pieceToAdd = this.round * this.model.getMultiplier(this.round);
      var index = this.getXYIndex(e);
      var existingPiece = this.model.board[ index[0] ][ index[1] ];
      if (existingPiece === undefined || existingPiece === '' || existingPiece === 0) {
        this.hideYourTurnMessage();
        this.model.setPiece(pieceToAdd, index);
        this.model.removeOldPieces(this.round);
        this.boardRef.set(this.model.board);
        this.roundRef.set(this.round+1);
        this.checkWin(this.name);
        this.setCurrentPlayer();
      }
    }
  },

  setCurrentPlayer: function() {
    var num = (this.currentPlayer + 1)%2;
    this.gameRef.child('currentPlayer').set(num);
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

  displayWin: function() {
    $('#winner').html(this.winner + ' wins!');
    $('#winner').show();
    var view = new Games.Views.TictactoeDispatcher();
    $('#buttons-after-win').html(view.render().el);
    this.myPlayerRef.child('online').remove();
    this.myPlayerRef.child('name').set('');
  },

  startGame: function() {
    this.model.resetVars();
    this.roundRef.set(1);
    this.currentState = this.playingStates.playing;
    this.gameRef.child('currentPlayer').set(0);
    this.delegateEvents();
  },

  showOpponentTurnMessage: function() {
    $('#opponent-turn').fadeIn();
  },

  hideOpponentTurnMessage: function() {
    $('#opponent-turn').hide();
  },

  setFirebaseRefs: function() {
    this.gameRef = new Firebase('https://games-by-greg.firebaseIO.com');
    this.playersRef = new Firebase('https://games-by-greg.firebaseIO.com/players');
    this.roundRef = new Firebase('https://games-by-greg.firebaseIO.com/round');
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
          $('#waiting-for-opponent').show(); // waiting for other player
        }
      } else {
        $('#waiting-for-opponent').hide();
        that.startGame(); // start game - both players are here
      }
    });
    this.gameRef.child('currentPlayer').on('value', function(snapshot) { // update current player
      that.currentPlayer = snapshot.val();
    });
    this.roundRef.on('value', function(snapshot) {
      that.round = snapshot.val();
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
