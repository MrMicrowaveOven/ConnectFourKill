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
  switchTurn();
}

function addDisc(column) {
  var color = document.whoseTurn;
  var row = document.columns[column].length;
  document.columns[column].push(color)
  document.getElementById("r"  + row + "column" + column).innerHTML = color;
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

// function recallibratePage() {
//   document.columns.forEach(function(column, ind, arr) {
//
//   })
// }
