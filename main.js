const sudoku = require('./sudoku');

const grid9 = [
    [0, 6, 0,  0, 0, 1,  0, 9, 4],
    [3, 0, 0,  0, 0, 7,  1, 0, 0],
    [0, 0, 0,  0, 9, 0,  0, 0, 0],

    [7, 0, 6,  5, 0, 0,  2, 0, 9],
    [0, 3, 0,  0, 2, 0,  0, 6, 0],
    [9, 0, 2,  0, 0, 6,  3, 0, 1],

    [0, 0, 0,  0, 5, 0,  0, 0, 0],
    [0, 0, 7,  3, 0, 0,  0, 0, 2],
    [4, 1, 0,  7, 0, 0,  0, 8, 0]
];

const grid4 = [
    [0, 1, 3, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 3],
    [0, 2, 1, 0]
];

const gridSize = 4;
const boxSize = 2;
const grid = grid4;

function printGrid() {
    for (let y = 0; y < gridSize; y++) {
        let row = "";
        for (let x = 0; x < gridSize; x++) {
            row += ` ${sudoku.getGrid()[y][x]} `;

            if ((x + 1) % boxSize == 0) {
                row += '|';
            }
        }
        if (y % boxSize == 0) {
            printHDivider();
        }
        console.log(`|${row}`);
    }

    printHDivider();

    function printHDivider() {
        let divider = '';
        for (let i = 0; i < gridSize * 3 + boxSize + 1; i++) {
            divider += '-';
        }
        console.log(divider);
    }
}

sudoku.setGrid(grid, gridSize, boxSize);
printGrid();

const success = sudoku.solve();
if (success) {
    console.log("Solution found!");
    printGrid();
} else {
    console.log("Could not solve sudoku.");
}
