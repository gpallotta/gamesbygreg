//= require gregbot

describe("gregbot blocking opponent's winning move", function() {

  it("blocks the opponent from winning", function() {
    var round = 4;
    var board = [ [1, 3, ''], [-2, '', ''], ['', '', ''] ];
    var index = Gregbot.move(board, round);
    expect(index).to.eql([0,2]);
  });

  it("doesn't block if the pieces will disappear", function() {
    var round = 8;
    var board = [ [3, 7, ''], ['', '', ''], ['', '', ''] ];
    var index = Gregbot.move(board, round);
    expect(index).to.not.eql([0,2]); // will fail intermittenly
  });

});
