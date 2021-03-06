Games.Routers.Main = Backbone.Router.extend({

  routes: {
    'hangman': 'hangman',
    'tictactoe': 'tictactoe'
  },

  hangman: function() {
    var view = new Games.Views.WordsIndex();
    $('#main-container').html(view.render().el);
    $('#canvas-container').show();
  },

  tictactoe: function() {
    var view = new Games.Views.TictactoeDispatcher();
    $('#canvas-container').hide();
    $('#main-container').html(view.render().el);
  }

});
