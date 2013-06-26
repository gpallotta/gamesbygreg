Games.Views.Word = Backbone.View.extend({

  template: HandlebarsTemplates['words/word'],

  events: {
    'submit #guess-form': 'checkGuess'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('guess', this.render, this);
    this.model.on('win', this.startOver, this);
  },

  render: function() {
    $(this.el).html(this.template({
      word: this.model.toJSON(),
      display: this.model.display(),
      guessedLetters: this.model.guessedLetters
    }));
    return this;
  },

  startOver: function() {
    $('#container').append('You win!');
    var index = new Games.Views.WordsIndex();
    $('#container').html(index.render().el);
  },

  checkGuess: function(e) {
    e.preventDefault();
    var letter = $('#new_letter_guess').val();
    this.model.checkLetter(letter);
    $('#guess-form')[0].reset();
    this.model.trigger('guess');
    $('#new_letter_guess').focus();
    this.checkWin();
  },

  checkWin: function() {
    if (this.model.checkWin()) {
      this.model.trigger('win');
    }
  }

});
