Games.Routers.Words = Backbone.Router.extend({

  routes: {
    '': 'index'
  },

  index: function() {
    var view = new Games.Views.WordsIndex();
    $('#container').html(view.render().el);
  }

});
