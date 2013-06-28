Games.Views.WordsIndex = Backbone.View.extend({

  template: HandlebarsTemplates['words/index'],

  events: {
    'click #hangman-start-button': 'startGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  startGame: function() {
    $('#start-button').hide();
    var id = Math.floor(Math.random()*136)+1;
    var word = new Games.Models.Word({id: id});
    word.fetch();
    var view = new Games.Views.Word({model: word});
    $('#container').html(view.render().el);
  }

});
