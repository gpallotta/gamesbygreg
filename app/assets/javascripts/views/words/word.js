Games.Views.Word = Backbone.View.extend({

  template: HandlebarsTemplates['words/word'],

  events: {
    'submit #guess-form': 'checkGuess',
    'keyup #new_letter_guess': 'replaceInput'
  },

  initialize: function() {
    this.canvas = new Games.Views.Canvas();
    this.watchTriggers();
  },

  watchTriggers: function() {
    this.model.on('change', this.render, this);
    this.model.on('guess', this.render, this);
    this.model.on('win', function() {
      this.endMessage = 'You win!';
      this.displayResult();
    }, this);
    this.model.on('lose', function() {
      this.endMessage = 'You lose';
      this.displayResult();
    }, this);
  },

  render: function() {
    $(this.el).html(this.template({
      display: this.model.display(),
      wrongLetters: this.model.wrongGuessedLetters
    }));
    return this;
  },

  checkGuess: function(e) {
    e.preventDefault();
    var letter = $('#new_letter_guess').val().toLowerCase();
    var alreadyGuessed = this.model.guessedLetters.indexOf(letter) > -1;
    this.model.checkLetter(letter);
    this.model.trigger('guess');
    this.canvas.callDrawFunctions([this.model.wrongGuessedLetters.length]);
    this.resetForm();
    this.showAlreadyGuessed(alreadyGuessed);
    this.checkEndGame();
  },

  showAlreadyGuessed: function(display) {
    if (display) {
      $('#already-guessed-error').show();
    } else {
      $('#already-guessed-error').hide();
    }
  },

  checkEndGame: function() {
    var result = this.model.checkEndGame();
    if (result === 'win') {
      this.model.trigger('win');
    } else if (result === 'lose') {
      this.model.trigger('lose');
    }
  },

  resetForm: function() {
    $('#new_letter_guess').focus();
    $('#guess-form')[0].reset();
  },

  displayResult: function() {
    var index = new Games.Views.WordsIndex();
    $('#guess-form input').attr("disabled", "disabled");
    $('#result-message').html(this.endMessage);
    if (this.endMessage === 'You lose') {
      $('#word-was').html('The word was ' + this.model.word());
    }
    $('#main-container').append(index.render().el);
  },

  replaceInput: function(e) {
    var entry = String.fromCharCode(e.which);
    $('#new_letter_guess').val(entry);
  }

});
