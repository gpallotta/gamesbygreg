Games.Views.TictactoeIndex = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/index'],

  events: {
    'click #ttt-start-button': 'startGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  startGame: function() {
    $('#start-button').hide();
    var board = new Games.Models.TictactoeBoard();
    var view = new Games.Views.TictactoeGame({model: board});
    $('#container').html(view.render().el);
  }

});
