Games.Views.Word = Backbone.View.extend({

  template: HandlebarsTemplates['words/word'],

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({
      word: this.model
    }));
    return this;
  }

});
