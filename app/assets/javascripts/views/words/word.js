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
      display: this.model.display(),
      guessedLetters: this.model.guessedLetters
    }));
    return this;
  },

  checkGuess: function(e) {
    e.preventDefault();
    var letter = $('#new_letter_guess').val();
    var alreadyGuessed = this.model.checkLetter(letter);
    this.alreadyGuessedErrorContent('Already guessed');
    this.model.trigger('guess');
    this.resetForm();
    this.alreadyGuessedErrorContent(alreadyGuessed);
    this.checkWin();
  },

  alreadyGuessedErrorContent: function(html) {
    $('#already-guessed-error').html(html);
  },

  // underscores: function() {
  //   str = '';
  //   if (this.model.get('body') === undefined) {
  //     return '';
  //   } else {
  //     len = this.model.get('body').length;
  //     for (var i = 0; i < len; i++) {
  //       str += '_';
  //     }
  //     return str;
  //   }
  // },

  checkWin: function() {
    if (this.model.checkWin()) {
      this.model.trigger('win');
    }
  },

  resetForm: function() {
    $('#new_letter_guess').focus();
    $('#guess-form')[0].reset();
  },

  startOver: function() {
    var index = new Games.Views.WordsIndex();
    $('#win-message').show();
    $('#container').append(index.render().el);
  }

});
