Games.Models.Word = Backbone.Model.extend({
  urlRoot: '/api/words',

  guessedLetters: [],

  wrongGuessCount: 0,

  word: function() {
    if (this.get('body')) {
      return this.get('body');
    } else {
      return '';
    }
  },

  display: function() {
    var word = this.word();
    len = word.length;
    return this.getString('', word, len);
  },

  getString: function(str, word, len) {
    for (var i = 0; i < len; i++) {
      letter = word[i];
      if (this.guessedLetters.indexOf(letter) > -1) {
        str += letter;
      } else {
        str += '_' ;
      }
    }
    return str;
  },

  checkLetter: function(letter) {
    letter = letter.toLowerCase();
    if (this.guessedLetters.indexOf(letter) < 0){

      if (this.word().indexOf(letter) < 0) {
        this.wrongGuessCount += 1;
      }
      this.guessedLetters.push(letter);
    }
  },

  checkEndGame: function() {
    if (this.get('body') === this.display()) {
      this.resetStats();
      return 'win';
    } else if (this.wrongGuessCount === 7) {
      this.resetStats();
      return 'lose';
    }
  },

  resetStats: function() {
    this.guessedLetters.length = 0;
    this.wrongGuessCount = 0;
  }
});
