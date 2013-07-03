//= require gregbot

describe("gregbot making the winning move", function() {

  it("wins horizontally when it can", function() {
    var round = 6;
    var board = [ [-2, -4, ''], ['', '', ''], ['', '', ''] ];
    var index = Gregbot.move(board, round);
    expect(index).to.eql([0,2]);
  });

  it("wins vertically when it can", function() {
    var round = 6;
    var board = [ [-2, '', ''], [-4, '', ''], ['', '', ''] ];
    var index = Gregbot.move(board, round);
    expect(index).to.eql([2,0]);
  });

  it("wins diagonally when it can", function() {
    var round = 6;
    var board = [ [-2, '', ''], ['', -4, ''], ['', '', ''] ];
    var index = Gregbot.move(board, round);
    expect(index).to.eql([2,2]);
  });

});
