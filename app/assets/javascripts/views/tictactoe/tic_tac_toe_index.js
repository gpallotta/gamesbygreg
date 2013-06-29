Games.Views.TictactoeIndex = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/index'],

  events: {
    'click #ttt-human': 'humanGame',
    'click #ttt-gregbot': 'gregbotGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  startGame: function(gregbot) {
    this.hideButtons();
    var board = new Games.Models.TictactoeBoard();
    var view = new Games.Views.TictactoeGame({model: board});
    view.setGregbot(gregbot);
    $('#container').html(view.render().el);
  },

  humanGame: function() {
    this.startGame(false);
  },

  gregbotGame: function() {
    bot = Gregbot;
    this.startGame(bot);
  },

  hideButtons: function() {
    $('#ttt-human').hide();
    $('#ttt-gregbot').hide();
  }

});
