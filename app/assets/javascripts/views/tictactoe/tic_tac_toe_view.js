Games.Views.Tictactoe = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/game'],

  winner: false,

  round: 1,

  events: {
    'click .square': 'handleClick'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

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

  getKeyByValue: function(value) {
    for (var key in this.translate) {
      if ( this.translate[key].toString() == value.toString() ) {
        return key;
      }
    }
  }

});
