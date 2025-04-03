let levelZeroChanges = 0;
let oneInARowChanges = 0;
let mainChangeCount = 0;
let totalChangeCount = 0;

const ROW_START = [0,0,0,3,3,3,6,6,6];
const ROW_END = [2,2,2,5,5,5,8,8,8];
const COLUMN_START = [0,3,6,0,3,6,0,3,6];
const COLUMN_END = [2,5,8,2,5,8,2,5,8];

export function solvePuzzle(startPuzzleString) {
    console.log(`Solving puzzle: ${startPuzzleString}`);
    const startPuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solvePuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solveRows = initializeRows(solvePuzzle);
    let solveColumns = initializeColumns(solvePuzzle);
    let solveGroups = initializeGroups(solvePuzzle);
    const startPossible = initializePossible(solvePuzzle, solveRows, solveColumns, solveGroups);
    let solvePossible = initializePossible(solvePuzzle, solveRows, solveColumns, solveGroups);

    levelZeroMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);
    

    
    
    return solvePuzzle;
}

function convertPuzzleToIntArray(stringPuzzle) {
    let intPuzzle = Array(9).fill().map(() => Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            intPuzzle[i][j] = parseInt(stringPuzzle[i*9 + j]);
        }
    }
    return intPuzzle;
}

function printPuzzle(intPuzzle) {
    for (let i = 0; i < 9; i++) {
        console.log(intPuzzle[i].join(' '));
    }
}

function initializeRows(intPuzzle) {
    let rows = Array(9).fill().map(() => Array(9).fill(false));
    for (let i = 0; i < 9; i++) { // row number
        for (let j = 0; j < 9; j++) { // column number
            for (let k = 0; k < 9; k++) { // number 1-9
                if (intPuzzle[i][j] === k+1) {
                    rows[i][k] = true;
                }
            }
        }
    }
    return rows;
}

function initializeColumns(intPuzzle) {
    let columns = Array(9).fill().map(() => Array(9).fill(false));
    for (let j = 0; j < 9; j++) { // column number
        for (let i = 0; i < 9; i++) { // row number
            for (let k = 0; k < 9; k++) { // number 1-9
                if (intPuzzle[i][j] === k+1) {
                    columns[j][k] = true;
                }
            }
        }
    }
    return columns;
}

function initializeGroups(intPuzzle) {
    let groups = Array(9).fill().map(() => Array(9).fill(false));
    for (let i = 0; i < 9; i++) { // row number
        for (let j = 0; j < 9; j++) { // column number
            for (let k = 0; k < 9; k++) { // number 1-9 
                if (intPuzzle[i][j] === k+1) {
                    let group = determineGroup(i, j);
                    groups[group][k] = true;
                }
            }
        }
    }
    return groups;
}

function initializePossible(intPuzzle, rows, columns, groups) {
    let possible = Array(9).fill().map(() => Array(9).fill().map(() => Array(9).fill(0)));
    for (let i = 0; i < 9; i++) { // row number
        for (let j = 0; j < 9; j++) { // column number
            if (intPuzzle[i][j] === 0) {    
                let group = determineGroup(i, j);
                for (let k = 0; k < 9; k++) { // number 1-9
                    if (!rows[i][k] && !columns[j][k] && !groups[group][k]) {
                        possible[i][j][k] = k+1;
                    }
                }
            }   
        }
    }
    return possible;
}

function determineGroup(row, column) {
    if (row < 3 && column < 3) {
        return 0;
    } else if (row < 3 && column < 6) {
        return 1;
    } else if (row < 3) {
        return 2;
    } else if (row < 6 && column < 3) {
        return 3;
    } else if (row < 6 && column < 6) {
        return 4;
    } else if (row < 6) {
        return 5;
    } else if (column < 3) {
        return 6;
    } else if (column < 6) {
        return 7;
    } else {
        return 8;
    }
}

function check(intPuzzle) {
    let count = 0;
        
    // Check to make sure there are at least 17 given digits
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (intPuzzle[i][j] !== 0) {
                count++;
            }
        }
    }
    if (count < 17) {
        return false;
    }
    
    // Checks each row for duplicates
    for (let i = 0; i < 9; i++) { // row number
        for (let k = 0; k < 9; k++) { // number 1-9
            count = 0;
            for (let j = 0; j < 9; j++) { // column number
                if (intPuzzle[i][j] === k+1)
                    count++;
            }
            if (count > 1)
                return false;
        }
    }
    
    // Checks each column for duplicates
    for (let j = 0; j < 9; j++) { // column number
        for (let k = 0; k < 9; k++) { // number 1-9
            count = 0;
            for (let i = 0; i < 9; i++) { // row number
                if (intPuzzle[i][j] === k+1)
                    count++;
            }
            if (count > 1)
                return false;
        }
    }
    
    // Checks each group for duplicates
    for (let l = 0; l < 9; l++) { // group number
        for (let k = 0; k < 9; k++) { // number 1-9
            count = 0;
            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) {
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                    if (intPuzzle[i][j] === k+1)
                        count++;
                }
            }
            if (count > 1)
                return false;
        }
    }
    
    return true;
}

function updateSolved(intPuzzle) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (intPuzzle[i][j] !== 0) {
                count++;
            }
        }
    }
    return count === 81 && check(intPuzzle);
}   

function updateShadowPossible(number, row, column, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    Rows[row][number - 1] = true;
	Columns[column][number - 1] = true;
	const group = determineGroup(row, column);
	Groups[group][number - 1] = true;
        
    // Removes all options from the cell
    for (let k = 0; k < 9; k++) { // number 1-9
        if (possible[row][column][k] === k+1) {
            possible[row][column][k] = 0;
            if (!isGuessAndCheck && !isBruteForce) {
                // mainChangePossibleOrder.add(mainChangeCount);
                // mainChangePossibleNumber.add(k+1);
                // mainChangePossibleRow.add(row);
                // mainChangePossibleColumn.add(column);
                // mainChangePossibleCount++;
            }
        }
    }
        
    // Removes the number as an option for the column
	for (let i = 0; i < 9; i++) { // row number
        if (possible[i][column][number-1] === number) {
            possible[i][column][number - 1] = 0;
            if (!isGuessAndCheck && !isBruteForce) {
                // mainChangePossibleOrder.add(mainChangeCount);
                // mainChangePossibleNumber.add(number);
                // mainChangePossibleRow.add(i);
                // mainChangePossibleColumn.add(column);
                // mainChangePossibleCount++;
            }
        }
	}
        
    // Removes the number as an option for the row
	for (let j = 0; j < 9; j++) { // column number
        if (possible[row][j][number-1] === number) {
            possible[row][j][number - 1] = 0;
            if (!isGuessAndCheck && !isBruteForce) {
                // mainChangePossibleOrder.add(mainChangeCount);
                // mainChangePossibleNumber.add(number);
                // mainChangePossibleRow.add(row);
                // mainChangePossibleColumn.add(j);
                // mainChangePossibleCount++;
            }
        }
	}
        
    // Removes the number as an option for the group
	for (let i = ROW_START[group]; i <= ROW_END[group]; i++) { // row number
        for (let j = COLUMN_START[group]; j <= COLUMN_END[group]; j++) { // column number
            if (possible[i][j][number-1] === number) {
                possible[i][j][number - 1] = 0;
                if (!isGuessAndCheck && !isBruteForce) {
                    // mainChangePossibleOrder.add(mainChangeCount);
                    // mainChangePossibleNumber.add(number);
                    // mainChangePossibleRow.add(i);
                    // mainChangePossibleColumn.add(j);
                    // mainChangePossibleCount++;
                }
            }
        }
	}
}

function levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes;
    let tempLevelZeroChanges = 0;
    do {
        changes = 0;
        changes += oneInARowPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += oneInAColumnPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += oneInAGroupPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += oneInACellPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempLevelZeroChanges += changes;
    } while (changes !== 0);
    return tempLevelZeroChanges;
}

function oneInARowPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let works;
    let worksColumn = 0;
    let changes = 0;
    let tempChanges;

    do {
        tempChanges = 0;
        for (let i = 0; i < 9; i++) { // row number
            for (let k = 0; k < 9; k++) { // number 1-9
                works = 0;
                for (let j = 0; j < 9; j++) { // column number
                    if (intPuzzle[i][j] === 0) {
                        if (possible[i][j][k] === k+1) {
                            works++;
                            worksColumn = j;
                        }
                    }
                }

                if (works === 1) {
                    intPuzzle[i][worksColumn] = k+1;
                    if (!isGuessAndCheck && !isBruteForce) {
                        // TODO: add change logs
                        levelZeroChanges++;
                        oneInARowChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                        updateSolved(intPuzzle);
                    }
                    updateShadowPossible((k+1), i, worksColumn, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                    tempChanges++;
                }
            }
        }
    } while (tempChanges !== 0);
    
    return changes;
}