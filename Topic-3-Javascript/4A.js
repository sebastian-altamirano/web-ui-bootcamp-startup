// Returns a table element with the data of a given matrix.
// <-- matrix: 2D Array
// The matrix of data to use to create the table.
// --> object
// The table element with the data of the given matrix

function createTable(matrix) {
  const table = document.createElement('table');
  matrix.forEach(row => {
    let newRow = table.insertRow();
    row.forEach(cell => {
      let newCell = newRow.insertCell();
      newCell.appendChild(document.createTextNode(cell));
    });
  });
  return table;
}

const table = [[1, 2, 3], ['a', 'b', 'c'], [1, 'f', 7]];
document.querySelector('body').appendChild(createTable(table));
