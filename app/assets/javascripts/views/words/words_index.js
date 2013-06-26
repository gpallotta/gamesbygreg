Games.Views.WordsIndex = Backbone.View.extend({

  template: HandlebarsTemplates['words/index'],

  events: {
    'click #start-button': 'startGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  startGame: function() {
    $('#start-button').hide();
    var id = Math.floor(Math.random()*7)+1;
    var word = new Games.Models.Word({id: id});
    word.fetch();
    var view = new Games.Views.Word({model: word});
    $('#container').append(view.render().el);
  }

});
