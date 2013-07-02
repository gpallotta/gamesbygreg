Games.Views.TictactoeIndex = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/index'],

  playingStates: { watching: 0, joining: 1, playing: 2 },

  currentState: false,

  events: {
    'click #ttt-human': 'humanGame'
    // 'click #ttt-gregbot': 'gregbotGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  initialize: function() {
    var that = this;
    var online0, online1;
    this.gameRef = new Firebase('games-by-greg.firebaseIO.com/');

    // this.gameRef.child('/players').on('value', function(snapshot) {
    //   if (snapshot.val() && snapshot.val().player0) {
    //     online0 = snapshot.val().player0.online;
    //   }
    //   if (snapshot.val() && snapshot.val().player1) {
    //     online1 = snapshot.val().player1.online;
    //   }
    //   if (online0 === true && online1 === true) {
    //     that.startGame();
    //   }
    // });
  },

  startGame: function() {
    // view.setGregbot(gregbot);
    var player0Ref = new Firebase('games-by-greg.firebaseIO.com/players/player0');
    var player1Ref = new Firebase('games-by-greg.firebaseIO.com/players/player1');
    player0Ref.child('online').onDisconnect().remove();
    player0Ref.child('name').onDisconnect().set('');
    player1Ref.child('online').onDisconnect().remove();
    player1Ref.child('name').onDisconnect().set('');

    var boardRef = new Firebase('https://games-by-greg.firebaseIO.com/board');
    boardRef.set( [ [], [], [] ] );

    var roundRef = new Firebase('https://games-by-greg.firebaseIO.com/round');
    roundRef.set(1);

    this.hideButtons();
    var board = new Games.Models.TictactoeBoard();
    var view = new Games.Views.TictactoeGame({model: board, name: this.name});
    $('#container').html(view.render().el);
  },

  // when this is called, user has clicked on play against human button
  humanGame: function() {
    this.currentState = this.playingStates.watching;
    this.waitToJoin();
  },

  // gregbotGame: function() {
  //   bot = Gregbot;
  // },

  hideButtons: function() {
    $('#ttt-human').hide();
    $('#ttt-gregbot').hide();
  },

  waitToJoin: function() {
    var that = this;
    this.gameRef.child('/players/player0/online').on('value', function(onlineSnap) {
      if (onlineSnap.val() === null && that.currentState === 0) {
        that.tryToJoin(0);
      }
    });

    this.gameRef.child('/players/player1/online').on('value', function(onlineSnap) {
      if (onlineSnap.val() === null && that.currentState === 0) {
        that.tryToJoin(1);
      }
    });
  },

  tryToJoin: function(playerNum) {
    var name = prompt('Enter name');
    while (name === '') {
      name = prompt('Cannot be blank');
    }
    var that = this;
    this.currentState = this.playingStates.joining;
    this.gameRef.child('players/player' + playerNum + '/online').transaction( function(onlineVal) {
      if (onlineVal === null) {
        return true;
      } else {
        return;
      }
    }, function(error, committed) {
      if (committed) {
        that.gameRef.child('/players/player' + playerNum + '/name').set(name);
        that.currentState = that.playingStates.playing;
        that.name = name;

        if (playerNum === 0) {
          that.gameRef.child('currentPlayer').set(name);
          var player0Ref = new Firebase('games-by-greg.firebaseIO.com/players/player0');
          player0Ref.child('name').set(name);
        } else {
          var player1Ref = new Firebase('games-by-greg.firebaseIO.com/players/player1');
          player1Ref.child('name').set(name);
        }

        that.startGame();
      }

    });
  }

});
