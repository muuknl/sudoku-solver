const sudoku = require('./sudoku');

const grid = [
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

function printGrid() {
    for (let y = 0; y < 9; y++) {
        let row = "";
        for (let x = 0; x < 9; x++) {
            row += ` ${sudoku.getGrid()[y][x]} `;
            if (x % 3 == 2) {
                row += '|';
            }
        }
        if (y % 3 == 0) {
            printHDivider();
        }
        console.log(`|${row}`);
    }

    printHDivider();

    function printHDivider() {
        let divider = '';
        for (let i = 0; i < 9 * 3 + 4; i++) {
            divider += '-';
        }
        console.log(divider);
    }
}

sudoku.setGrid(grid);
printGrid();

const success = sudoku.solve();
if (success) {
    console.log("Solution found!");
    printGrid();
} else {
    console.log("Could not solve sudoku.");
}
