let grid = [];
let gridSize;
let boxSize;

/**
 * Set the grid to process.
 * @param newGrid
 * @param _gridSize
 * @param _boxSize
 */
function setGrid(newGrid, _gridSize, _boxSize) {
    grid = newGrid;
    gridSize = _gridSize;
    boxSize = _boxSize;
}

/**
 * Get the grid that will be processed.
 * @returns {Array}
 */
function getGrid() {
    return grid;
}

/**
 * Get the next cell to process.
 * @param  {Object} curr The current cell.
 * @return {Object}      The next cell.
 */
function nextCell(curr) {
    const next = {x: curr.x, y: curr.y};

    next.x++;
    if (next.x > gridSize - 1) {
        next.y++;
        next.x = 0;
    }

    if (next.y > gridSize - 1) {
        return null;
    }

    return next;
}

/**
 * Find a possible solution for the provided cell.
 * @param  {Object} cell The cell to find the solution for.
 * @return {boolean}     To indicate whether the operation was successful.
 */
function solveCell(cell) {
    if (cell == null) {
        return true;
    }

    if (grid[cell.y][cell.x] != 0) {
        return solveCell(nextCell(cell));
    }

    for (let i = 1; i <= gridSize; i++) {
        if (givesConflict(cell, i)) {
            continue;
        }

        grid[cell.y][cell.x] = i;
        if (solveCell(nextCell(cell))) {
            return true;
        }
        grid[cell.y][cell.x] = 0;
    }

    return false;
}

/**
 * Determine whether it is possible to insert the given number into the given
 * cell, taking into account the rules described by the sudoku.
 * @param  {Object} cell The cell to check at.
 * @param  {number} num  The number to check for.
 * @return {boolean}      If it is possible to insert that number into that cell.
 */
function givesConflict(cell, num) {
    return rowConflict(cell, num) ||
            colConflict(cell, num) ||
            boxConflict(cell, num);
}

/**
 * Checks whether a given number is present in a row.
 * @param  {Object} cell The cell which to check at.
 * @param  {number} num  The number to chekc for.
 * @return {boolean}      If it is possible to insert that number into the row.
 */
function rowConflict(cell, num) {
    const y = cell.y;

    for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] == num) {
            return true;
        }
    }

    return false;
}

/**
 * Checks whether a given number is present in a column.
 * @param  {Object} cell The cell which to check at.
 * @param  {number} num  The number to chekc for.
 * @return {boolean}      If it is possible to insert that number into the column.
 */
function colConflict(cell, num) {
    const x = cell.x;

    for (let y = 0; y < gridSize; y++) {
        if (grid[y][x] == num) {
            return true;
        }
    }

    return false;
}

/**
 * Checks whether a given number is present in a 3x3 box.
 * @param  {Object} cell The cell which to check at.
 * @param  {number} num  The number to chekc for.
 * @return {boolean}      If it is possible to insert that number into the 3x3.
 */
function boxConflict(cell, num) {
    const boxX = cell.x - (cell.x % boxSize);
    const boxY = cell.y - (cell.y % boxSize);

    for (let x = 0; x < boxSize; x++) {
        for (let y = 0; y < boxSize; y++) {
            const finalX = boxX + x;
            const finalY = boxY + y;

            if (grid[finalY][finalX] == num)
                return true;
        }
    }

    return false;
}

/**
 * Convenience method for solving the entire sudoku grid.
 * @return {boolean} Whether a solution was found.
 */
function solve() {
    const startCell = { x: 0, y: 0 };
    return solveCell(startCell);
}

module.exports = { solve, getGrid, setGrid };
