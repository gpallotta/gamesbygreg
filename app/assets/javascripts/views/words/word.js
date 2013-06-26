Games.Views.Word = Backbone.View.extend({

  template: HandlebarsTemplates['words/word'],

  events: {
    'submit #guess-form': 'checkGuess',
    'keyup #new_letter_guess': 'replaceInput'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('guess', this.render, this);
    this.model.on('win', this.displayWin, this);
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
    this.model.trigger('guess');
    this.resetForm();
    this.alreadyGuessedErrorContent(alreadyGuessed);
    this.checkWin();
  },

  alreadyGuessedErrorContent: function(html) {
    $('#already-guessed-error').html(html);
  },

  checkWin: function() {
    if (this.model.checkWin()) {
      this.model.trigger('win');
    }
  },

  resetForm: function() {
    $('#new_letter_guess').focus();
    $('#guess-form')[0].reset();
  },

  displayWin: function() {
    var index = new Games.Views.WordsIndex();
    $('#guess-form input').attr("disabled", "disabled");
    $('#win-message').show();
    $('#container').append(index.render().el);
  },

  replaceInput: function(e) {
    var entry = String.fromCharCode(e.which);
    $('#new_letter_guess').val(entry);
  }

});
