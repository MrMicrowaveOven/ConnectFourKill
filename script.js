document.columns = [
  [], //0
  [], //1
  [], //2
  [], //3
  [], //4
  [], //5
  []  //6
]

document.whoseTurn = 0;

function makeMove(column) {
  addDisc(column);
  removeImpossibleMoves(column);
  checkForVictory(column);
  switchTurn();
}

function horVicTest() {
  makeMove(1);
  makeMove(1);
  makeMove(2);
  makeMove(2);
  makeMove(3);
  makeMove(3);
  makeMove(4);
}

function diagVicTest1() {
  makeMove(0); // blue
  makeMove(1); // red
  makeMove(1); // blue
  makeMove(2); // red
  makeMove(2); // blue
  makeMove(3); // red
  makeMove(2); // blue
  makeMove(3); // red
  makeMove(3); // blue
  makeMove(4); // red
  makeMove(3); // blue
}

function diagVicTest2() {
  makeMove(4); // blue
  makeMove(2); // red
  makeMove(3); // blue
  makeMove(2); // red
  makeMove(3); // blue
  makeMove(1); // red
  makeMove(2); // blue
  makeMove(1); // red
  makeMove(1); // blue
  makeMove(5); // red
  makeMove(1); // blue
}

function diagVicTest3() {
  makeMove(6); // blue
  makeMove(6); // red
  makeMove(6); // blue
  makeMove(6); // red
  makeMove(5); // blue
  makeMove(5); // red
  makeMove(4); // blue
  makeMove(5); // red
  makeMove(1); // blue
  makeMove(4); // red
  makeMove(1); // blue
  makeMove(3); // red
}
function diagVicTest4() {
  makeMove(6); // blue
  makeMove(6); // red
  makeMove(6); // blue
  makeMove(6); // red
  makeMove(5); // blue
  makeMove(5); // red
  makeMove(4); // blue
  makeMove(5); // red
  makeMove(1); // blue
  makeMove(3); // red
  makeMove(1); // blue
  makeMove(4); // red
}


function checkForVictory(column) {
  var row = document.columns[column].length - 1;

  var potentialVictories = [];
  var potentialVictories = potentialVictories.concat(getPotentialVerticalVictories(column, row))
  var potentialVictories = potentialVictories.concat(getPotentialHorizontalVictories(column, row))
  var potentialVictories = potentialVictories.concat(getPotentialDiagVictories(column, row))

  var inARow = 0;
  var victory = false;
  var winningSquares;
  var winner;

  potentialVictories.forEach(function(potentialVictory) {
      potentialVictory.forEach(function(square) {
        if (document.columns[square[0]][square[1]] !== document.whoseTurn) {
          inARow = 0;
        } else {
          inARow++;
        }
        if (inARow == 4) {
          winningSquares = potentialVictory;
          victory = true;
          winner = document.whoseTurn;
        }
      })
      inARow = 0;
  })

  if (victory){
    if (winner == 0) {
      winner = "blue"
    } else {
      winner = "red"
    }
    document.getElementById("caption").innerHTML = "Victory to " + winner + "!!!!!";
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
  console.log("coordsDown");
  console.log(coordsDown);
  if (coordsDown.length >= 4) {
    possibleDiagWins.push(coordsDown)
  }
  return possibleDiagWins;
}

function getPotentialHorizontalVictories(column, row) {
  var possibleHorWins = [];
  for (var i = 0; i <= 6; i++) {
    possibleHorWins.push([i, row])
  }
  return [possibleHorWins]
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
    document.getElementById("addDisc" + column).setAttribute("hidden", true)
  }
}

function addDisc(column) {
  var color = document.whoseTurn;
  var row = document.columns[column].length;

  if (document.whoseTurn == 0) {
    var discImage = "http://www.clipartkid.com/images/131/images-for-blue-circles-free-cliparts-that-you-can-download-to-you-4gYfis-clipart.png";
  } else {
    var discImage = "https://www.cogenhr.com/development/wp-content/uploads/2015/03/Red-circle-transparent-1024x1006.png";
  }

  // Set global
  document.columns[column].push(color);

  var disc = document.createElement('img');
  disc.setAttribute("src", discImage)
  disc.setAttribute("width", "50px")
  disc.setAttribute("height", "50px")
  disc.setAttribute("class", "disc")

  // Add disc, which contains svg and circle, to appropriate tile
  document.getElementById("r"  + row + "column" + column).innerHTML = "";
  document.getElementById("r"  + row + "column" + column).appendChild(disc);
  // disc.appendChild(circle);
}

function switchTurn() {
  console.log("SwitchingTurns");
  if (document.whoseTurn === 0) {
    document.whoseTurn = 1;
  } else if (document.whoseTurn === 1) {
    document.whoseTurn = 0
  } else {
    console.log("TURN ERROR");
  }
}

// function recallibratePage() {
//   document.columns.forEach(function(column, ind, arr) {
//
//   })
// }
