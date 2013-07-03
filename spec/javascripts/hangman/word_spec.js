//= require spec_helper

describe("methods", function() {

  beforeEach(function() {
    this.word = new Games.Models.Word({id: 1, body: 'test'});
  });

  describe("word", function() {
    it("returns a body of the word", function() {
      expect(this.word.word()).to.eql('test');
    });
  });

  describe("display", function() {
    it("returns a formatted string for display", function() {
      this.word.guessedLetters = ['e'];
      expect(this.word.display()).to.eql('_e__');
    });
  });

  describe("checkLetter", function() {
    it("does nothing if the letter has already been guessed", function(){
      this.word.guessedLetters = ['t'];
      var before_guessed = this.word.guessedLetters;
      var before_wrong_guessed = this.word.wrongGuessedLetters;
      this.word.checkLetter('t');
      expect(this.word.guessedLetters).to.eql(before_guessed);
      expect(this.word.wrongGuessedLetters).to.eql(before_wrong_guessed);
    });

    it("adds to guessed letters if the guess is new and right", function() {
      this.word.checkLetter('e');
      expect(this.word.guessedLetters).to.eql(['e']);
    });

    it("adds to wrong guessed letters if the guess is new and wrong", function() {
      this.word.checkLetter('x');
      expect(this.word.wrongGuessedLetters).to.eql(['x']);
    });
  });

  describe("checkEndGame", function() {
    it("returns 'win' if all letters have been guessed and resets stats", function(){
      this.word.guessedLetters = ['t','e','s'];
      expect(this.word.checkEndGame()).to.eql('win');
      expect(this.word.guessedLetters).to.eql( [] );
    });

    it("returns lose if the guess limit is reached and resets stats", function() {
      this.word.wrongGuessedLetters = ['x','y','z','w','q','n','m','p'];
      expect(this.word.checkEndGame()).to.eql('lose');
      expect(this.word.wrongGuessedLetters).to.eql( [] );
    });
  });

  describe("resetStats", function() {
    it("resets the model to the initial state", function(){
      this.word.wrongGuessConut = 5;
      this.word.guessedLetters = ['s','e'];
      this.word.wrongGuessedLetters = ['y','x'];
      this.word.resetStats();
      expect(this.word.guessedLetters).to.eql( [] );
      expect(this.word.wrongGuessedLetters).to.eql( [] );
    });
  });


});

