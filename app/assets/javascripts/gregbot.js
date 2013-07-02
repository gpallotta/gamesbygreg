var Gregbot = {

  // if it can win, win
  // else if it can prevent you from winning, do that
  // else if it can set up a win, do that
  // else place randomly

  move: function(board, round) {
    this.board = board;
    this.round = round;
    var canWin = this.canWin();
    if (canWin) {
      return canWin;
    }
    var canBlock = this.canBlock();
    if (canBlock) {
      return canBlock;
    }
    var canSetUpWin = this.canSetUpWin();
    if (canSetUpWin) {
      return canSetUpWin;
    }
    return this.placeRandomly();
  },

  coordinates: function() {
    return [
    [ [0,0],[0,1],[0,2] ],
    [ [1,0],[1,1],[1,2] ],
    [ [2,0],[2,1],[2,2] ],
    [ [0,0],[1,0],[2,0] ],
    [ [0,1],[1,1],[2,1] ],
    [ [0,2],[1,2],[2,2] ],
    [ [0,0],[1,1],[2,2] ],
    [ [0,2],[1,1],[2,0] ]
    ];
  },

  canWin: function() {
    var piece, undefinedIndex, x, y;
    var pieceCount, undefinedCount = 0;
    var coordinates = this.coordinates();
    for (var i = 0; i < coordinates.length; i++) {
      undefinedCount = 0;
      pieceCount = 0;
      for (var j = 0; j < 3; j++) {
        x = coordinates[i][j][0];
        y = coordinates[i][j][1];
        piece = this.board[x][y];
        if (piece < 0 && (piece+4 >= (this.round*-1)) ) {
          pieceCount += 1;
        }
        if (piece === '') {
          undefinedCount += 1;
          undefinedIndex = coordinates[i][j];
        }
      }
      if (pieceCount === 2 && undefinedCount === 1) {
         return undefinedIndex;
      }
    }
  },

  canBlock: function() {
    var piece, undefinedIndex, x, y;
    var pieceCount, undefinedCount = 0;
    var coordinates = this.coordinates();
    for (var i = 0; i < coordinates.length; i++) {
      undefinedCount = 0;
      pieceCount = 0;
      for (var j = 0; j < 3; j++) {
        x = coordinates[i][j][0];
        y = coordinates[i][j][1];
        piece = this.board[x][y];
        if (piece > 0 && (piece+4 >= (this.round)) )   { pieceCount += 1; }
        if (piece === '') {
          undefinedCount += 1;
          undefinedIndex = coordinates[i][j];
        }
      }
      if (pieceCount === 2 && undefinedCount === 1) {
         return undefinedIndex;
      }
    }
  },

  canSetUpWin: function() {
    var piece, undefinedIndex, x, y;
    var botPiece, humanPiece, undefinedCount;
    var coordinates = this.coordinates();
    for (var i = 0; i < coordinates.length; i++) {
      undefinedCount = 0;
      humanPiece = 0;
      botPiece = 0;
      for (var j = 0; j < 3; j++) {
        x = coordinates[i][j][0];
        y = coordinates[i][j][1];
        piece = this.board[x][y];
        if ( piece > 0 && (piece === this.round-5) ) { humanPiece += 1; }
        if ( piece < 0 && (piece+4 >= (this.round*-1)) ) { botPiece += 1; }
        if (piece === '') {
          undefinedCount += 1;
          undefinedIndex = coordinates[i][j];
        }
      }
      if (humanPiece === 1 && botPiece === 1 && undefinedCount === 1) {
         return undefinedIndex;
      }
    }

  },

  placeRandomly: function() {
    var piece = 1;
    var x, y;
    while (piece > 0 || piece < 0) {
      x = Math.floor( Math.random()*3 );
      y = Math.floor( Math.random()*3 );
      piece = this.board[x][y];
    }
    return [x,y];
  }

};
