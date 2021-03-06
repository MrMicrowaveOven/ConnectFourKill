document.columns = [
  [], //0
  [], //1
  [], //2
  [], //3
  [], //4
  [], //5
  []  //6
];

document.whoseTurn = 0;
document.totalNumDiscs = 0;

function playAgain() {
  location.reload();
}

function makeRandomMove() {
  var possibleMoves = getPossibleMoves();
  var randomNumber = Math.floor(Math.random() * possibleMoves.length);
  var randomMove = possibleMoves[randomNumber];
  addDisc(randomMove);
  removeImpossibleMoves(randomMove);
  checkForVictory(randomMove);
  switchTurn();
}

function getPossibleMoves() {
  var possibleMoves = [];
  document.columns.forEach(function(column, columnIndex) {
    if (column.length != 6) {
      possibleMoves.push(columnIndex)
    }
  })
  return possibleMoves;
}

function makeMove(column) {
  console.log("Making my move as player " + document.whoseTurn);
  addDisc(column);
  removeImpossibleMoves(column);
  checkForVictory(column);
  switchTurn();
}

function victory(winningSquares) {
  var winner = document.whoseTurn;
  var winnerColor = playerColor(winner);
  document.getElementById("caption").innerHTML = "Victory to " + winnerColor + "!!!!!";
  console.log(winningSquares);
  winningSquares.forEach(function (coords) {
    document.getElementById("r"  + coords[1] + "column" + coords[0] + "Disk").setAttribute("border", "10px solid black")
    document.getElementById("r"  + coords[1] + "column" + coords[0] + "Disk").setAttribute("style", "border-radius: 100px")
  })
  removeAllMoves();
}

function checkForVictory(column) {
  var row = document.columns[column].length - 1;

  var potentialVictories = [];
  var potentialVictories = potentialVictories.concat(getPotentialVerticalVictories(column, row))
  var potentialVictories = potentialVictories.concat(getPotentialHorizontalVictories(column, row))
  var potentialVictories = potentialVictories.concat(getPotentialDiagVictories(column, row))

  var inARow = 0;
  var isVictory = false;
  var winningSquares = [];

  potentialVictories.forEach(function(potentialVictory) {
      potentialVictory.forEach(function(square) {
        if (document.columns[square[0]][square[1]] !== document.whoseTurn) {
          inARow = 0;
        } else {
          inARow++;
          winningSquares.push([square[0], square[1]])
        }
        if (inARow == 4) {

          winningSquares = winningSquares.slice(winningSquares.length - 4)
          isVictory = true;

        }
      });
      if (inARow == 4) {
        winningSquares = potentialVictory;
        victory = true;
        console.log("winningSquares: ");
        console.info(winningSquares);
      }
      inARow = 0;
  });

  if (isVictory){
    victory(winningSquares);
  }
}


function getPotentialDiagVictories(column, row) {
  var i = 0;
  var possibleDiagWins = [];
  var coordsUp = [];
  var coordsDown = [];

  var beginClimb = column > row ? [column - row, 0] : [0, row - column];
  var beginFall = column + row > 5 ? [column + row - 5, 5] : [0, row + column];

  var climb = beginClimb

  while (climb[0] < 7 && climb[1] < 6) {
    coordsUp.push([climb[0], climb[1]])
    climb[0] += 1
    climb[1] += 1
  }
  if (coordsUp.length >= 4) {
    possibleDiagWins.push(coordsUp)
  }
  var fall = beginFall;

  while (fall[0] < 7 && fall[1] >= 0) {
    coordsDown.push([fall[1], fall[0]])
    fall[0] += 1
    fall[1] -= 1
  }

  if (coordsDown.length >= 4) {
    possibleDiagWins.push(coordsDown)
  }
  return possibleDiagWins;
}



function getPotentialHorizontalVictories(column, row) {
  var possibleHorWins = [];
  for (var i = 0; i <= 6; i++) {
    possibleHorWins.push([i, row]);
  }
  return [possibleHorWins];
}

function getPotentialVerticalVictories(column, row) {
  if (row < 3) {
    return [];
  }
  var possibleVertWin = [];
  for (var i = 0; i < 4; i++) {
    possibleVertWin.push([column, row - i])
  }
  return [possibleVertWin];
}

function removeImpossibleMoves(column) {
  var numDiscs = document.columns[column].length;
  if (numDiscs == 6) {
    document.getElementById("addDisc" + column).disabled = "false";
  }
  if (document.totalNumDiscs == 42) {
    document.getElementById("makeRandomMove").disabled = "false";
  }
}

function removeAllMoves() {
  var possibleMoves = getPossibleMoves();
  possibleMoves.forEach(function(columnIndex) {
    document.getElementById("addDisc" + columnIndex).disabled = "false";
  })
  document.getElementById("makeRandomMove").disabled = "false";
}

function addDisc(column) {
  document.totalNumDiscs++;
  var color = document.whoseTurn;
  var row = document.columns[column].length;


  // Set global
  document.columns[column].push(color);

  addDiscImage(column, row, color);
}

function playerColor(player) {
  if (player == 0) {
    return "blue";
  } else {
    return "red";
  }
}

function otherPlayer(player) {
  if (player == 0) {
    return 1;
  } else {
    return 0;
  }
}

function winningMoves(player) {

}

function addDiscImage(column, row, color) {
  if (document.whoseTurn == 0) {
    var discImage = "http://www.clipartkid.com/images/131/images-for-blue-circles-free-cliparts-that-you-can-download-to-you-4gYfis-clipart.png";
  } else {
    var discImage = "https://www.cogenhr.com/development/wp-content/uploads/2015/03/Red-circle-transparent-1024x1006.png";
  }

  var disc = document.createElement('img');
  disc.setAttribute("src", discImage)
  disc.setAttribute("width", "50px")
  disc.setAttribute("height", "50px")
  disc.setAttribute("class", "disc")
  disc.setAttribute("id", "r" + row + "column" + column + "Disk");

  // Add disc, which contains svg and circle, to appropriate tile
  document.getElementById("r"  + row + "column" + column).innerHTML = "";
  document.getElementById("r"  + row + "column" + column).appendChild(disc);
}



function switchTurn() {
  if (document.whoseTurn === 0) {
    document.whoseTurn = 1;
  } else if (document.whoseTurn === 1) {
    document.whoseTurn = 0
  } else {
    console.log("TURN ERROR");
  }
}
