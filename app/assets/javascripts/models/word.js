Games.Models.Word = Backbone.Model.extend({
  urlRoot: '/api/words',

  guessedLetters: [],

  word: function() {
    if (this.get('body')) {
      return this.get('body');
    } else {
      return '';
    }
  },

  display: function() {
    var str = '';
    var word = this.word();
    len = word.length;
    for (var i = 0; i < len; i++) {
      letter = word[i];
      if (this.guessedLetters.indexOf(letter) > -1) {
        str += letter;
      } else {
        str += '_' ;
      }
    }
    console.log(str.length);
    return str;
  },

  checkLetter: function(letter) {
    if (this.guessedLetters.indexOf(letter) > -1){
      return 'Already guessed';
    } else {
      this.guessedLetters.push(letter);
      return '';
    }
  },

  checkWin: function() {
    if (this.get('body') === this.display()) {
      this.guessedLetters.length = 0;
      return true;
    } else {
      return false;
    }
  }
});
