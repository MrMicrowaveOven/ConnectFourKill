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

function makeMove(column) {
  console.log("Making my move as player " + document.whoseTurn);
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


function checkForVictory(column) {
  var row = document.columns[column].length - 1;

  var potentialVictories = [];
  var potentialVictories = potentialVictories.concat(getPotentialVerticalVictories(column, row))
  var potentialVictories = potentialVictories.concat(getPotentialHorizontalVictories(column, row))
  console.log("potentialVictories: ");
  console.info(potentialVictories);
  console.log("Global columns: ");
  console.info(document.columns);

  var inARow = 0;
  var victory = false;
  var winningSquares;

  potentialVictories.forEach(function(potentialVictory) {
      potentialVictory.forEach(function(square) {
        console.log("document.columns[" + square[0] + "][" + square[1] + "] = " + document.columns[square[0]][square[1]]);
        console.log("document.whoseTurn: " + document.whoseTurn);
        if (document.columns[square[0]][square[1]] !== document.whoseTurn) {
          inARow = 0;
        } else {
          inARow++;
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

  if (victory){
    console.log("Victory!");
  }
}

function getPotentialHorizontalVictories(column, row) {

  var inARow = 0;
  var possibleHorWins = [];
  for (var i = 0; i <= 6; i++) {
    possibleHorWins.push([i, row]);
  }
  return [possibleHorWins];
}

function getPotentialVerticalVictories(column, row) {
  if (row < 3) {
    // console.log("No potential Vertical Victories");
    return [];
  }
  var possibleVertWin = [];
  for (var i = 0; i < 4; i++) {
    possibleVertWin.push([column, row - i])
  }
  // console.log("Potential Vert wins:" + possibleVertWin);
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

  // // Make svg to hold disc image
  // var disc = document.createElement('svg');
  // disc.setAttribute("width", "100")
  // disc.setAttribute("height", "100")
  // // Make circle in svg
  // var circle = document.createElement('circle');
  // circle.setAttribute("cx", "50")
  // circle.setAttribute("cy", "50")
  // circle.setAttribute("r", "50")
  // circle.setAttribute("stroke", "black")
  // circle.setAttribute("stroke-width", "3")
  // circle.setAttribute("fill", "red")

  // Add disc, which contains svg and circle, to appropriate tile
  // console.log(disc);
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
