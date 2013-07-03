//= require gregbot

describe("gregbot setting up the win", function() {

  it("sets up the win if it can", function(){
    var round = 6;
    var board = [ [1, -4, ''], [-2, '', ''], ['', '', ''] ];
    var index = Gregbot.move(board, round);
    expect(index).to.eql([0,2]);
  });


});
