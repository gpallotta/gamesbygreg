Games.Views.Word = Backbone.View.extend({

  template: HandlebarsTemplates['words/word'],


  endMessage: '',

  events: {
    'submit #guess-form': 'checkGuess',
    'keyup #new_letter_guess': 'replaceInput'
  },

  initialize: function() {
    this.canvas = new Games.Views.Canvas();
    this.drawFunctions = [
      function() {},
      this.canvas.noose,
      this.canvas.head,
      this.canvas.body,
      this.canvas.leftLeg,
      this.canvas.rightLeg,
      this.canvas.leftArm,
      this.canvas.rightArm,
      this.canvas.sadFace
    ];
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

    var alreadyGuessed = this.alreadyGuessed(letter);
    this.model.checkLetter(letter);
    this.model.trigger('guess');
    this.drawFunctions[this.model.wrongGuessedLetters.length]();
    this.showAlreadyGuessed(alreadyGuessed);

    this.resetForm();
    this.checkEndGame();
  },

  alreadyGuessed: function(letter) {
    if (this.model.guessedLetters.indexOf(letter) > -1) {
      return true;
    } else {
      return false;
    }
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
    $('#container').append(index.render().el);
  },

  replaceInput: function(e) {
    var entry = String.fromCharCode(e.which);
    $('#new_letter_guess').val(entry);
  }

});
