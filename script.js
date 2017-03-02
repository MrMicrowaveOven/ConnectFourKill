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
  switchTurn();
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
  console.log(disc);
  document.getElementById("r"  + row + "column" + column).innerHTML = "";
  document.getElementById("r"  + row + "column" + column).appendChild(disc);
  // disc.appendChild(circle);
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
