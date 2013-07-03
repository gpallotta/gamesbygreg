Games.Views.TictactoeDispatcher = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/index'],

  playingStates: { watching: 0, joining: 1, playing: 2 },

  currentState: false,

  events: {
    'click #ttt-human': 'humanGame',
    'click #ttt-gregbot': 'gregbotGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  initialize: function() {
    var that = this;
    var online0, online1;
  },

  humanGame: function() {
    var view = new Games.Views.TictactoeHuman();
    $('#container').html(view.render().el);
  },

  gregbotGame: function() {
    var view = new Games.Views.TictactoeGregbot();
    $('#container').html(view.render().el);
    $('#your-turn').fadeIn();
  },

  hideButtons: function() {
    $('#ttt-human').hide();
    $('#ttt-gregbot').hide();
  }

});
