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
    //generate random id
    var word = new Games.Models.Word({id: 1});
    word.fetch({wait: true});
    var view = new Games.Views.Word({model: word});
    $('#container').append(view.render().el);
  }

});
