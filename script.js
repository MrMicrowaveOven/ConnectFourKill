function addDisc(column, color) {
  var row = document.columns[column].length;
  document.columns[column].push(color)
  document.getElementById("column" + column).innerHTML = color;
}

document.columns = [
  [], //0
  [], //1
  [], //2
  [], //3
  [], //4
  [], //5
  []  //6
]

// function recallibratePage() {
//   document.columns.forEach(function(column, ind, arr) {
//
//   })
// }
