let solved = false;
let bruteForceSolved = false;
let levelZeroChanges = 0;
let oneInARowChanges = 0;
let oneInAColumnChanges = 0;
let oneInAGroupChanges = 0;
let oneInACellChanges = 0;
let levelOneChanges = 0;
let phantomRowChanges = 0;
let phantomColumnChanges = 0;
let phantomGroupChanges = 0;
let nakedPairRowChanges = 0;
let nakedPairColumnChanges = 0;
let nakedPairGroupChanges = 0;
let hiddenPairRowChanges = 0;
let hiddenPairColumnChanges = 0;
let hiddenPairGroupChanges = 0;
let levelTwoChanges = 0;
let nakedTripleRowChanges = 0;
let nakedTripleColumnChanges = 0;
let nakedTripleGroupChanges = 0;
let hiddenTripleRowChanges = 0;
let hiddenTripleColumnChanges = 0;
let hiddenTripleGroupChanges = 0;
let nakedQuadRowChanges = 0;
let nakedQuadColumnChanges = 0;
let nakedQuadGroupChanges = 0;
let xWingRowChanges = 0;
let xWingColumnChanges = 0;
let yWingRowGroupChanges = 0;
let yWingColumnGroupChanges = 0;
let yWingRowColumnChanges = 0;
let levelThreeChanges = 0;
let guessAndCheckChanges = 0;
let bruteForceChanges = 0;
let mainChangeCount = 0;
let possibleChangeCount = 0;
let possibleChangePossibleCount = 0;
let mainChangePossibleCount = 0;
let totalChangeCount = 0;

let mainChangeMethod = [];
let mainChangeDescription = [];
let mainChangeNumber = [];
let mainChangeRow = [];
let mainChangeColumn = [];

let mainChangePossibleOrder = [];
let mainChangePossibleNumber = [];
let mainChangePossibleRow = [];
let mainChangePossibleColumn = [];

let possibleChangeMethod = [];
let possibleChangeDescription = [];
let possibleChangeOrder = [];
let possibleChangeNumber = [];
let possibleChangeRow = [];
let possibleChangeColumn = [];

let totalChangeType = [];
let totalChangeMethod = [];

const ROW_START = [0,0,0,3,3,3,6,6,6];
const ROW_END = [2,2,2,5,5,5,8,8,8];
const COLUMN_START = [0,3,6,0,3,6,0,3,6];
const COLUMN_END = [2,5,8,2,5,8,2,5,8];

export function solvePuzzle(startPuzzleString) {
    const startTime = performance.now();
    resetMetrics();
    let solvePuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solveRows = initializeRows(solvePuzzle);
    let solveColumns = initializeColumns(solvePuzzle);
    let solveGroups = initializeGroups(solvePuzzle);
    let solvePossible = initializePossible(solvePuzzle, solveRows, solveColumns, solveGroups);

    levelZeroMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);

    if (!solved) {
        levelOneMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);
        if (!solved) {
            levelTwoMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);
            if (!solved) {
                levelThreeMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups);
            }
        }
    }

    // Calculate the time it took to solve the puzzle
    const endTime = performance.now();
    const solveTime = endTime - startTime;

    // Convert the solution array to a string
    const solutionString = solvePuzzle.map(row => 
        row.join('')
    ).join('');

    // Create metrics object
    const metrics = {
        solved,
        solveTime,

        levelZeroChanges,
        oneInARowChanges,
        oneInAColumnChanges,
        oneInAGroupChanges,
        oneInACellChanges,
        
        levelOneChanges,
        phantomRowChanges,
        phantomColumnChanges,
        phantomGroupChanges,
        nakedPairRowChanges,
        nakedPairColumnChanges,
        nakedPairGroupChanges,
        hiddenPairRowChanges,
        hiddenPairColumnChanges,
        hiddenPairGroupChanges,

        levelTwoChanges,
        nakedTripleRowChanges,
        nakedTripleColumnChanges,
        nakedTripleGroupChanges,
        hiddenTripleRowChanges,
        hiddenTripleColumnChanges,
        hiddenTripleGroupChanges,
        nakedQuadRowChanges,
        nakedQuadColumnChanges,
        nakedQuadGroupChanges,
        xWingRowChanges,
        xWingColumnChanges,
        yWingRowGroupChanges,
        yWingColumnGroupChanges,
        yWingRowColumnChanges,

        levelThreeChanges,
        guessAndCheckChanges,
        bruteForceChanges,

        mainChangeMethod,
        mainChangeDescription,
        mainChangeNumber,
        mainChangeRow,
        mainChangeColumn,

        possibleChangeMethod,
        possibleChangeDescription,
        possibleChangeOrder,
        possibleChangeNumber,
        possibleChangeRow,
        possibleChangeColumn,

        mainChangePossibleOrder,
        mainChangePossibleNumber,
        mainChangePossibleRow,
        mainChangePossibleColumn,
        
        totalChangeType,
        totalChangeMethod,

        mainChangeCount,
        possibleChangeCount,
        possibleChangePossibleCount,
        mainChangePossibleCount,
        totalChangeCount
    };

    // Return the formatted response object
    return {
        metrics,
        solution: solutionString,
    };
}

function resetMetrics() {
    solved = false;
    bruteForceSolved = false;

    levelZeroChanges = 0;
    oneInARowChanges = 0;
    oneInAColumnChanges = 0;
    oneInAGroupChanges = 0;
    oneInACellChanges = 0;
    
    levelOneChanges = 0;
    phantomRowChanges = 0;
    phantomColumnChanges = 0;
    phantomGroupChanges = 0;
    nakedPairRowChanges = 0;
    nakedPairColumnChanges = 0;
    nakedPairGroupChanges = 0;
    hiddenPairRowChanges = 0;
    hiddenPairColumnChanges = 0;
    hiddenPairGroupChanges = 0;
    
    levelTwoChanges = 0;
    nakedTripleRowChanges = 0;
    nakedTripleColumnChanges = 0;
    nakedTripleGroupChanges = 0;
    hiddenTripleRowChanges = 0;
    hiddenTripleColumnChanges = 0;
    hiddenTripleGroupChanges = 0;
    nakedQuadRowChanges = 0;
    nakedQuadColumnChanges = 0;
    nakedQuadGroupChanges = 0;
    xWingRowChanges = 0;
    xWingColumnChanges = 0;
    yWingRowGroupChanges = 0;
    yWingColumnGroupChanges = 0;
    yWingRowColumnChanges = 0;

    levelThreeChanges = 0;
    guessAndCheckChanges = 0;
    bruteForceChanges = 0;

    mainChangeNumber = [];
    mainChangeMethod = [];
    mainChangeDescription = [];
    mainChangeRow = [];
    mainChangeColumn = [];
    possibleChangeMethod = [];
    possibleChangeDescription = [];
    possibleChangeOrder = [];
    possibleChangeNumber = [];
    possibleChangeRow = [];
    possibleChangeColumn = [];
    mainChangePossibleOrder = [];
    mainChangePossibleNumber = [];
    mainChangePossibleRow = [];
    mainChangePossibleColumn = [];
    totalChangeType = [];
    totalChangeMethod = [];

    mainChangeCount = 0;
    possibleChangeCount = 0;
    possibleChangePossibleCount = 0;
    mainChangePossibleCount = 0;
    totalChangeCount = 0;
    
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

function isSolved(intPuzzle) {
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

function updateSolved(intPuzzle) {
    solved = isSolved(intPuzzle);
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
                mainChangePossibleOrder.push(mainChangeCount);
                mainChangePossibleNumber.push(k+1);
                mainChangePossibleRow.push(row);
                mainChangePossibleColumn.push(column);
                mainChangePossibleCount++;
            }
        }
    }
        
    // Removes the number as an option for the column
	for (let i = 0; i < 9; i++) { // row number
        if (possible[i][column][number-1] === number) {
            possible[i][column][number - 1] = 0;
            if (!isGuessAndCheck && !isBruteForce) {
                mainChangePossibleOrder.push(mainChangeCount);
                mainChangePossibleNumber.push(number);
                mainChangePossibleRow.push(i);
                mainChangePossibleColumn.push(column);
                mainChangePossibleCount++;
            }
        }
	}
        
    // Removes the number as an option for the row
	for (let j = 0; j < 9; j++) { // column number
        if (possible[row][j][number-1] === number) {
            possible[row][j][number - 1] = 0;
            if (!isGuessAndCheck && !isBruteForce) {
                mainChangePossibleOrder.push(mainChangeCount);
                mainChangePossibleNumber.push(number);
                mainChangePossibleRow.push(row);
                mainChangePossibleColumn.push(j);
                mainChangePossibleCount++;
            }
        }
	}
        
    // Removes the number as an option for the group
	for (let i = ROW_START[group]; i <= ROW_END[group]; i++) { // row number
        for (let j = COLUMN_START[group]; j <= COLUMN_END[group]; j++) { // column number
            if (possible[i][j][number-1] === number) {
                possible[i][j][number - 1] = 0;
                if (!isGuessAndCheck && !isBruteForce) {
                    mainChangePossibleOrder.push(mainChangeCount);
                    mainChangePossibleNumber.push(number);
                    mainChangePossibleRow.push(i);
                    mainChangePossibleColumn.push(j);
                    mainChangePossibleCount++;
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
        changes += oneInAColumnPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += oneInAGroupPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += oneInACellPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
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
                        mainChangeNumber.push(String(k+1));
                        mainChangeMethod.push("One in a Row");
                        mainChangeDescription.push("The number " + String(k+1) + " is only possible in row " + 
                                String(i+1) + ", column " + String(worksColumn+1));
                        mainChangeRow.push(i);
                        mainChangeColumn.push(worksColumn);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Row");
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
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function oneInAColumnPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let works;
    let worksRow = 0;
    let changes = 0;
    let tempChanges;
    
    do {
        tempChanges = 0;
        for (let j = 0; j < 9; j++) { // column number
            for (let k = 0; k < 9; k++) { // number 1-9
                works = 0;
                for (let i = 0; i < 9; i++) { // row number
                    if (intPuzzle[i][j] === 0) {
                        if (possible[i][j][k] === k+1) {
                            works++;
                            worksRow = i;
                        }
                    }
                }

                if (works === 1) {
                    intPuzzle[worksRow][j] = k+1;
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangeNumber.push(String(k+1));
                        mainChangeMethod.push("One in a Column");
                        mainChangeDescription.push("The number " + String(k+1) + " is only possible in row " + 
                                String(worksRow+1) + ", column " + String(j+1));
                        mainChangeRow.push(worksRow);
                        mainChangeColumn.push(j);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Column");
                        levelZeroChanges++;
                        oneInAColumnChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                        updateSolved(intPuzzle);
                    }
                    updateShadowPossible((k+1), worksRow, j, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                    tempChanges++;
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function oneInAGroupPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let works;
    let worksRow = 0;
    let worksColumn = 0;
    let changes = 0;
    let tempChanges;

    do {
        tempChanges = 0;
        for (let l = 0; l < 9; l++) { // group number
            for (let k = 0; k < 9; k++) { // number 1-9
                works = 0;
                for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (intPuzzle[i][j] === 0) {
                            if (possible[i][j][k] === k+1) {
                                works++;
                                worksRow = i;
                                worksColumn = j;
                            }
                        }
                    }
                }

                if (works === 1) {
                    intPuzzle[worksRow][worksColumn] = k+1;
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangeNumber.push(String(k+1));
                        mainChangeMethod.push("One in a Group");
                        mainChangeDescription.push("The number " + String(k+1) + " is only possible in row " + 
                                String(worksRow+1) + ", column " + String(worksColumn+1) +
                                " in group " + String(l+1));
                        mainChangeRow.push(worksRow);
                        mainChangeColumn.push(worksColumn);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Group");
                        levelZeroChanges++;
                        oneInAGroupChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                        updateSolved(intPuzzle);
                    }
                    updateShadowPossible((k+1), worksRow, worksColumn, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                    tempChanges++;
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function oneInACellPossibleCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let works;
    let count;
    let changes = 0;
    let tempChanges;

    do {
        tempChanges = 0;
        for (let i = 0; i < 9; i++) { // row number
            for (let j = 0; j < 9; j++) { // column number
                count = 0;
                for (let k = 0; k < 9; k++) { // number 1-9
                    if (intPuzzle[i][j] === 0) {
                        if (possible[i][j][k] === k+1) {
                            works = k+1;
                            count++;
                        }
                    }
                }

                if (count === 1) {
                    intPuzzle[i][j] = works;
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangeNumber.push(String(works));
                        mainChangeMethod.push("One in a Cell");
                        mainChangeDescription.push("The number " + String(works) + " is only possible in row " + 
                                String(i+1) + ", column " + String(j+1));
                        mainChangeRow.push(i);
                        mainChangeColumn.push(j);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Cell");
                        levelZeroChanges++;
                        oneInACellChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                        updateSolved(intPuzzle);
                    }
                    updateShadowPossible(works, i, j, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                    tempChanges++;
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes;
    let tempLevelOneChanges = 0;

    do {
        changes = 0;
        changes += phantomChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedPairChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += hiddenPairChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempLevelOneChanges += changes;
    } while (changes !== 0 && !solved);
    
    return tempLevelOneChanges;
}

function phantomChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes;
    let tempPhantomChanges = 0;
    
    do {
        changes = 0;
        changes += rowPhantomCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += columnPhantomCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += groupPhantomRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += groupPhantomColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempPhantomChanges += changes;
    } while (changes !== 0 && !solved);

    return tempPhantomChanges;
}

function rowPhantomCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let flag;
    let count;
    let rowWork = 0;
    let columnsChanged;
    let columnsChangedCount;
    let description;

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            for (let k = 0; k < 9 && !solved; k++) { // number 1-9
                count = 0;
                columnsChanged = Array(9).fill(false);
                description = "";
                columnsChangedCount = 0;

                for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    flag = false;
                    for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (intPuzzle[i][j] === 0) {
                            if (possible[i][j][k] === k+1 && !flag) {
                                rowWork = i;
                                count++;
                                flag = true;
                            }
                        }
                    }
                }

                if (count === 1) {
                    for (let j = 0; j < 9; j++) { // column number
                        if (intPuzzle[rowWork][j] === 0) {
                            if (j < COLUMN_START[l] || j > COLUMN_END[l]) {
                                if (possible[rowWork][j][k] !== 0) {
                                    possible[rowWork][j][k] = 0;
                                    columnsChanged[j] = true;
                                    columnsChangedCount++;
                                }
                            }
                        }
                    }

                    // Save data in change log
                    if (columnsChangedCount > 0) {
                        if (!isGuessAndCheck && !isBruteForce) {
                            possibleChangeMethod.push("Phantom - Row");
                            description = "Since the number " + (k+1) + " only appears in row " + (rowWork+1) +
                                " in group " + (l+1) + ", it was removed as a possible option in the below cells:";
                            for (let j = 0; j < 9; j++) {
                                if (columnsChanged[j]) {
                                    description = description + "\nRow " + (rowWork+1) +
                                        ", Column " + (j+1) + ": " + (k+1);
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(k+1);
                                    possibleChangeRow.push(rowWork);
                                    possibleChangeColumn.push(j);
                                    possibleChangePossibleCount++;
                                }
                            }

                            possibleChangeDescription.push(description);
                            totalChangeType.push("possible");
                            totalChangeMethod.push("Phantom - Row");
                            levelOneChanges++;
                            phantomRowChanges++;
                            possibleChangeCount++;
                            totalChangeCount++;
                        }
                        tempChanges++;

                        // Run previous methods to see if the puzzle can be solved
                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function columnPhantomCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let flag;
    let count;
    let columnWork = 0;
    let rowsChanged;
    let rowsChangedCount;
    let description;

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            for (let k = 0; k < 9 && !solved; k++) { // number 1-9
                if(!Groups[l][k]) {
                    count = 0;
                    rowsChanged = Array(9).fill(false);
                    description = "";
                    rowsChangedCount = 0;

                    for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        flag = false;
                        for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                            if (intPuzzle[i][j] === 0) {
                                if (possible[i][j][k] === k+1 && !flag) {
                                    columnWork = j;
                                    count++;
                                    flag = true;
                                }
                            }
                        }
                    }

                    if (count === 1) {
                        for (let i = 0; i < 9; i++) { // row number
                            if (intPuzzle[i][columnWork] === 0) {
                                if (i < ROW_START[l] || i > ROW_END[l]) {
                                    if (possible[i][columnWork][k] !== 0) {
                                        possible[i][columnWork][k] = 0;
                                        rowsChanged[i] = true;
                                        rowsChangedCount++;
                                    }
                                }
                            }
                        }

                        // Save data in change log
                        if (rowsChangedCount > 0) {
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Column");
                                description = "Since the number " + (k+1) + " only appears in column " + (columnWork+1) +
                                    " in group " + (l+1) + ", it was removed as a possible option in the below cells:";
                                for (let i = 0; i < 9; i++) {
                                    if (rowsChanged[i]) {
                                        description = description + "\nRow " + (i+1) +
                                            ", Column " + (columnWork+1) + ": " + (k+1);
                                        possibleChangeOrder.push(possibleChangeCount);
                                        possibleChangeNumber.push(k+1);
                                        possibleChangeRow.push(i);
                                        possibleChangeColumn.push(columnWork);
                                        possibleChangePossibleCount++;
                                    }
                                }

                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Column");
                                levelOneChanges++;
                                phantomColumnChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function groupPhantomRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges;
    let groupCount;
    let groupWork;
    let tempGroup;
    let count;
    let rowsChanged = Array(6).fill(0);
    let colsChanged = Array(6).fill(0);
    let description;

    do {
        tempChanges = 0;
        for (let i = 0; i < 9 && !solved; i++) { // row number
            for (let k = 0; k < 9 && !solved; k++) { // number 1-9
                if (!Rows[i][k]) {
                    groupCount = 0;
                    groupWork = 10;
                    for (let j = 0; j < 9; j++) { // column number
                        if (intPuzzle[i][j] === 0) {
                            if (possible[i][j][k] === k+1) {
                                tempGroup = determineGroup(i, j);
                                if (tempGroup !== groupWork) {
                                    groupWork = tempGroup;
                                    groupCount++;
                                }
                            }
                        }
                    }

                    if (groupCount === 1) {
                        count = 0;
                        rowsChanged.fill(0);
                        colsChanged.fill(0);
                        description = "";
                        for (let row = ROW_START[groupWork]; row <= ROW_END[groupWork]; row++) {
                            for (let col = COLUMN_START[groupWork]; col <= COLUMN_END[groupWork]; col++) {
                                if (intPuzzle[row][col] === 0 && possible[row][col][k] === k+1 && row !== i) {
                                    possible[row][col][k] = 0;
                                    rowsChanged[count] = row;
                                    colsChanged[count] = col;
                                    count++;
                                }
                            }
                        }

                        // Save data in change log
                        if (count > 0) {
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Group");
                                description = "Since the number " + (k+1) + " only appears in group " + (groupWork+1) +
                                    " in row " + (i+1) + ", it was removed as a possible option in the below cells:";
                                for (let m = 0; m < count; m++) {
                                    description = description + "\nRow " + (rowsChanged[m]+1) +
                                        ", Column " + (colsChanged[m]+1) + ": " + (k+1);
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(k+1);
                                    possibleChangeRow.push(rowsChanged[m]);
                                    possibleChangeColumn.push(colsChanged[m]);
                                    possibleChangePossibleCount++;
                                }
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Group");
                                levelOneChanges++;
                                phantomGroupChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function groupPhantomColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges;
    let groupCount;
    let groupWork;
    let tempGroup;
    let count;
    let rowsChanged = Array(6).fill(0);
    let colsChanged = Array(6).fill(0);
    let description;

    do {
        tempChanges = 0;
        for (let j = 0; j < 9 && !solved; j++) { // column number
            for (let k = 0; k < 9 && !solved; k++) { // number 1-9
                if (!Columns[j][k]) {
                    groupCount = 0;
                    groupWork = 10;
                    for (let i = 0; i < 9; i++) { // row number
                        if (intPuzzle[i][j] === 0) {
                            if (possible[i][j][k] === k+1) {
                                tempGroup = determineGroup(i, j);
                                if (tempGroup !== groupWork) {
                                    groupWork = tempGroup;
                                    groupCount++;
                                }
                            }
                        }
                    }

                    if (groupCount === 1) {
                        count = 0;
                        rowsChanged.fill(0);
                        colsChanged.fill(0);
                        description = "";
                        for (let col = COLUMN_START[groupWork]; col <= COLUMN_END[groupWork]; col++) {
                            for (let row = ROW_START[groupWork]; row <= ROW_END[groupWork]; row++) {
                                if (intPuzzle[row][col] === 0 && possible[row][col][k] === k+1 && col !== j) {
                                    possible[row][col][k] = 0;
                                    rowsChanged[count] = row;
                                    colsChanged[count] = col;
                                    count++;
                                }
                            }
                        }

                        // Save data in change log
                        if (count > 0) {
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Group");
                                description = "Since the number " + (k+1) + " only appears in group " + (groupWork+1) +
                                    " in column " + (j+1) + ", it was removed as a possible option in the below cells:";
                                for (let m = 0; m < count; m++) {
                                    description = description + "\nRow " + (rowsChanged[m]+1) +
                                        ", Column " + (colsChanged[m]+1) + ": " + (k+1);
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(k+1);
                                    possibleChangeRow.push(rowsChanged[m]);
                                    possibleChangeColumn.push(colsChanged[m]);
                                    possibleChangePossibleCount++;
                                }
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Group");
                                levelOneChanges++;
                                phantomGroupChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedPairChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempNakedPairChanges = 0;

    do {
        changes = 0;
        changes += nakedPairRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedPairColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedPairGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempNakedPairChanges += changes;
    } while (changes !== 0 && !solved);

    return tempNakedPairChanges;
}

function nakedPairRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges;
    let numberCount = Array(9).fill(0);
    let numbers = Array(9).fill().map(() => Array(2).fill(0));
    let pairColumns = Array(9).fill(0);
    let pairCount = 0;
    let number1 = 0;
    let number2 = 0;
    let column1 = 0;
    let column2 = 0;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let columnsChanged1 = Array(9).fill(false);
    let columnsChanged2 = Array(9).fill(false);
    let description;

    do {
        tempChanges = 0;
        for (let i = 0; i < 9 && !solved; i++) { // row number
            for (let z = 0; z < 9; z++) {
                numbers[z].fill(0);
            }
            numberCount.fill(0);
            pairColumns.fill(0);
            pairCount = 0;
            
            for (let j = 0; j < 9; j++) { // column number
                if (intPuzzle[i][j] === 0) {
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            if (numberCount[j] === 0) {
                                numbers[j][0] = k;
                            } else if (numberCount[j] === 1) {
                                numbers[j][1] = k;
                            }
                            numberCount[j]++;
                        }
                    }
                }
            }

            for (let j = 0; j < 9; j++) { // column number
                if (numberCount[j] === 2) {
                    pairColumns[pairCount] = j;
                    pairCount++;
                }
            }

            if (pairCount > 1) {
                for (let m = 0; m < pairCount; m++) {
                    column1 = pairColumns[m];
                    number1 = numbers[column1][0];
                    number2 = numbers[column1][1];

                    for (let n = m+1; n < pairCount; n++) {
                        column2 = pairColumns[n];

                        if (number1 === numbers[column2][0] && number2 === numbers[column2][1]) {
                            // number1 and number2 form a naked pair in column1 and column2
                            totalCount = 0;
                            number1Changes = 0;
                            number2Changes = 0;
                            columnsChanged1.fill(0);
                            columnsChanged2.fill(0);
                            description = "";

                            for (let j = 0; j < 9; j++) {
                                if (intPuzzle[i][j] === 0 && j !== column1 && j !== column2) {
                                    if (possible[i][j][number1] === number1+1) {
                                        possible[i][j][number1] = 0;
                                        columnsChanged1[number1Changes] = j;
                                        number1Changes++;
                                        totalCount++;
                                    }
                                    if (possible[i][j][number2] === number2+1) {
                                        possible[i][j][number2] = 0;
                                        columnsChanged2[number2Changes] = j;
                                        number2Changes++;
                                        totalCount++;
                                    }
                                }
                            }

                            // save data to change log
                            if (totalCount > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.push("Naked Pair - Row");
                                    description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                        " form a naked pair in the cells (" + (i+1) + "," + (column1+1) + ") and (" +
                                        (i+1) + "," + (column2+1) + "), the below numbers were removed as possible options:";

                                    if (number1Changes > 0) {
                                        for (let s = 0; s < number1Changes; s++) {
                                            description = description + "\nRow " + (i+1) + ", Column " + (columnsChanged1[s]+1) + ": " + (number1+1);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(number1+1);
                                            possibleChangeRow.push(i);
                                            possibleChangeColumn.push(columnsChanged1[s]);
                                            possibleChangePossibleCount++;
                                        }
                                    }

                                    if (number2Changes > 0) {
                                        for (let s = 0; s < number2Changes; s++) {
                                            description = description + "\nRow " + (i+1) + ", Column " + (columnsChanged2[s]+1) + ": " + (number2+1);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(number2+1);
                                            possibleChangeRow.push(i);
                                            possibleChangeColumn.push(columnsChanged2[s]);
                                            possibleChangePossibleCount++;
                                        }
                                    }

                                    possibleChangeDescription.push(description);
                                    totalChangeType.push("possible");
                                    totalChangeMethod.push("Naked Pair - Row");
                                    levelOneChanges++;
                                    nakedPairRowChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;

                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                            }
                        }
                    }
                }
            }
        }
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedPairColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges;
    let numberCount = Array(9).fill(0);
    let numbers = Array(9).fill().map(() => Array(2).fill(0));
    let pairRows = Array(9).fill(0);
    let pairCount = 0;
    let number1 = 0;
    let number2 = 0;
    let row1 = 0;
    let row2 = 0;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let rowsChanged1 = Array(9).fill(0);
    let rowsChanged2 = Array(9).fill(0);
    let description;

    do {
        tempChanges = 0;
        for (let j = 0; j < 9 && !solved; j++) { // column number
            for (let z = 0; z < 9; z++) {
                numbers[z].fill(0);
            }
            numberCount.fill(0);
            pairRows.fill(0);
            pairCount = 0;

            for (let i = 0; i < 9; i++) { // row number
                if (intPuzzle[i][j] === 0) {
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            if (numberCount[i] === 0) {
                                numbers[i][0] = k;
                            } else if (numberCount[i] === 1) {
                                numbers[i][1] = k;
                            }
                            numberCount[i]++;
                        }
                    }
                }
            }

            for (let i = 0; i < 9; i++) { // row number
                if (numberCount[i] === 2) {
                    pairRows[pairCount] = i;
                    pairCount++;
                }
            }

            if (pairCount > 1) {
                for (let m = 0; m < pairCount; m++) {
                    row1 = pairRows[m];
                    number1 = numbers[row1][0];
                    number2 = numbers[row1][1];

                    for (let n = m+1; n < pairCount; n++) {
                        row2 = pairRows[n];

                        if (number1 === numbers[row2][0] && number2 === numbers[row2][1]) {
                            // number1 and number2 form a naked pair in row1 and row2
                            totalCount = 0;
                            number1Changes = 0;
                            number2Changes = 0;
                            rowsChanged1.fill(0);
                            rowsChanged2.fill(0);
                            description = "";

                            for (let i = 0; i < 9; i++) {
                                if (intPuzzle[i][j] === 0 && i !== row1 && i !== row2) {
                                    if (possible[i][j][number1] === number1+1) {
                                        possible[i][j][number1] = 0;
                                        rowsChanged1[number1Changes] = i;
                                        number1Changes++;
                                        totalCount++;
                                    }
                                    if (possible[i][j][number2] === number2+1) {
                                        possible[i][j][number2] = 0;
                                        rowsChanged2[number2Changes] = i;
                                        number2Changes++;
                                        totalCount++;
                                    }
                                }
                            }

                            // save data to change log
                            if (totalCount > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.push("Naked Pair - Column");
                                    description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                        " form a naked pair in the cells (" + (row1+1) + "," + (j+1) + ") and (" +
                                        (row2+1) + "," + (j+1) + "), the below numbers were removed as possible options:";

                                    if (number1Changes > 0) {
                                        for (let s = 0; s < number1Changes; s++) {
                                            description = description + "\nRow " + (rowsChanged1[s]+1) + ", Column " + (j+1) + ": " + (number1+1);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(number1+1);
                                            possibleChangeRow.push(rowsChanged1[s]);
                                            possibleChangeColumn.push(j);
                                            possibleChangePossibleCount++;
                                        }
                                    }

                                    if (number2Changes > 0) {
                                        for (let s = 0; s < number2Changes; s++) {
                                            description = description + "\nRow " + (rowsChanged2[s]+1) + ", Column " + (j+1) + ": " + (number2+1);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(number2+1);
                                            possibleChangeRow.push(rowsChanged2[s]);
                                            possibleChangeColumn.push(j);
                                            possibleChangePossibleCount++;
                                        }
                                    }

                                    possibleChangeDescription.push(description);
                                    totalChangeType.push("possible");
                                    totalChangeMethod.push("Naked Pair - Column");
                                    levelOneChanges++;
                                    nakedPairColumnChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;

                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedPairGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges;
    let numberCount = Array(9).fill().map(() => Array(9).fill(0));
    let numbers = Array(9).fill().map(() => Array(9).fill().map(() => Array(2).fill(0)));
    let pairRows = Array(9).fill(0);
    let pairColumns = Array(9).fill(0);
    let pairCount = 0;
    let number1 = 0;
    let number2 = 0;
    let row1 = 0;
    let row2 = 0;
    let column1 = 0;
    let column2 = 0;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let rowsChanged1 = Array(9).fill(0);
    let rowsChanged2 = Array(9).fill(0);
    let columnsChanged1 = Array(9).fill(0);
    let columnsChanged2 = Array(9).fill(0);
    let description;

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            for (let x = 0; x < 9; x++) {
                numberCount[x].fill(0);
                for (let y = 0; y < 9; y++) {
                    numbers[x][y].fill(0);
                }
            }
            pairCount = 0;

            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) {
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                    if (intPuzzle[i][j] === 0) {
                        for (let k = 0; k < 9; k++) {
                            if (possible[i][j][k] === k+1) {
                                if (numberCount[i][j] === 0) {
                                    numbers[i][j][0] = k;
                                } else if (numberCount[i][j] === 1) {
                                    numbers[i][j][1] = k;
                                }
                                numberCount[i][j]++;
                            }
                        }
                    }
                }
            }

            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) {
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                    if (numberCount[i][j] === 2) {
                        pairRows[pairCount] = i;
                        pairColumns[pairCount] = j;
                        pairCount++;
                    }
                }
            }

            if (pairCount > 1) {
                for (let m = 0; m < pairCount; m++) {
                    row1 = pairRows[m];
                    column1 = pairColumns[m];
                    number1 = numbers[row1][column1][0];
                    number2 = numbers[row1][column1][1];

                    for (let n = m+1; n < pairCount; n++) {
                        row2 = pairRows[n];
                        column2 = pairColumns[n];

                        if (number1 === numbers[row2][column2][0] && number2 === numbers[row2][column2][1]) {
                            // number1 and number2 form a naked pair in row1, column1 and row2, column2
                            totalCount = 0;
                            number1Changes = 0;
                            number2Changes = 0;
                            rowsChanged1.fill(0);
                            rowsChanged2.fill(0);
                            columnsChanged1.fill(0);
                            columnsChanged2.fill(0);
                            description = "";

                            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) {
                                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                                    if (intPuzzle[i][j] === 0 && !(i === row1 && j === column1) && !(i === row2 && j === column2)) {
                                        if (possible[i][j][number1] === number1+1) {
                                            possible[i][j][number1] = 0;
                                            rowsChanged1[number1Changes] = i;
                                            columnsChanged1[number1Changes] = j;
                                            number1Changes++;
                                            totalCount++;
                                        }
                                        if (possible[i][j][number2] === number2+1) {
                                            possible[i][j][number2] = 0;
                                            rowsChanged2[number2Changes] = i;
                                            columnsChanged2[number2Changes] = j;
                                            number2Changes++;
                                            totalCount++;
                                        }
                                    }
                                }
                            }

                            // save data to change log
                            if (totalCount > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.push("Naked Pair - Group");
                                    description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                        " form a naked pair in the cells (" + (row1+1) + "," + (column1+1) + ") and (" +
                                        (row2+1) + "," + (column2+1) + "), the below numbers were removed as possible options:";

                                    if (number1Changes > 0) {
                                        for (let s = 0; s < number1Changes; s++) {
                                            description = description + "\nRow " + (rowsChanged1[s]+1) + ", Column " + (columnsChanged1[s]+1) + ": " + (number1+1);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(number1+1);
                                            possibleChangeRow.push(rowsChanged1[s]);
                                            possibleChangeColumn.push(columnsChanged1[s]);
                                            possibleChangePossibleCount++;
                                        }
                                    }

                                    if (number2Changes > 0) {
                                        for (let s = 0; s < number2Changes; s++) {
                                            description = description + "\nRow " + (rowsChanged2[s]+1) + ", Column " + (columnsChanged2[s]+1) + ": " + (number2+1);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(number2+1);
                                            possibleChangeRow.push(rowsChanged2[s]);
                                            possibleChangeColumn.push(columnsChanged2[s]);
                                            possibleChangePossibleCount++;
                                        }
                                    }

                                    possibleChangeDescription.push(description);
                                    totalChangeType.push("possible");
                                    totalChangeMethod.push("Naked Pair - Group");
                                    levelOneChanges++;
                                    nakedPairGroupChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;

                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function hiddenPairChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempHiddenPairChanges = 0;

    do {
        changes = 0;
        changes += hiddenPairRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += hiddenPairColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += hiddenPairGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempHiddenPairChanges += changes;
    } while (changes !== 0 && !solved);

    return tempHiddenPairChanges;
}

function hiddenPairRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let columns = new Array(9).fill().map(() => Array(2).fill(0));
    let columnsCount = new Array(9).fill(0);
    let pairNumbers = new Array(9).fill(0);
    let pairCount = 0;
    let number1 = 0;
    let number2 = 0;
    let column1 = 0;
    let column2 = 0;
    let twoOptionCell = new Array(9).fill(false);
    let tempCount = 0;
    let totalCount = 0;
    let description = "";
    let countCell1 = 0;
    let countCell2 = 0;
    let cellNumbersChanged1 = new Array(9).fill(0);
    let cellNumbersChanged2 = new Array(9).fill(0);

    do {
        tempChanges = 0;
        for (let i = 0; i < 9 && !solved; i++) { // row number
            for (let z = 0; z < 9; z++) {
                columns[z].fill(0);
            }
            columnsCount.fill(0);
            twoOptionCell.fill(false);
            pairCount = 0;
            column1 = 0;
            column2 = 0;

            for (let k = 0; k < 9; k++) { // number 1-9
                if (!Rows[i][k]) {
                    for (let j = 0; j < 9; j++) { // column number
                        if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                            if (columnsCount[k] === 0) {
                                columns[k][0] = j;
                            } else if (columnsCount[k] === 1) {
                                columns[k][1] = j;
                            }
                            columnsCount[k]++;
                        }
                    }
                }
            }

            for (let k = 0; k < 9; k++) { // number 1-9
                if (columnsCount[k] === 2) {
                    pairNumbers[pairCount] = k;
                    pairCount++;
                }
            }

            for (let j = 0; j < 9; j++) { // column number
                if (intPuzzle[i][j] === 0) {
                    tempCount = 0;
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            tempCount++;
                        }
                    }
                    if (tempCount === 2) {
                        twoOptionCell[j] = true;
                    }
                }
            }

            if (pairCount > 1) {
                for (let m = 0; m < pairCount; m++) {
                    number1 = pairNumbers[m];
                    column1 = columns[number1][0];
                    column2 = columns[number1][1];

                    for (let n = m+1; n < pairCount; n++) {
                        number2 = pairNumbers[n];

                        if (column1 === columns[number2][0] && column2 === columns[number2][1]) {
                            if (!(twoOptionCell[column1] && twoOptionCell[column2])) {
                                // number1 and number2 form a hidden pair in column1 and column2
                                totalCount = 0;
                                countCell1 = 0;
                                countCell2 = 0;
                                cellNumbersChanged1.fill(0);
                                cellNumbersChanged2.fill(0);
                                description = "";

                                for (let k = 0; k < 9; k++) { // number 1-9
                                    if (k !== number1 && k !== number2) {
                                        if (possible[i][column1][k] === k+1) {
                                            possible[i][column1][k] = 0;
                                            cellNumbersChanged1[countCell1] = k;
                                            countCell1++;
                                            totalCount++;
                                        }
                                        if (possible[i][column2][k] === k+1) {
                                            possible[i][column2][k] = 0;
                                            cellNumbersChanged2[countCell2] = k;
                                            countCell2++;
                                            totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.push("Hidden Pair - Row");
                                        description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                            " form a hidden pair in the cells (" + (i+1) + "," + (column1+1) + ") and (" +
                                            (i+1) + "," + (column2+1) + "), the below numbers were removed as possible options:";

                                        if (countCell1 > 0) {
                                            for (let s = 0; s < countCell1; s++) {
                                                description = description + "\nRow " + (i+1) + ", Column " + (column1+1) + ": " + (cellNumbersChanged1[s]+1);
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(cellNumbersChanged1[s]+1);
                                                possibleChangeRow.push(i);
                                                possibleChangeColumn.push(column1);
                                                possibleChangePossibleCount++;
                                            }
                                        }
                                        
                                        if (countCell2 > 0) {
                                            for (let s = 0; s < countCell2; s++) {
                                                description = description + "\nRow " + (i+1) + ", Column " + (column2+1) + ": " + (cellNumbersChanged2[s]+1);
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(cellNumbersChanged2[s]+1);
                                                possibleChangeRow.push(i);
                                                possibleChangeColumn.push(column2);
                                                possibleChangePossibleCount++;
                                            }
                                        }
                                        
                                        possibleChangeDescription.push(description);
                                        totalChangeType.push("possible");
                                        totalChangeMethod.push("Hidden Pair - Row");
                                        levelOneChanges++;
                                        hiddenPairRowChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;

                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function hiddenPairColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let rows = new Array(9).fill().map(() => Array(2).fill(0));
    let rowsCount = new Array(9).fill(0);
    let pairNumbers = new Array(9).fill(0);
    let pairCount = 0;
    let number1 = 0;
    let number2 = 0;
    let row1 = 0;
    let row2 = 0;
    let twoOptionCell = new Array(9).fill(false);
    let tempCount = 0;
    let totalCount = 0;
    let description = "";
    let countCell1 = 0;
    let countCell2 = 0;
    let cellNumbersChanged1 = new Array(9).fill(0);
    let cellNumbersChanged2 = new Array(9).fill(0);

    do {
        tempChanges = 0;
        for (let j = 0; j < 9 && !solved; j++) { // column number
            for (let z = 0; z < 9; z++) {
                rows[z].fill(0);
            }
            rowsCount.fill(0);
            twoOptionCell.fill(false);
            pairCount = 0;
            row1 = 0;
            row2 = 0;

            for (let k = 0; k < 9; k++) { // number 1-9
                if (!Columns[j][k]) {
                    for (let i = 0; i < 9; i++) { // row number
                        if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                            if (rowsCount[k] === 0) {
                                rows[k][0] = i;
                            } else if (rowsCount[k] === 1) {
                                rows[k][1] = i;
                            }
                            rowsCount[k]++;
                        }
                    }
                }
            }

            for (let k = 0; k < 9; k++) { // number 1-9
                if (rowsCount[k] === 2) {
                    pairNumbers[pairCount] = k;
                    pairCount++;
                }
            }

            for (let i = 0; i < 9; i++) { // row number
                if (intPuzzle[i][j] === 0) {
                    tempCount = 0;
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            tempCount++;
                        }
                    }
                    if (tempCount === 2) {
                        twoOptionCell[i] = true;
                    }
                }
            }

            if (pairCount > 1) {
                for (let m = 0; m < pairCount; m++) {
                    number1 = pairNumbers[m];
                    row1 = rows[number1][0];
                    row2 = rows[number1][1];

                    for (let n = m+1; n < pairCount; n++) {
                        number2 = pairNumbers[n];

                        if (row1 === rows[number2][0] && row2 === rows[number2][1]) {
                            if (!(twoOptionCell[row1] && twoOptionCell[row2])) {
                                // number1 and number2 form a hidden pair in row1 and row2
                                totalCount = 0;
                                countCell1 = 0;
                                countCell2 = 0;
                                cellNumbersChanged1.fill(0);
                                cellNumbersChanged2.fill(0);
                                description = "";

                                for (let k = 0; k < 9; k++) { // number 1-9
                                    if (k !== number1 && k !== number2) {
                                        if (possible[row1][j][k] === k+1) {
                                            possible[row1][j][k] = 0;
                                            cellNumbersChanged1[countCell1] = k;
                                            countCell1++;
                                            totalCount++;
                                        }
                                        if (possible[row2][j][k] === k+1) {
                                            possible[row2][j][k] = 0;
                                            cellNumbersChanged2[countCell2] = k;
                                            countCell2++;
                                            totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.push("Hidden Pair - Column");
                                        description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                            " form a hidden pair in the cells (" + (row1+1) + "," + (j+1) + ") and (" +
                                            (row2+1) + "," + (j+1) + "), the below numbers were removed as possible options:";

                                        if (countCell1 > 0) {
                                            for (let s = 0; s < countCell1; s++) {
                                                description = description + "\nRow " + (row1+1) + ", Column " + (j+1) + ": " + (cellNumbersChanged1[s]+1);
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(cellNumbersChanged1[s]+1);
                                                possibleChangeRow.push(row1);
                                                possibleChangeColumn.push(j);
                                                possibleChangePossibleCount++;
                                            }
                                        }
                                        
                                        if (countCell2 > 0) {
                                            for (let s = 0; s < countCell2; s++) {
                                                description = description + "\nRow " + (row2+1) + ", Column " + (j+1) + ": " + (cellNumbersChanged2[s]+1);
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(cellNumbersChanged2[s]+1);
                                                possibleChangeRow.push(row2);
                                                possibleChangeColumn.push(j);
                                                possibleChangePossibleCount++;
                                            }
                                        }
                                        
                                        possibleChangeDescription.push(description);
                                        totalChangeType.push("possible");
                                        totalChangeMethod.push("Hidden Pair - Column");
                                        levelOneChanges++;
                                        hiddenPairColumnChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;

                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }   
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function hiddenPairGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let cellCount = new Array(9).fill(0);
    let rows = new Array(9).fill().map(() => Array(2).fill(0));
    let columns = new Array(9).fill().map(() => Array(2).fill(0));
    let pairNumbers = new Array(9).fill(0);
    let pairCount = 0;
    let twoOptionCells = new Array(9).fill().map(() => Array(9).fill(false));
    let tempCount = 0;
    let number1 = 0;
    let number2 = 0;
    let row1 = 0;
    let row2 = 0;
    let column1 = 0;
    let column2 = 0;
    let totalCount = 0;
    let description = "";
    let countCell1 = 0;
    let countCell2 = 0;
    let cellNumbersChanged1 = new Array(9).fill(0);
    let cellNumbersChanged2 = new Array(9).fill(0);

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            pairCount = 0;
            for (let z = 0; z < 9; z++) {
                twoOptionCells[z].fill(false);
            }
            cellCount.fill(0);
            pairNumbers.fill(0);
            for (let z = 0; z < 9; z++) {
                rows[z].fill(0);
                columns[z].fill(0);
            }

            for (let k = 0; k < 9; k++) { // number 1-9
                if (!Groups[l][k]) {
                    for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                        for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                            if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                                if (cellCount[k] === 0) {
                                    rows[k][0] = i;
                                    columns[k][0] = j;
                                } else if (cellCount[k] === 1) {
                                    rows[k][1] = i;
                                    columns[k][1] = j;
                                }
                                cellCount[k]++;
                            }
                        }
                    }
                }
            }

            for (let k = 0; k < 9; k++) { // number 1-9
                if (cellCount[k] === 2) {
                    pairNumbers[pairCount] = k;
                    pairCount++;
                }
            }

            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                    tempCount = 0;
                    if (intPuzzle[i][j] === 0) {
                        for (let k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] === k+1) {
                                tempCount++;
                            }
                        }
                        if (tempCount === 2) {
                            twoOptionCells[i][j] = true;
                        }
                    }
                }
            }

            if (pairCount > 1) {
                for (let m = 0; m < pairCount; m++) {
                    number1 = pairNumbers[m];
                    row1 = rows[number1][0];
                    column1 = columns[number1][0];
                    row2 = rows[number1][1];
                    column2 = columns[number1][1];

                    for (let n = m+1; n < pairCount; n++) {
                        number2 = pairNumbers[n];

                        if (row1 === rows[number2][0] && row2 === rows[number2][1] &&
                            column1 === columns[number2][0] && column2 === columns[number2][1]) {
                            if (!(twoOptionCells[row1][column1] && twoOptionCells[row2][column2])) {
                                // number1 and number2 form a hidden pair in row1, column1 and row2, column2
                                totalCount = 0;
                                countCell1 = 0;
                                countCell2 = 0;
                                cellNumbersChanged1.fill(0);
                                cellNumbersChanged2.fill(0);
                                description = "";

                                for (let k = 0; k < 9; k++) { // number 1-9
                                    if (k !== number1 && k !== number2) {
                                        if (possible[row1][column1][k] === k+1) {
                                            possible[row1][column1][k] = 0;
                                            cellNumbersChanged1[countCell1] = k;
                                            countCell1++;
                                            totalCount++;
                                        }
                                        if (possible[row2][column2][k] === k+1) {
                                            possible[row2][column2][k] = 0;
                                            cellNumbersChanged2[countCell2] = k;
                                            countCell2++;
                                            totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.push("Hidden Pair - Group");
                                        description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                            " form a hidden pair in the cells (" + (row1+1) + "," + (column1+1) + ") and (" +
                                            (row2+1) + "," + (column2+1) + "), the below numbers were removed as possible options:";

                                        if (countCell1 > 0) {
                                            for (let s = 0; s < countCell1; s++) {
                                                description = description + "\nRow " + (row1+1) + ", Column " + (column1+1) + ": " + (cellNumbersChanged1[s]+1);
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(cellNumbersChanged1[s]+1);
                                                possibleChangeRow.push(row1);
                                                possibleChangeColumn.push(column1);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        if (countCell2 > 0) {
                                            for (let s = 0; s < countCell2; s++) {
                                                description = description + "\nRow " + (row2+1) + ", Column " + (column2+1) + ": " + (cellNumbersChanged2[s]+1);
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(cellNumbersChanged2[s]+1);
                                                possibleChangeRow.push(row2);
                                                possibleChangeColumn.push(column2);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        possibleChangeDescription.push(description);
                                        totalChangeType.push("possible");
                                        totalChangeMethod.push("Hidden Pair - Group");
                                        levelOneChanges++;
                                        hiddenPairGroupChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;

                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function levelTwoMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempLevelTwoChanges = 0;

    do {
        changes = 0;
        changes += nakedTripleChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += hiddenTripleChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedQuadChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += xWingChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += yWingChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempLevelTwoChanges += changes;
    } while (changes !== 0 && !solved);

    return tempLevelTwoChanges;
}

function nakedTripleChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempNakedTripleChanges = 0;

    do {
        changes = 0;
        changes += nakedTripleRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedTripleColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedTripleGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempNakedTripleChanges += changes;
    } while (changes !== 0 && !solved);

    return tempNakedTripleChanges;
}

function nakedTripleRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let numberCount = new Array(9).fill(0);
    let numbers = new Array(9).fill().map(() => Array(3).fill(0));
    let tripleColumns = new Array(9).fill(0);
    let tripleCount = 0;
    let column1 = 0;
    let column2 = 0;
    let column3 = 0;
    let diffNumbers = new Array(3).fill(0);
    let countDiffNumbers = new Array(3).fill(0);
    let tempCount = 0;
    let tempNumber = 0;
    let sameFlag = false;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let number3Changes = 0;
    let columnsChanged1 = new Array(9).fill(0);
    let columnsChanged2 = new Array(9).fill(0);
    let columnsChanged3 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let i = 0; i < 9 && !solved; i++) { // row number
            for (let z = 0; z < 9; z++) {
                numbers[z].fill(0);
            }
            numberCount.fill(0);
            tripleColumns.fill(0);
            tripleCount = 0;

            // Goes down the row and counts the number of options in each cell and stores the first three
            for (let j = 0; j < 9; j++) { // column number
                if (intPuzzle[i][j] === 0) {
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            if (numberCount[j] < 3) {
                                numbers[j][numberCount[j]] = k;
                            }
                            numberCount[j]++;
                        }
                    }
                }
            }

            // Counts number of cells with 3 or less options
            for (let j = 0; j < 9; j++) { // column number
                if (numberCount[j] === 2 || numberCount[j] === 3) {
                    tripleColumns[tripleCount] = j;
                    tripleCount++;
                }
            }

            // Checks to see if any of the two or three option cells have the same numbers, forming a naked triple
            if (tripleCount > 2) {
                // Stage 1
                for (let a = 0; a <= tripleCount-3 && !solved; a++) {
                    diffNumbers.fill(0);
                    countDiffNumbers.fill(0);
                    column1 = tripleColumns[a];
                    diffNumbers[0] = numbers[column1][0];
                    diffNumbers[1] = numbers[column1][1];
                    if (numberCount[column1] === 2) {
                        countDiffNumbers[0] = 2;
                    }
                    if (numberCount[column1] === 3) {
                        diffNumbers[2] = numbers[column1][2];
                        countDiffNumbers[0] = 3;
                    }

                    // Stage 2
                    for (let b = a+1; b <= tripleCount-2 && !solved; b++) {
                        column2 = tripleColumns[b];
                        tempCount = countDiffNumbers[0];

                        for (let x = 0; x < numberCount[column2]; x++) {
                            sameFlag = false;
                            tempNumber = numbers[column2][x];
                            for (let y = 0; y < countDiffNumbers[0]; y++) {
                                if (tempNumber === diffNumbers[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 3) {
                                    diffNumbers[tempCount] = tempNumber;
                                }
                                tempCount++;
                            }
                        }
                        countDiffNumbers[1] = tempCount;

                        // Stage 3
                        if (countDiffNumbers[1] <= 3) { // There still may be a naked triple
                            for (let c = b+1; c <= tripleCount-1 && !solved; c++) {
                                column3 = tripleColumns[c];
                                tempCount = countDiffNumbers[1];

                                for (let x = 0; x < numberCount[column3]; x++) {
                                    sameFlag = false;
                                    tempNumber = numbers[column3][x];
                                    for (let y = 0; y < countDiffNumbers[1]; y++) {
                                        if (tempNumber === diffNumbers[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 3) {
                                            diffNumbers[tempCount] = tempNumber;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffNumbers[2] = tempCount;

                                if (countDiffNumbers[2] === 3) {
                                    // The 3 numbers stored in diffNumbers form a naked triple in columns 1, 2, & 3
                                    totalCount = 0;
                                    number1Changes = 0;
                                    number2Changes = 0;
                                    number3Changes = 0;
                                    columnsChanged1.fill(0);
                                    columnsChanged2.fill(0);
                                    columnsChanged3.fill(0);
                                    description = "";

                                    // Sort the numbers in ascending order while maintaining their original indices
                                    let sortedNumbers = [
                                        { value: diffNumbers[0], index: 0 },
                                        { value: diffNumbers[1], index: 1 },
                                        { value: diffNumbers[2], index: 2 }
                                    ].sort((a, b) => a.value - b.value);

                                    // Create mapping arrays to track which original number corresponds to which sorted position
                                    let originalToSorted = [0, 0, 0];
                                    let sortedToOriginal = [0, 0, 0];
                                    for (let i = 0; i < 3; i++) {
                                        originalToSorted[sortedNumbers[i].index] = i;
                                        sortedToOriginal[i] = sortedNumbers[i].index;
                                    }

                                    // Remove number1, number2, and number3 from every cell 
                                    // in row other than column1, column2, and column4
                                    for (let j = 0; j < 9; j++) {
                                        if (intPuzzle[i][j] === 0 && j !== column1 && j !== column2 && j !== column3) {
                                            if (possible[i][j][diffNumbers[0]] === diffNumbers[0]+1) {
                                                possible[i][j][diffNumbers[0]] = 0;
                                                columnsChanged1[number1Changes] = j;
                                                number1Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][j][diffNumbers[1]] === diffNumbers[1]+1) {
                                                possible[i][j][diffNumbers[1]] = 0;
                                                columnsChanged2[number2Changes] = j;
                                                number2Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][j][diffNumbers[2]] === diffNumbers[2]+1) {
                                                possible[i][j][diffNumbers[2]] = 0;
                                                columnsChanged3[number3Changes] = j;
                                                number3Changes++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.push("Naked Triple - Row");
                                            description = "Since the numbers " + (sortedNumbers[0].value+1) + ", " + (sortedNumbers[1].value+1) +
                                                ", and " + (sortedNumbers[2].value+1) + " form a naked triple in the cells (" + (i+1) + "," + (column1+1) + "), (" +
                                                (i+1) + "," + (column2+1) + "), and (" + (i+1) + "," + (column3+1) + 
                                                "), the below numbers were removed as possible options:";

                                            // Map the changes to the sorted order
                                            let changes = [
                                                { count: number1Changes, columns: columnsChanged1, number: diffNumbers[0] },
                                                { count: number2Changes, columns: columnsChanged2, number: diffNumbers[1] },
                                                { count: number3Changes, columns: columnsChanged3, number: diffNumbers[2] }
                                            ];

                                            // Log changes in sorted order
                                            for (let s = 0; s < 3; s++) {
                                                const originalIndex = sortedToOriginal[s];
                                                if (changes[originalIndex].count > 0) {
                                                    for (let t = 0; t < changes[originalIndex].count; t++) {
                                                        description = description + "\nRow " + (i+1) + ", Column " + (changes[originalIndex].columns[t]+1) + ": " + (sortedNumbers[s].value+1);
                                                        possibleChangeOrder.push(possibleChangeCount);
                                                        possibleChangeNumber.push(sortedNumbers[s].value+1);
                                                        possibleChangeRow.push(i);
                                                        possibleChangeColumn.push(changes[originalIndex].columns[t]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }
                                            }

                                            possibleChangeDescription.push(description);
                                            totalChangeType.push("possible");
                                            totalChangeMethod.push("Naked Triple - Row");
                                            levelOneChanges++;
                                            nakedTripleRowChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;

                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        if (!solved) {
                                            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedTripleColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let numberCount = new Array(9).fill(0);
    let numbers = new Array(9).fill().map(() => Array(3).fill(0));
    let tripleRows = new Array(9).fill(0);
    let tripleCount = 0;
    let row1 = 0;
    let row2 = 0;
    let row3 = 0;
    let diffNumbers = new Array(3).fill(0);
    let countDiffNumbers = new Array(3).fill(0);
    let tempCount = 0;
    let tempNumber = 0;
    let sameFlag = false;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let number3Changes = 0;
    let rowsChanged1 = new Array(9).fill(0);
    let rowsChanged2 = new Array(9).fill(0);
    let rowsChanged3 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let j = 0; j < 9 && !solved; j++) { // column number
            for (let z = 0; z < 9; z++) {
                numbers[z].fill(0);
            }
            numberCount.fill(0);
            tripleRows.fill(0);
            tripleCount = 0;

            // Goes down the column and counts the number of options in each cell and stores the first three
            for (let i = 0; i < 9; i++) { // row number
                if (intPuzzle[i][j] === 0) {
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            if (numberCount[i] < 3) {
                                numbers[i][numberCount[i]] = k;
                            }
                            numberCount[i]++;
                        }
                    }
                }
            }

            // Counts number of cells with 3 or less options
            for (let i = 0; i < 9; i++) { // row number
                if (numberCount[i] === 2 || numberCount[i] === 3) {
                    tripleRows[tripleCount] = i;
                    tripleCount++;
                }
            }

            // Checks to see if any of the two or three option cells have the same numbers, forming a naked triple
            if (tripleCount > 2) {
                // Stage 1
                for (let a = 0; a <= tripleCount-3 && !solved; a++) {
                    diffNumbers.fill(0);
                    countDiffNumbers.fill(0);
                    row1 = tripleRows[a];
                    diffNumbers[0] = numbers[row1][0];
                    diffNumbers[1] = numbers[row1][1];
                    if (numberCount[row1] === 2) {
                        countDiffNumbers[0] = 2;
                    }
                    if (numberCount[row1] === 3) {
                        diffNumbers[2] = numbers[row1][2];
                        countDiffNumbers[0] = 3;
                    }

                    // Stage 2
                    for (let b = a+1; b <= tripleCount-2 && !solved; b++) {
                        row2 = tripleRows[b];
                        tempCount = countDiffNumbers[0];

                        for (let x = 0; x < numberCount[row2]; x++) {
                            sameFlag = false;
                            tempNumber = numbers[row2][x];
                            for (let y = 0; y < countDiffNumbers[0]; y++) {
                                if (tempNumber === diffNumbers[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 3) {
                                    diffNumbers[tempCount] = tempNumber;
                                }
                                tempCount++;
                            }
                        }
                        countDiffNumbers[1] = tempCount;

                        // Stage 3
                        if (countDiffNumbers[1] <= 3) { // There still may be a naked triple
                            for (let c = b+1; c <= tripleCount-1 && !solved; c++) {
                                row3 = tripleRows[c];
                                tempCount = countDiffNumbers[1];

                                for (let x = 0; x < numberCount[row3]; x++) {
                                    sameFlag = false;
                                    tempNumber = numbers[row3][x];
                                    for (let y = 0; y < countDiffNumbers[1]; y++) {
                                        if (tempNumber === diffNumbers[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 3) {
                                            diffNumbers[tempCount] = tempNumber;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffNumbers[2] = tempCount;

                                if (countDiffNumbers[2] === 3) {
                                    // The 3 numbers stored in diffNumbers form a naked triple in rows 1, 2, & 3
                                    totalCount = 0;
                                    number1Changes = 0;
                                    number2Changes = 0;
                                    number3Changes = 0;
                                    rowsChanged1.fill(0);
                                    rowsChanged2.fill(0);
                                    rowsChanged3.fill(0);
                                    description = "";

                                    // Sort the numbers in ascending order while maintaining their original indices
                                    let sortedNumbers = [
                                        { value: diffNumbers[0], index: 0 },
                                        { value: diffNumbers[1], index: 1 },
                                        { value: diffNumbers[2], index: 2 }
                                    ].sort((a, b) => a.value - b.value);

                                    // Create mapping arrays to track which original number corresponds to which sorted position
                                    let originalToSorted = [0, 0, 0];
                                    let sortedToOriginal = [0, 0, 0];
                                    for (let i = 0; i < 3; i++) {
                                        originalToSorted[sortedNumbers[i].index] = i;
                                        sortedToOriginal[i] = sortedNumbers[i].index;
                                    }

                                    // Remove number1, number2, and number3 from every cell 
                                    // in column other than row1, row2, and row3
                                    for (let i = 0; i < 9; i++) {
                                        if (intPuzzle[i][j] === 0 && i !== row1 && i !== row2 && i !== row3) {
                                            if (possible[i][j][diffNumbers[0]] === diffNumbers[0]+1) {
                                                possible[i][j][diffNumbers[0]] = 0;
                                                rowsChanged1[number1Changes] = i;
                                                number1Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][j][diffNumbers[1]] === diffNumbers[1]+1) {
                                                possible[i][j][diffNumbers[1]] = 0;
                                                rowsChanged2[number2Changes] = i;
                                                number2Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][j][diffNumbers[2]] === diffNumbers[2]+1) {
                                                possible[i][j][diffNumbers[2]] = 0;
                                                rowsChanged3[number3Changes] = i;
                                                number3Changes++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.push("Naked Triple - Column");
                                            description = "Since the numbers " + (sortedNumbers[0].value+1) + ", " + (sortedNumbers[1].value+1) +
                                                ", and " + (sortedNumbers[2].value+1) + " form a naked triple in the cells (" + (row1+1) + "," + (j+1) + "), (" +
                                                (row2+1) + "," + (j+1) + "), and (" + (row3+1) + "," + (j+1) + 
                                                "), the below numbers were removed as possible options:";

                                            // Map the changes to the sorted order
                                            let changes = [
                                                { count: number1Changes, rows: rowsChanged1, number: diffNumbers[0] },
                                                { count: number2Changes, rows: rowsChanged2, number: diffNumbers[1] },
                                                { count: number3Changes, rows: rowsChanged3, number: diffNumbers[2] }
                                            ];

                                            // Log changes in sorted order
                                            for (let s = 0; s < 3; s++) {
                                                const originalIndex = sortedToOriginal[s];
                                                if (changes[originalIndex].count > 0) {
                                                    for (let t = 0; t < changes[originalIndex].count; t++) {
                                                        description = description + "\nRow " + (changes[originalIndex].rows[t]+1) + ", Column " + (j+1) + ": " + (sortedNumbers[s].value+1);
                                                        possibleChangeOrder.push(possibleChangeCount);
                                                        possibleChangeNumber.push(sortedNumbers[s].value+1);
                                                        possibleChangeRow.push(changes[originalIndex].rows[t]);
                                                        possibleChangeColumn.push(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }
                                            }

                                            possibleChangeDescription.push(description);
                                            totalChangeType.push("possible");
                                            totalChangeMethod.push("Naked Triple - Column");
                                            levelOneChanges++;
                                            nakedTripleColumnChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;

                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        if (!solved) {
                                            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedTripleGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let numberCount = new Array(9).fill().map(() => Array(9).fill(0));
    let numbers = new Array(9).fill().map(() => Array(9).fill().map(() => Array(3).fill(0)));
    let tripleRows = new Array(9).fill(0);
    let tripleColumns = new Array(9).fill(0);
    let tripleCount = 0;
    let row1 = 0;
    let row2 = 0;
    let row3 = 0;
    let column1 = 0;
    let column2 = 0;
    let column3 = 0;
    let diffNumbers = new Array(3).fill(0);
    let countDiffNumbers = new Array(3).fill(0);
    let tempCount = 0;
    let tempNumber = 0;
    let sameFlag = false;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let number3Changes = 0;
    let rowsChanged1 = new Array(9).fill(0);
    let rowsChanged2 = new Array(9).fill(0);
    let rowsChanged3 = new Array(9).fill(0);
    let columnsChanged1 = new Array(9).fill(0);
    let columnsChanged2 = new Array(9).fill(0);
    let columnsChanged3 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            for (let x = 0; x < 9; x++) {
                numberCount[x].fill(0);
                for (let y = 0; y < 9; y++) {
                    numbers[x][y].fill(0);
                }
            }
            tripleRows.fill(0);
            tripleColumns.fill(0);
            tripleCount = 0;

            // Goes down the group and counts the number of options in each cell and stores the first three
            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                    if (intPuzzle[i][j] === 0) {
                        for (let k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] === k+1) {
                                if (numberCount[i][j] < 3) {
                                    numbers[i][j][numberCount[i][j]] = k;
                                }
                                numberCount[i][j]++;
                            }
                        }
                    }
                }
            }

            // Counts number of cells with 3 or less options
            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                    if (numberCount[i][j] === 2 || numberCount[i][j] === 3) {
                        tripleRows[tripleCount] = i;
                        tripleColumns[tripleCount] = j;
                        tripleCount++;
                    }
                }
            }

            // Checks to see if any of the two or three option cells have the same numbers, forming a naked triple
            if (tripleCount > 2) {
                // Stage 1
                for (let a = 0; a <= tripleCount-3 && !solved; a++) {
                    diffNumbers.fill(0);
                    countDiffNumbers.fill(0);
                    row1 = tripleRows[a];
                    column1 = tripleColumns[a];
                    diffNumbers[0] = numbers[row1][column1][0];
                    diffNumbers[1] = numbers[row1][column1][1];
                    if (numberCount[row1][column1] === 2) {
                        countDiffNumbers[0] = 2;
                    }
                    if (numberCount[row1][column1] === 3) {
                        diffNumbers[2] = numbers[row1][column1][2];
                        countDiffNumbers[0] = 3;
                    }

                    // Stage 2
                    for (let b = a+1; b <= tripleCount-2 && !solved; b++) {
                        row2 = tripleRows[b];
                        column2 = tripleColumns[b];
                        tempCount = countDiffNumbers[0];

                        for (let x = 0; x < numberCount[row2][column2]; x++) {
                            sameFlag = false;
                            tempNumber = numbers[row2][column2][x];
                            for (let y = 0; y < countDiffNumbers[0]; y++) {
                                if (tempNumber === diffNumbers[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 3) {
                                    diffNumbers[tempCount] = tempNumber;
                                }
                                tempCount++;
                            }
                        }
                        countDiffNumbers[1] = tempCount;
                        
                        // Stage 3
                        if (countDiffNumbers[1] <= 3) { // There still may be a naked triple
                            for (let c = b+1; c <= tripleCount-1 && !solved; c++) {
                                row3 = tripleRows[c];
                                column3 = tripleColumns[c];
                                tempCount = countDiffNumbers[1];

                                for (let x = 0; x < numberCount[row3][column3]; x++) {
                                    sameFlag = false;
                                    tempNumber = numbers[row3][column3][x];
                                    for (let y = 0; y < countDiffNumbers[1]; y++) {
                                        if (tempNumber === diffNumbers[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 3) {
                                            diffNumbers[tempCount] = tempNumber;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffNumbers[2] = tempCount;

                                if (countDiffNumbers[2] === 3) {
                                    // The 3 numbers stored in diffNumbers form a naked triple in rows 1, 2, & 3
                                    totalCount = 0;
                                    number1Changes = 0;
                                    number2Changes = 0;
                                    number3Changes = 0;
                                    rowsChanged1.fill(0);
                                    rowsChanged2.fill(0);
                                    rowsChanged3.fill(0);
                                    columnsChanged1.fill(0);
                                    columnsChanged2.fill(0);
                                    columnsChanged3.fill(0);
                                    description = "";

                                    // Sort the numbers in ascending order while maintaining their original indices
                                    let sortedNumbers = [
                                        { value: diffNumbers[0], index: 0 },
                                        { value: diffNumbers[1], index: 1 },
                                        { value: diffNumbers[2], index: 2 }
                                    ].sort((a, b) => a.value - b.value);

                                    // Create mapping arrays to track which original number corresponds to which sorted position
                                    let originalToSorted = [0, 0, 0];
                                    let sortedToOriginal = [0, 0, 0];
                                    for (let i = 0; i < 3; i++) {
                                        originalToSorted[sortedNumbers[i].index] = i;
                                        sortedToOriginal[i] = sortedNumbers[i].index;
                                    }

                                    // Remove number1, number2, and number3 from every cell 
                                    // in group other than cells 1, 2, and 3
                                    for (let i = ROW_START[l]; i <= ROW_END[l]; i++) {
                                        for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                                            if (intPuzzle[i][j] === 0 && !(i === row1 && j === column1) && !(i === row2 && j === column2) &&
                                                !(i === row3 && j === column3)) {
                                                if (possible[i][j][diffNumbers[0]] === diffNumbers[0]+1) {
                                                    possible[i][j][diffNumbers[0]] = 0;
                                                    rowsChanged1[number1Changes] = i;
                                                    columnsChanged1[number1Changes] = j;
                                                    number1Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][j][diffNumbers[1]] === diffNumbers[1]+1) {
                                                    possible[i][j][diffNumbers[1]] = 0;
                                                    rowsChanged2[number2Changes] = i;
                                                    columnsChanged2[number2Changes] = j;
                                                    number2Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][j][diffNumbers[2]] === diffNumbers[2]+1) {
                                                    possible[i][j][diffNumbers[2]] = 0;
                                                    rowsChanged3[number3Changes] = i;
                                                    columnsChanged3[number3Changes] = j;
                                                    number3Changes++;
                                                    totalCount++;
                                                }
                                            }
                                        }
                                    }

                                    // save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.push("Naked Triple - Group");
                                            description = "Since the numbers " + (sortedNumbers[0].value+1) + ", " + (sortedNumbers[1].value+1) +
                                                ", and " + (sortedNumbers[2].value+1) + " form a naked triple in the cells (" + (row1+1) + "," + (column1+1) + "), (" +
                                                (row2+1) + "," + (column2+1) + "), and (" + (row3+1) + "," + (column3+1) + 
                                                "), the below numbers were removed as possible options:";

                                            // Map the changes to the sorted order
                                            let changes = [
                                                { count: number1Changes, rows: rowsChanged1, columns: columnsChanged1, number: diffNumbers[0] },
                                                { count: number2Changes, rows: rowsChanged2, columns: columnsChanged2, number: diffNumbers[1] },
                                                { count: number3Changes, rows: rowsChanged3, columns: columnsChanged3, number: diffNumbers[2] }
                                            ];

                                            // Log changes in sorted order
                                            for (let s = 0; s < 3; s++) {
                                                const originalIndex = sortedToOriginal[s];
                                                if (changes[originalIndex].count > 0) {
                                                    for (let t = 0; t < changes[originalIndex].count; t++) {
                                                        description = description + "\nRow " + (changes[originalIndex].rows[t]+1) + ", Column " + (changes[originalIndex].columns[t]+1) + ": " + (sortedNumbers[s].value+1);
                                                        possibleChangeOrder.push(possibleChangeCount);
                                                        possibleChangeNumber.push(sortedNumbers[s].value+1);
                                                        possibleChangeRow.push(changes[originalIndex].rows[t]);
                                                        possibleChangeColumn.push(changes[originalIndex].columns[t]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }
                                            }

                                            possibleChangeDescription.push(description);
                                            totalChangeType.push("possible");
                                            totalChangeMethod.push("Naked Triple - Group");
                                            levelOneChanges++;
                                            nakedTripleGroupChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;

                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        if (!solved) {
                                            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function hiddenTripleChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempHiddenTripleChanges = 0;
    
    do {
        changes = 0;
        changes += hiddenTripleRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += hiddenTripleColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += hiddenTripleGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempHiddenTripleChanges += changes;
    } while (changes !== 0 && !solved);

    return tempHiddenTripleChanges;
}

function hiddenTripleRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let columns = new Array(9).fill().map(() => Array(3).fill(0));
    let columnsCount = new Array(9).fill(0);
    let tripleNumbers = new Array(9).fill(0);
    let tripleCount = 0;
    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let diffColumns = new Array(3).fill(0);
    let countDiffColumns = new Array(3).fill(0);
    let tempCount = 0;
    let tempColumn = 0;
    let sameFlag = false;
    let totalCount = 0;
    let column1Changes = 0;
    let column2Changes = 0;
    let column3Changes = 0;
    let numbersChanged1 = new Array(9).fill(0);
    let numbersChanged2 = new Array(9).fill(0);
    let numbersChanged3 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let i = 0; i < 9 && !solved; i++) { // row number
            for (let z = 0; z < 9; z++) {
                columns[z].fill(0);
            }
            columnsCount.fill(0);
            tripleNumbers.fill(0);
            tripleCount = 0;

            // Goes down the row, counts how many columns each number appears in, then stores the first three
            for (let k = 0; k < 9; k++) { // number 1-9
                if (!Rows[i][k]) {
                    for (let j = 0; j < 9; j++) { // column number
                        if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                            if (columnsCount[k] < 3) {
                                columns[k][columnsCount[k]] = j;
                            }
                            columnsCount[k]++;
                        }
                    }
                }
            }

            // Counts the number of numbers 1-9 that appear in only 2 or 3 columns
            for (let k = 0; k < 9; k++) { // number 1-9
                if (columnsCount[k] === 2 || columnsCount[k] === 3) {
                    tripleNumbers[tripleCount] = k;
                    tripleCount++;
                }
            }

            // Checks to see if any of the numbers match any other numbers, forming a hidden triple
            if (tripleCount > 2) {
                // Stage 1
                for (let a = 0; a <= tripleCount-3 && !solved; a++) {
                    diffColumns.fill(0);
                    countDiffColumns.fill(0);
                    number1 = tripleNumbers[a];
                    diffColumns[0] = columns[number1][0];
                    diffColumns[1] = columns[number1][1];
                    if (columnsCount[number1] === 2) {
                        countDiffColumns[0] = 2;
                    }
                    if (columnsCount[number1] === 3) {
                        diffColumns[2] = columns[number1][2];
                        countDiffColumns[0] = 3;
                    }

                    // Stage 2
                    for (let b = a+1; b <= tripleCount-2 && !solved; b++) {
                        number2 = tripleNumbers[b];
                        tempCount = countDiffColumns[0];

                        for (let x = 0; x < columnsCount[number2]; x++) {
                            sameFlag = false;
                            tempColumn = columns[number2][x];
                            for (let y = 0; y < countDiffColumns[0]; y++) {
                                if (tempColumn === diffColumns[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 3) {
                                    diffColumns[tempCount] = tempColumn;
                                }
                                tempCount++;
                            }
                        }
                        countDiffColumns[1] = tempCount;

                        // Stage 3
                        if (countDiffColumns[1] <= 3) { // There still may be a hidden triple
                            for (let c = b+1; c <= tripleCount-1 && !solved; c++) {
                                number3 = tripleNumbers[c];
                                tempCount = countDiffColumns[1];

                                for (let x = 0; x < columnsCount[number3]; x++) {
                                    sameFlag = false;
                                    tempColumn = columns[number3][x];
                                    for (let y = 0; y < countDiffColumns[1]; y++) {
                                        if (tempColumn === diffColumns[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 3) {
                                            diffColumns[tempCount] = tempColumn;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffColumns[2] = tempCount;

                                if (countDiffColumns[2] === 3) { // number1, number2 and number3 form a hidden triple in column1, column2 and column3
                                    totalCount = 0;
                                    column1Changes = 0;
                                    column2Changes = 0;
                                    column3Changes = 0;
                                    numbersChanged1.fill(0);
                                    numbersChanged2.fill(0);
                                    numbersChanged3.fill(0);
                                    description = "";

                                    // Remove all numbers except number1, number2, number3 from 
                                    // all columns except column1, column2, and column3
                                    for (let k = 0; k < 9; k++) {
                                        if (k !== number1 && k !== number2 && k !== number3) {
                                            if (possible[i][diffColumns[0]][k] === k+1) {
                                                possible[i][diffColumns[0]][k] = 0;
                                                numbersChanged1[column1Changes] = k;
                                                column1Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][diffColumns[1]][k] === k+1) {
                                                possible[i][diffColumns[1]][k] = 0;
                                                numbersChanged2[column2Changes] = k;
                                                column2Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][diffColumns[2]][k] === k+1) {
                                                possible[i][diffColumns[2]][k] = 0;
                                                numbersChanged3[column3Changes] = k;
                                                column3Changes++;
                                                totalCount++;
                                            }
                                        }
                                    }
                                    
                                    // Save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.push("Hidden Triple - Row");
                                            
                                            // Sort the numbers in ascending order
                                            const sortedNumbers = [number1, number2, number3].sort((a, b) => a - b);
                                            
                                            description = "Since the numbers " + (sortedNumbers[0]+1) + ", " + (sortedNumbers[1]+1) + " and " +
                                                (sortedNumbers[2]+1) + " form a hidden triple in the cells (" + (i+1) + "," + (diffColumns[0]+1) + "), (" +
                                                (i+1) + "," + (diffColumns[1]+1) + ") and (" + (i+1) + "," + (diffColumns[2]+1) + 
                                                "), the below numbers were removed as possible options:";

                                            if (column1Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers1 = numbersChanged1.slice(0, column1Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < column1Changes; s++) {
                                                    description = description + "\nRow " + (i+1) + ", Column " + (diffColumns[0]+1) + ": " + (sortedNumbers1[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers1[s]+1);
                                                    possibleChangeRow.push(i);
                                                    possibleChangeColumn.push(diffColumns[0]);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (column2Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers2 = numbersChanged2.slice(0, column2Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < column2Changes; s++) {
                                                    description = description + "\nRow " + (i+1) + ", Column " + (diffColumns[1]+1) + ": " + (sortedNumbers2[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers2[s]+1);
                                                    possibleChangeRow.push(i);
                                                    possibleChangeColumn.push(diffColumns[1]);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (column3Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers3 = numbersChanged3.slice(0, column3Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < column3Changes; s++) {
                                                    description = description + "\nRow " + (i+1) + ", Column " + (diffColumns[2]+1) + ": " + (sortedNumbers3[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers3[s]+1);
                                                    possibleChangeRow.push(i);
                                                    possibleChangeColumn.push(diffColumns[2]);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            possibleChangeDescription.push(description);
                                            totalChangeType.push("possible");
                                            totalChangeMethod.push("Hidden Triple - Row");
                                            levelTwoChanges++;
                                            hiddenTripleRowChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;

                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        if (!solved) {
                                            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function hiddenTripleColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let rows = new Array(9).fill().map(() => Array(3).fill(0));
    let rowsCount = new Array(9).fill(0);
    let tripleNumbers = new Array(9).fill(0);
    let tripleCount = 0;
    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let diffRows = new Array(3).fill(0);
    let countDiffRows = new Array(3).fill(0);
    let tempCount = 0;
    let tempRow = 0;
    let sameFlag = false;
    let totalCount = 0;
    let row1Changes = 0;
    let row2Changes = 0;
    let row3Changes = 0;
    let numbersChanged1 = new Array(9).fill(0);
    let numbersChanged2 = new Array(9).fill(0);
    let numbersChanged3 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let j = 0; j < 9 && !solved; j++) { // column number
            for (let z = 0; z < 9; z++) {
                rows[z].fill(0);
            }
            rowsCount.fill(0);
            tripleNumbers.fill(0);
            tripleCount = 0;

            // Goes down the column, counts how many rows each number appears in, then stores the first three
            for (let k = 0; k < 9; k++) { // number 1-9
                if (!Columns[j][k]) {
                    for (let i = 0; i < 9; i++) { // row number
                        if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                            if (rowsCount[k] < 3) {
                                rows[k][rowsCount[k]] = i;
                            }
                            rowsCount[k]++;
                        }
                    }
                }
            }

            // Counts the number of numbers 1-9 that appear in only 2 or 3 rows
            for (let k = 0; k < 9; k++) { // number 1-9
                if (rowsCount[k] === 2 || rowsCount[k] === 3) {
                    tripleNumbers[tripleCount] = k;
                    tripleCount++;
                }
            }

            // Checks to see if any of the numbers match any other numbers, forming a hidden triple
            if (tripleCount > 2) {
                // Stage 1
                for (let a = 0; a <= tripleCount-3 && !solved; a++) {
                    diffRows.fill(0);
                    countDiffRows.fill(0);
                    number1 = tripleNumbers[a];
                    diffRows[0] = rows[number1][0];
                    diffRows[1] = rows[number1][1];
                    if (rowsCount[number1] === 2) {
                        countDiffRows[0] = 2;
                    }
                    if (rowsCount[number1] === 3) {
                        diffRows[2] = rows[number1][2];
                        countDiffRows[0] = 3;
                    }

                    // Stage 2
                    for (let b = a+1; b <= tripleCount-2 && !solved; b++) {
                        number2 = tripleNumbers[b];
                        tempCount = countDiffRows[0];

                        for (let x = 0; x < rowsCount[number2]; x++) {
                            sameFlag = false;
                            tempRow = rows[number2][x];
                            for (let y = 0; y < countDiffRows[0]; y++) {
                                if (tempRow === diffRows[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 3) {
                                    diffRows[tempCount] = tempRow;
                                }
                                tempCount++;
                            }
                        }
                        countDiffRows[1] = tempCount;

                        // Stage 3
                        if (countDiffRows[1] <= 3) { // There still may be a hidden triple
                            for (let c = b+1; c <= tripleCount-1 && !solved; c++) {
                                number3 = tripleNumbers[c];
                                tempCount = countDiffRows[1];

                                for (let x = 0; x < rowsCount[number3]; x++) {
                                    sameFlag = false;
                                    tempRow = rows[number3][x];
                                    for (let y = 0; y < countDiffRows[1]; y++) {
                                        if (tempRow === diffRows[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 3) {
                                            diffRows[tempCount] = tempRow;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffRows[2] = tempCount;

                                if (countDiffRows[2] === 3) { // number1, number2 and number3 form a hidden triple in row1, row2 and row3
                                    totalCount = 0;
                                    row1Changes = 0;
                                    row2Changes = 0;
                                    row3Changes = 0;
                                    numbersChanged1.fill(0);
                                    numbersChanged2.fill(0);
                                    numbersChanged3.fill(0);
                                    description = "";

                                    // Remove all numbers except number1, number2, number3 from 
                                    // all rows except row1, row2, and row3
                                    for (let k = 0; k < 9; k++) {
                                        if (k !== number1 && k !== number2 && k !== number3) {
                                            if (possible[diffRows[0]][j][k] === k+1) {
                                                possible[diffRows[0]][j][k] = 0;
                                                numbersChanged1[row1Changes] = k;
                                                row1Changes++;
                                                totalCount++;
                                            }
                                            if (possible[diffRows[1]][j][k] === k+1) {
                                                possible[diffRows[1]][j][k] = 0;
                                                numbersChanged2[row2Changes] = k;
                                                row2Changes++;
                                                totalCount++;
                                            }
                                            if (possible[diffRows[2]][j][k] === k+1) {
                                                possible[diffRows[2]][j][k] = 0;
                                                numbersChanged3[row3Changes] = k;
                                                row3Changes++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // Save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.push("Hidden Triple - Column");

                                            // Sort the numbers in ascending order
                                            const sortedNumbers = [number1, number2, number3].sort((a, b) => a - b);
                                            
                                            description = "Since the numbers " + (sortedNumbers[0]+1) + ", " + (sortedNumbers[1]+1) + " and " +
                                                (sortedNumbers[2]+1) + " form a hidden triple in the cells (" + (diffRows[0]+1) + "," + (j+1) + "), (" +
                                                (diffRows[1]+1) + "," + (j+1) + ") and (" + (diffRows[2]+1) + "," + (j+1) + 
                                                "), the below numbers were removed as possible options:";

                                            if (row1Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers1 = numbersChanged1.slice(0, row1Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < row1Changes; s++) {
                                                    description = description + "\nRow " + (diffRows[0]+1) + ", Column " + (j+1) + ": " + (sortedNumbers1[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers1[s]+1);
                                                    possibleChangeRow.push(diffRows[0]);
                                                    possibleChangeColumn.push(j);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (row2Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers2 = numbersChanged2.slice(0, row2Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < row2Changes; s++) {
                                                    description = description + "\nRow " + (diffRows[1]+1) + ", Column " + (j+1) + ": " + (sortedNumbers2[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers2[s]+1);
                                                    possibleChangeRow.push(diffRows[1]);
                                                    possibleChangeColumn.push(j);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (row3Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers3 = numbersChanged3.slice(0, row3Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < row3Changes; s++) {
                                                    description = description + "\nRow " + (diffRows[2]+1) + ", Column " + (j+1) + ": " + (sortedNumbers3[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers3[s]+1);
                                                    possibleChangeRow.push(diffRows[2]);
                                                    possibleChangeColumn.push(j);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            possibleChangeDescription.push(description);
                                            totalChangeType.push("possible");
                                            totalChangeMethod.push("Hidden Triple - Column");
                                            levelTwoChanges++;
                                            hiddenTripleColumnChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;

                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        if (!solved) {
                                            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function hiddenTripleGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let rows = new Array(9).fill().map(() => Array(3).fill(0));
    let columns = new Array(9).fill().map(() => Array(3).fill(0));
    let cellCount = new Array(9).fill(0);
    let tripleNumbers = new Array(9).fill(0);
    let tripleCount = 0;
    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let diffRows = new Array(3).fill(0);
    let diffColumns = new Array(3).fill(0);
    let countDiffCells = new Array(3).fill(0);
    let tempCount = 0;
    let tempRow = 0;
    let tempColumn = 0;
    let sameFlag = false;
    let totalCount = 0;
    let cell1Changes = 0;
    let cell2Changes = 0;
    let cell3Changes = 0;
    let numbersChanged1 = new Array(9).fill(0);
    let numbersChanged2 = new Array(9).fill(0);
    let numbersChanged3 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            for (let z = 0; z < 9; z++) {
                rows[z].fill(0);
                columns[z].fill(0);
            }
            cellCount.fill(0);
            tripleNumbers.fill(0);
            tripleCount = 0;

            // Goes down the group, counts how many cells each number appears in, then stores the first three
            for (let k = 0; k < 9; k++) { // number 1-9
                if (!Groups[l][k]) {
                    for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                        for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                            if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                                if (cellCount[k] < 3) {
                                    rows[k][cellCount[k]] = i;
                                    columns[k][cellCount[k]] = j;
                                }
                                cellCount[k]++;
                            }
                        }
                    }
                }
            }

            // Counts the number of numbers 1-9 that appear in only 2 or 3 cells
            for (let k = 0; k < 9; k++) { // number 1-9
                if (cellCount[k] === 2 || cellCount[k] === 3) {
                    tripleNumbers[tripleCount] = k;
                    tripleCount++;
                }
            }

            // Checks to see if any of the numbers match any other numbers, forming a hidden triple
            if (tripleCount > 2) {
                // Stage 1
                for (let a = 0; a <= tripleCount-3 && !solved; a++) {
                    diffRows.fill(0);
                    diffColumns.fill(0);
                    countDiffCells.fill(0);
                    number1 = tripleNumbers[a];
                    diffRows[0] = rows[number1][0];
                    diffColumns[0] = columns[number1][0];
                    diffRows[1] = rows[number1][1];
                    diffColumns[1] = columns[number1][1];
                    if (cellCount[number1] === 2) {
                        countDiffCells[0] = 2;
                    }
                    if (cellCount[number1] === 3) {
                        diffRows[2] = rows[number1][2];
                        diffColumns[2] = columns[number1][2];
                        countDiffCells[0] = 3;
                    }
                    

                    // Stage 2
                    for (let b = a+1; b <= tripleCount-2 && !solved; b++) {
                        number2 = tripleNumbers[b];
                        tempCount = countDiffCells[0];

                        for (let x = 0; x < cellCount[number2]; x++) {
                            sameFlag = false;
                            tempRow = rows[number2][x];
                            tempColumn = columns[number2][x];
                            for (let y = 0; y < countDiffCells[0]; y++) {
                                if (tempRow === diffRows[y] && tempColumn === diffColumns[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 3) {
                                    diffRows[tempCount] = tempRow;
                                    diffColumns[tempCount] = tempColumn;
                                }
                                tempCount++;
                            }
                        }
                        countDiffCells[1] = tempCount;

                        // Stage 3
                        if (countDiffCells[1] <= 3) { // There still may be a hidden triple
                            for (let c = b+1; c <= tripleCount-1 && !solved; c++) {
                                number3 = tripleNumbers[c];
                                tempCount = countDiffCells[1];

                                for (let x = 0; x < cellCount[number3]; x++) {
                                    sameFlag = false;
                                    tempRow = rows[number3][x];
                                    tempColumn = columns[number3][x];
                                    for (let y = 0; y < countDiffCells[1]; y++) {
                                        if (tempRow === diffRows[y] && tempColumn === diffColumns[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 3) {
                                            diffRows[tempCount] = tempRow;
                                            diffColumns[tempCount] = tempColumn;
                                        }
                                        tempCount++;
                                    }   
                                }
                                countDiffCells[2] = tempCount;

                                if (countDiffCells[2] === 3) { // number1, number2 and number3 form a hidden triple in cell1, cell2 and cell3
                                    totalCount = 0;
                                    cell1Changes = 0;
                                    cell2Changes = 0;
                                    cell3Changes = 0;
                                    numbersChanged1.fill(0);
                                    numbersChanged2.fill(0);
                                    numbersChanged3.fill(0);
                                    description = "";

                                    // Remove all numbers except number1, number2, number3 from 
                                    // all cells except cells 1, 2, and 3
                                    for (let k = 0; k < 9; k++) {
                                        if (k !== number1 && k !== number2 && k !== number3) {
                                            if (possible[diffRows[0]][diffColumns[0]][k] === k+1) {
                                                possible[diffRows[0]][diffColumns[0]][k] = 0;
                                                numbersChanged1[cell1Changes] = k;
                                                cell1Changes++;
                                                totalCount++;
                                            }
                                            if (possible[diffRows[1]][diffColumns[1]][k] === k+1) {
                                                possible[diffRows[1]][diffColumns[1]][k] = 0;
                                                numbersChanged2[cell2Changes] = k;
                                                cell2Changes++;
                                                totalCount++;
                                            }
                                            if (possible[diffRows[2]][diffColumns[2]][k] === k+1) {
                                                possible[diffRows[2]][diffColumns[2]][k] = 0;
                                                numbersChanged3[cell3Changes] = k;
                                                cell3Changes++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // Save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.push("Hidden Triple - Group");

                                            // Sort the numbers in ascending order
                                            const sortedNumbers = [number1, number2, number3].sort((a, b) => a - b);
                                            
                                            description = "Since the numbers " + (sortedNumbers[0]+1) + ", " + (sortedNumbers[1]+1) + " and " +
                                                (sortedNumbers[2]+1) + " form a hidden triple in the cells (" + (diffRows[0]+1) + "," + (diffColumns[0]+1) + "), (" +
                                                (diffRows[1]+1) + "," + (diffColumns[1]+1) + ") and (" + (diffRows[2]+1) + "," + (diffColumns[2]+1) + 
                                                "), the below numbers were removed as possible options:";

                                            if (cell1Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers1 = numbersChanged1.slice(0, cell1Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < cell1Changes; s++) {
                                                    description = description + "\nRow " + (diffRows[0]+1) + ", Column " + (diffColumns[0]+1) + ": " + (sortedNumbers1[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers1[s]+1);
                                                    possibleChangeRow.push(diffRows[0]);
                                                    possibleChangeColumn.push(diffColumns[0]);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (cell2Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers2 = numbersChanged2.slice(0, cell2Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < cell2Changes; s++) {
                                                    description = description + "\nRow " + (diffRows[1]+1) + ", Column " + (diffColumns[1]+1) + ": " + (sortedNumbers2[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers2[s]+1);
                                                    possibleChangeRow.push(diffRows[1]);
                                                    possibleChangeColumn.push(diffColumns[1]);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (cell3Changes > 0) {
                                                // Sort numbers in ascending order
                                                const sortedNumbers3 = numbersChanged3.slice(0, cell3Changes).sort((a, b) => a - b);
                                                for (let s = 0; s < cell3Changes; s++) {
                                                    description = description + "\nRow " + (diffRows[2]+1) + ", Column " + (diffColumns[2]+1) + ": " + (sortedNumbers3[s]+1);
                                                    possibleChangeOrder.push(possibleChangeCount);
                                                    possibleChangeNumber.push(sortedNumbers3[s]+1);
                                                    possibleChangeRow.push(diffRows[2]);
                                                    possibleChangeColumn.push(diffColumns[2]);
                                                    possibleChangePossibleCount++;
                                                }
                                            }   

                                            possibleChangeDescription.push(description);
                                            totalChangeType.push("possible");
                                            totalChangeMethod.push("Hidden Triple - Group");
                                            levelTwoChanges++;
                                            hiddenTripleGroupChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;

                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        if (!solved) {
                                            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedQuadChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempNakedQuadChanges = 0;
    
    do {
        changes = 0;
        changes += nakedQuadRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedQuadColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += nakedQuadGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempNakedQuadChanges += changes;
    } while (changes !== 0 && !solved);

    return tempNakedQuadChanges;
}

function nakedQuadRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let numberCount = new Array(9).fill(0);
    let numbers = new Array(9).fill().map(() => Array(4).fill(0));
    let quadColumns = new Array(9).fill(0);
    let quadCount = 0;
    let column1 = 0;
    let column2 = 0;
    let column3 = 0;
    let column4 = 0;
    let diffNumbers = new Array(4).fill(0);
    let countDiffNumbers = new Array(4).fill(0);
    let tempCount = 0;
    let tempNumber = 0;
    let sameFlag = false;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let number3Changes = 0;
    let number4Changes = 0;
    let columnsChanged1 = new Array(9).fill(0);
    let columnsChanged2 = new Array(9).fill(0);
    let columnsChanged3 = new Array(9).fill(0);
    let columnsChanged4 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let i = 0; i < 9 && !solved; i++) { // row number
            for (let z = 0; z < 9; z++) {
                numbers[z].fill(0);
            }
            numberCount.fill(0);
            quadColumns.fill(0);
            quadCount = 0;

            // Goes down the row and counts the number of options in each cell and stores the first four
            for (let j = 0; j < 9; j++) { // column number
                if (intPuzzle[i][j] === 0) {
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            if (numberCount[j] < 4) {
                                numbers[j][numberCount[j]] = k;
                            }
                            numberCount[j]++;
                        }
                    }
                }
            }

            // Counts number of cells with 4 or less options
            for (let j = 0; j < 9; j++) { // column number
                if (numberCount[j] === 2 || numberCount[j] === 3 || numberCount[j] === 4) {
                    quadColumns[quadCount] = j;
                    quadCount++;
                }
            }

            // Checks to see if any of the two, three or four option cells have the same numbers, forming a naked quad
            if (quadCount > 3) {
                // Stage 1
                for (let a = 0; a <= quadCount-4 && !solved; a++) {
                    diffNumbers.fill(0);
                    countDiffNumbers.fill(0);
                    column1 = quadColumns[a];
                    diffNumbers[0] = numbers[column1][0];
                    diffNumbers[1] = numbers[column1][1];
                    if (numberCount[column1] === 2) {
                        countDiffNumbers[0] = 2;
                    }
                    if (numberCount[column1] === 3) {
                        diffNumbers[2] = numbers[column1][2];
                        countDiffNumbers[0] = 3;
                    }
                    if (numberCount[column1] === 4) {
                        diffNumbers[2] = numbers[column1][2];
                        diffNumbers[3] = numbers[column1][3];
                        countDiffNumbers[0] = 4;
                    }
                    
                    // Stage 2
                    for (let b = a+1; b <= quadCount-3 && !solved; b++) {
                        column2 = quadColumns[b];
                        tempCount = countDiffNumbers[0];
                        
                        for (let x = 0; x < numberCount[column2]; x++) {
                            sameFlag = false;
                            tempNumber = numbers[column2][x];
                            for (let y = 0; y < countDiffNumbers[0]; y++) {
                                if (tempNumber === diffNumbers[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 4) {
                                    diffNumbers[tempCount] = tempNumber;
                                }
                                tempCount++;
                            }
                        }
                        countDiffNumbers[1] = tempCount;
                        
                        // Stage 3
                        if (countDiffNumbers[1] <= 4) { // There still may be a naked quad
                            for (let c = b+1; c <= quadCount-2 && !solved; c++) {
                                column3 = quadColumns[c];
                                tempCount = countDiffNumbers[1];
                                
                                for (let x = 0; x < numberCount[column3]; x++) {
                                    sameFlag = false;
                                    tempNumber = numbers[column3][x];
                                    for (let y = 0; y < countDiffNumbers[1]; y++) {
                                        if (tempNumber === diffNumbers[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 4) {
                                            diffNumbers[tempCount] = tempNumber;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffNumbers[2] = tempCount;

                                // Stage 4
                                if (countDiffNumbers[2] === 4) { // There still may be a naked quad
                                    for (let d = c+1; d <= quadCount-1 && !solved; d++) {
                                        column4 = quadColumns[d];
                                        tempCount = countDiffNumbers[2];

                                        for (let x = 0; x < numberCount[column4]; x++) {
                                            sameFlag = false;
                                            tempNumber = numbers[column4][x];
                                            for (let y = 0; y < countDiffNumbers[2]; y++) {
                                                if (tempNumber === diffNumbers[y]) {
                                                    sameFlag = true;
                                                }
                                            }
                                            if (sameFlag === false) {
                                                if (tempCount < 4) {
                                                    diffNumbers[tempCount] = tempNumber;
                                                }
                                                tempCount++;
                                            }
                                        }
                                        countDiffNumbers[3] = tempCount;

                                        if (countDiffNumbers[3] === 4) { // The 4 numbers stored in diffNumbers form a naked quad in columns 1, 2, 3, & 4
                                            totalCount = 0;
                                            number1Changes = 0;
                                            number2Changes = 0;
                                            number3Changes = 0;
                                            number4Changes = 0;
                                            columnsChanged1.fill(0);
                                            columnsChanged2.fill(0);
                                            columnsChanged3.fill(0);
                                            columnsChanged4.fill(0);
                                            description = "";

                                            // Sort the numbers in ascending order while maintaining their original indices
                                            let sortedNumbers = [
                                                { value: diffNumbers[0], index: 0 },
                                                { value: diffNumbers[1], index: 1 },
                                                { value: diffNumbers[2], index: 2 },
                                                { value: diffNumbers[3], index: 3 }
                                            ].sort((a, b) => a.value - b.value);

                                            // Create mapping arrays to track which original number corresponds to which sorted position
                                            let originalToSorted = [0, 0, 0, 0];
                                            let sortedToOriginal = [0, 0, 0, 0];
                                            for (let i = 0; i < 4; i++) {
                                                originalToSorted[sortedNumbers[i].index] = i;
                                                sortedToOriginal[i] = sortedNumbers[i].index;
                                            }

                                            // Remove number1, number2, number3, and number4 from every cell 
                                            // in row other than column1, column2, column3, and column4
                                            for (let j = 0; j < 9; j++) {
                                                if (intPuzzle[i][j] === 0 && j !== column1 && j !== column2 && j !== column3 && j !== column4) {
                                                    if (possible[i][j][diffNumbers[0]] === diffNumbers[0]+1) {
                                                        possible[i][j][diffNumbers[0]] = 0;
                                                        columnsChanged1[number1Changes] = j;
                                                        number1Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[1]] === diffNumbers[1]+1) {
                                                        possible[i][j][diffNumbers[1]] = 0;
                                                        columnsChanged2[number2Changes] = j;
                                                        number2Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[2]] === diffNumbers[2]+1) {
                                                        possible[i][j][diffNumbers[2]] = 0;
                                                        columnsChanged3[number3Changes] = j;
                                                        number3Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[3]] === diffNumbers[3]+1) {
                                                        possible[i][j][diffNumbers[3]] = 0;
                                                        columnsChanged4[number4Changes] = j;
                                                        number4Changes++;
                                                        totalCount++;
                                                    }
                                                }
                                            }

                                            // Save data to change log
                                            if (totalCount > 0) {
                                                if (!isGuessAndCheck && !isBruteForce) {
                                                    possibleChangeMethod.push("Naked Quad - Row");
                                                    
                                                    description = "Since the numbers " + (sortedNumbers[0].value+1) + ", " + (sortedNumbers[1].value+1) +
                                                        ", " + (sortedNumbers[2].value+1) + " and " + (sortedNumbers[3].value+1) + " form a naked quad in the cells (" + (i+1) + "," + (column1+1) + "), (" +
                                                        (i+1) + "," + (column2+1) + "), (" + (i+1) + "," + (column3+1) + "), and (" + (i+1) + "," + (column4+1) + 
                                                        "), the below numbers were removed as possible options:";
        
                                                    // Map the changes to the sorted order
                                                    let changes = [
                                                        { count: number1Changes, columns: columnsChanged1, number: diffNumbers[0] },
                                                        { count: number2Changes, columns: columnsChanged2, number: diffNumbers[1] },
                                                        { count: number3Changes, columns: columnsChanged3, number: diffNumbers[2] },
                                                        { count: number4Changes, columns: columnsChanged4, number: diffNumbers[3] }
                                                    ];
        
                                                    // Log changes in sorted order
                                                    for (let s = 0; s < 4; s++) {
                                                        const originalIndex = sortedToOriginal[s];
                                                        if (changes[originalIndex].count > 0) {
                                                            for (let t = 0; t < changes[originalIndex].count; t++) {
                                                                description = description + "\nRow " + (i+1) + ", Column " + (changes[originalIndex].columns[t]+1) + ": " + (sortedNumbers[s].value+1);
                                                                possibleChangeOrder.push(possibleChangeCount);
                                                                possibleChangeNumber.push(sortedNumbers[s].value+1);
                                                                possibleChangeRow.push(i);
                                                                possibleChangeColumn.push(changes[originalIndex].columns[t]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }
                                                    }

                                                    possibleChangeDescription.push(description);
                                                    totalChangeType.push("possible");
                                                    totalChangeMethod.push("Naked Quad - Row");
                                                    levelTwoChanges++;
                                                    nakedQuadRowChanges++;
                                                    possibleChangeCount++;
                                                    totalChangeCount++;
                                                }
                                                tempChanges++;

                                                // Run previous methods to see if the puzzle can be solved
                                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                if (!solved) {
                                                    tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }   
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedQuadColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let numberCount = new Array(9).fill(0);
    let numbers = new Array(9).fill().map(() => Array(4).fill(0));
    let quadRows = new Array(9).fill(0);
    let quadCount = 0;
    let row1 = 0;
    let row2 = 0;
    let row3 = 0;
    let row4 = 0;
    let diffNumbers = new Array(4).fill(0);
    let countDiffNumbers = new Array(4).fill(0);
    let tempCount = 0;
    let tempNumber = 0;
    let sameFlag = false;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let number3Changes = 0;
    let number4Changes = 0;
    let rowsChanged1 = new Array(9).fill(0);
    let rowsChanged2 = new Array(9).fill(0);
    let rowsChanged3 = new Array(9).fill(0);
    let rowsChanged4 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let j = 0; j < 9 && !solved; j++) { // column number
            for (let z = 0; z < 9; z++) {
                numbers[z].fill(0);
            }
            numberCount.fill(0);
            quadRows.fill(0);
            quadCount = 0;

            // Goes down the column and counts the number of options in each cell and stores the first four
            for (let i = 0; i < 9; i++) { // row number
                if (intPuzzle[i][j] === 0) {
                    for (let k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] === k+1) {
                            if (numberCount[i] < 4) {
                                numbers[i][numberCount[i]] = k;
                            }
                            numberCount[i]++;
                        }
                    }
                }
            }

            // Counts number of cells with 4 or less options
            for (let i = 0; i < 9; i++) { // row number
                if (numberCount[i] === 2 || numberCount[i] === 3 || numberCount[i] === 4) {
                    quadRows[quadCount] = i;
                    quadCount++;
                }
            }

            // Checks to see if any of the two, three or four option cells have the same numbers, forming a naked quad
            if (quadCount > 3) {
                // Stage 1
                for (let a = 0; a <= quadCount-4 && !solved; a++) {
                    diffNumbers.fill(0);
                    countDiffNumbers.fill(0);
                    row1 = quadRows[a];
                    diffNumbers[0] = numbers[row1][0];
                    diffNumbers[1] = numbers[row1][1];
                    if (numberCount[row1] === 2) {
                        countDiffNumbers[0] = 2;
                    }
                    if (numberCount[row1] === 3) {
                        diffNumbers[2] = numbers[row1][2];
                        countDiffNumbers[0] = 3;
                    }
                    if (numberCount[row1] === 4) {
                        diffNumbers[2] = numbers[row1][2];
                        diffNumbers[3] = numbers[row1][3];
                        countDiffNumbers[0] = 4;
                    }

                    // Stage 2
                    for (let b = a+1; b <= quadCount-3 && !solved; b++) {
                        row2 = quadRows[b];
                        tempCount = countDiffNumbers[0];

                        for (let x = 0; x < numberCount[row2]; x++) {
                            sameFlag = false;
                            tempNumber = numbers[row2][x];
                            for (let y = 0; y < countDiffNumbers[0]; y++) {
                                if (tempNumber === diffNumbers[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 4) {
                                    diffNumbers[tempCount] = tempNumber;
                                }
                                tempCount++;
                            }
                        }
                        countDiffNumbers[1] = tempCount;

                        // Stage 3
                        if (countDiffNumbers[1] <= 4) { // There still may be a naked quad
                            for (let c = b+1; c <= quadCount-2 && !solved; c++) {
                                row3 = quadRows[c];
                                tempCount = countDiffNumbers[1];

                                for (let x = 0; x < numberCount[row3]; x++) {
                                    sameFlag = false;
                                    tempNumber = numbers[row3][x];
                                    for (let y = 0; y < countDiffNumbers[1]; y++) {
                                        if (tempNumber === diffNumbers[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 4) {
                                            diffNumbers[tempCount] = tempNumber;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffNumbers[2] = tempCount;

                                // Stage 4
                                if (countDiffNumbers[2] === 4) { // There still may be a naked quad
                                    for (let d = c+1; d <= quadCount-1 && !solved; d++) {
                                        row4 = quadRows[d];
                                        tempCount = countDiffNumbers[2];

                                        for (let x = 0; x < numberCount[row4]; x++) {
                                            sameFlag = false;
                                            tempNumber = numbers[row4][x];
                                            for (let y = 0; y < countDiffNumbers[2]; y++) {
                                                if (tempNumber === diffNumbers[y]) {
                                                    sameFlag = true;
                                                }
                                            }
                                            if (sameFlag === false) {
                                                if (tempCount < 4) {
                                                    diffNumbers[tempCount] = tempNumber;
                                                }
                                                tempCount++;
                                            }
                                        }
                                        countDiffNumbers[3] = tempCount;

                                        if (countDiffNumbers[3] === 4) { // The 4 numbers stored in diffNumbers form a naked quad in rows 1, 2, 3, & 4
                                            totalCount = 0;
                                            number1Changes = 0;
                                            number2Changes = 0;
                                            number3Changes = 0;
                                            number4Changes = 0;
                                            rowsChanged1.fill(0);
                                            rowsChanged2.fill(0);
                                            rowsChanged3.fill(0);
                                            rowsChanged4.fill(0);
                                            description = "";

                                            // Sort the numbers in ascending order while maintaining their original indices
                                            let sortedNumbers = [
                                                { value: diffNumbers[0], index: 0 },
                                                { value: diffNumbers[1], index: 1 },
                                                { value: diffNumbers[2], index: 2 },
                                                { value: diffNumbers[3], index: 3 }
                                            ].sort((a, b) => a.value - b.value);

                                            // Create mapping arrays to track which original number corresponds to which sorted position
                                            let originalToSorted = [0, 0, 0, 0];
                                            let sortedToOriginal = [0, 0, 0, 0];
                                            for (let i = 0; i < 4; i++) {
                                                originalToSorted[sortedNumbers[i].index] = i;
                                                sortedToOriginal[i] = sortedNumbers[i].index;
                                            }

                                            // Remove number1, number2, number3, and number4 from every cell 
                                            // in column other than row1, row2, row3, and row4
                                            for (let i = 0; i < 9; i++) {
                                                if (intPuzzle[i][j] === 0 && i !== row1 && i !== row2 && i !== row3 && i !== row4) {
                                                    if (possible[i][j][diffNumbers[0]] === diffNumbers[0]+1) {
                                                        possible[i][j][diffNumbers[0]] = 0;
                                                        rowsChanged1[number1Changes] = i;
                                                        number1Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[1]] === diffNumbers[1]+1) {
                                                        possible[i][j][diffNumbers[1]] = 0;
                                                        rowsChanged2[number2Changes] = i;
                                                        number2Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[2]] === diffNumbers[2]+1) {
                                                        possible[i][j][diffNumbers[2]] = 0;
                                                        rowsChanged3[number3Changes] = i;
                                                        number3Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[3]] === diffNumbers[3]+1) {
                                                        possible[i][j][diffNumbers[3]] = 0;
                                                        rowsChanged4[number4Changes] = i;
                                                        number4Changes++;
                                                        totalCount++;
                                                    }
                                                }
                                            }

                                            // Save data to change log
                                            if (totalCount > 0) {
                                                if (!isGuessAndCheck && !isBruteForce) {
                                                    possibleChangeMethod.push("Naked Quad - Column");

                                                    description = "Since the numbers " + (sortedNumbers[0].value+1) + ", " + (sortedNumbers[1].value+1) +
                                                        ", " + (sortedNumbers[2].value+1) + " and " + (sortedNumbers[3].value+1) + " form a naked quad in the cells (" + (row1+1) + "," + (j+1) + "), (" +
                                                        (row2+1) + "," + (j+1) + "), (" + (row3+1) + "," + (j+1) + "), and (" + (row4+1) + "," + (j+1) + 
                                                        "), the below numbers were removed as possible options:";
        
                                                    // Map the changes to the sorted order
                                                    let changes = [
                                                        { count: number1Changes, rows: rowsChanged1, number: diffNumbers[0] },
                                                        { count: number2Changes, rows: rowsChanged2, number: diffNumbers[1] },
                                                        { count: number3Changes, rows: rowsChanged3, number: diffNumbers[2] },
                                                        { count: number4Changes, rows: rowsChanged4, number: diffNumbers[3] }
                                                    ];
        
                                                    // Log changes in sorted order
                                                    for (let s = 0; s < 4; s++) {
                                                        const originalIndex = sortedToOriginal[s];
                                                        if (changes[originalIndex].count > 0) {
                                                            for (let t = 0; t < changes[originalIndex].count; t++) {
                                                                description = description + "\nRow " + (changes[originalIndex].rows[t]+1) + ", Column " + (j+1) + ": " + (sortedNumbers[s].value+1);
                                                                possibleChangeOrder.push(possibleChangeCount);
                                                                possibleChangeNumber.push(sortedNumbers[s].value+1);
                                                                possibleChangeRow.push(changes[originalIndex].rows[t]);
                                                                possibleChangeColumn.push(j);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }
                                                    }

                                                    possibleChangeDescription.push(description);
                                                    totalChangeType.push("possible");
                                                    totalChangeMethod.push("Naked Quad - Column");
                                                    levelTwoChanges++;
                                                    nakedQuadColumnChanges++;
                                                    possibleChangeCount++;
                                                    totalChangeCount++;
                                                }
                                                tempChanges++;

                                                // Run previous methods to see if the puzzle can be solved
                                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                if (!solved) {
                                                    tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }   
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function nakedQuadGroupCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let numberCount = new Array(9).fill().map(() => Array(9).fill(0));
    let numbers = new Array(9).fill().map(() => Array(9).fill(0).map(() => Array(4).fill(0)));
    let quadRows = new Array(9).fill(0);
    let quadColumns = new Array(9).fill(0);
    let quadCount = 0;
    let row1 = 0;
    let row2 = 0;
    let row3 = 0;
    let row4 = 0;
    let column1 = 0;
    let column2 = 0;
    let column3 = 0;
    let column4 = 0;
    let diffNumbers = new Array(4).fill(0);
    let countDiffNumbers = new Array(4).fill(0);
    let tempCount = 0;
    let tempNumber = 0;
    let sameFlag = false;
    let totalCount = 0;
    let number1Changes = 0;
    let number2Changes = 0;
    let number3Changes = 0;
    let number4Changes = 0;
    let rowsChanged1 = new Array(9).fill(0);
    let rowsChanged2 = new Array(9).fill(0);
    let rowsChanged3 = new Array(9).fill(0);
    let rowsChanged4 = new Array(9).fill(0);
    let columnsChanged1 = new Array(9).fill(0);
    let columnsChanged2 = new Array(9).fill(0);
    let columnsChanged3 = new Array(9).fill(0);
    let columnsChanged4 = new Array(9).fill(0);
    let description = "";

    do {
        tempChanges = 0;
        for (let l = 0; l < 9 && !solved; l++) { // group number
            for (let x = 0; x < 9; x++) {
                numberCount[x].fill(0);
                for (let y = 0; y < 9; y++) {
                    numbers[x][y].fill(0);
                }
            }
            quadRows.fill(0);
            quadColumns.fill(0);
            quadCount = 0;

            // Goes down the group and counts the number of options in each cell and stores the first four
            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                    if (intPuzzle[i][j] === 0) {
                        for (let k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] === k+1) {
                                if (numberCount[i][j] < 4) {
                                    numbers[i][j][numberCount[i][j]] = k;
                                }
                                numberCount[i][j]++;
                            }
                        }
                    }
                }
            }

            // Counts number of cells with 4 or less options
            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                    if (numberCount[i][j] === 2 || numberCount[i][j] === 3 || numberCount[i][j] === 4) {
                        quadRows[quadCount] = i;
                        quadColumns[quadCount] = j;
                        quadCount++;
                    }
                }
            }

            // Checks to see if any of the two, three or four option cells have the same numbers, forming a naked quad
            if (quadCount > 3) {
                // Stage 1
                for (let a = 0; a <= quadCount-4 && !solved; a++) {
                    diffNumbers.fill(0);
                    countDiffNumbers.fill(0);
                    row1 = quadRows[a];
                    column1 = quadColumns[a];
                    diffNumbers[0] = numbers[row1][column1][0];
                    diffNumbers[1] = numbers[row1][column1][1];
                    if (numberCount[row1][column1] === 2) {
                        countDiffNumbers[0] = 2;
                    }
                    if (numberCount[row1][column1] === 3) {
                        diffNumbers[2] = numbers[row1][column1][2];
                        countDiffNumbers[0] = 3;
                    }
                    if (numberCount[row1][column1] === 4) {
                        diffNumbers[2] = numbers[row1][column1][2];
                        diffNumbers[3] = numbers[row1][column1][3];
                        countDiffNumbers[0] = 4;
                    }

                    // Stage 2
                    for (let b = a+1; b <= quadCount-3 && !solved; b++) {
                        row2 = quadRows[b];
                        column2 = quadColumns[b];
                        tempCount = countDiffNumbers[0];

                        for (let x = 0; x < numberCount[row2][column2]; x++) {
                            sameFlag = false;
                            tempNumber = numbers[row2][column2][x];
                            for (let y = 0; y < countDiffNumbers[0]; y++) {
                                if (tempNumber === diffNumbers[y]) {
                                    sameFlag = true;
                                }
                            }
                            if (sameFlag === false) {
                                if (tempCount < 4) {
                                    diffNumbers[tempCount] = tempNumber;
                                }
                                tempCount++;
                            }
                        }
                        countDiffNumbers[1] = tempCount;

                        // Stage 3
                        if (countDiffNumbers[1] <= 4) { // There still may be a naked quad
                            for (let c = b+1; c <= quadCount-2 && !solved; c++) {
                                row3 = quadRows[c];
                                column3 = quadColumns[c];
                                tempCount = countDiffNumbers[1];

                                for (let x = 0; x < numberCount[row3][column3]; x++) {
                                    sameFlag = false;
                                    tempNumber = numbers[row3][column3][x];
                                    for (let y = 0; y < countDiffNumbers[1]; y++) {
                                        if (tempNumber === diffNumbers[y]) {
                                            sameFlag = true;
                                        }
                                    }
                                    if (sameFlag === false) {
                                        if (tempCount < 4) {
                                            diffNumbers[tempCount] = tempNumber;
                                        }
                                        tempCount++;
                                    }
                                }
                                countDiffNumbers[2] = tempCount;

                                // Stage 4
                                if (countDiffNumbers[2] === 4) { // There still may be a naked quad
                                    for (let d = c+1; d <= quadCount-1 && !solved; d++) {
                                        row4 = quadRows[d];
                                        column4 = quadColumns[d];
                                        tempCount = countDiffNumbers[2];

                                        for (let x = 0; x < numberCount[row4][column4]; x++) {
                                            sameFlag = false;
                                            tempNumber = numbers[row4][column4][x];
                                            for (let y = 0; y < countDiffNumbers[2]; y++) {
                                                if (tempNumber === diffNumbers[y]) {
                                                    sameFlag = true;
                                                }
                                            }
                                            if (sameFlag === false) {
                                                if (tempCount < 4) {
                                                    diffNumbers[tempCount] = tempNumber;
                                                }
                                                tempCount++;
                                            }
                                        }
                                        countDiffNumbers[3] = tempCount;

                                        if (countDiffNumbers[3] === 4) { // The 4 numbers stored in diffNumbers form a naked quad in rows 1, 2, 3, & 4
                                            totalCount = 0;
                                            number1Changes = 0;
                                            number2Changes = 0;
                                            number3Changes = 0;
                                            number4Changes = 0;
                                            rowsChanged1.fill(0);
                                            rowsChanged2.fill(0);
                                            rowsChanged3.fill(0);
                                            rowsChanged4.fill(0);
                                            description = "";

                                            // Sort the numbers in ascending order while maintaining their original indices
                                            let sortedNumbers = [
                                                { value: diffNumbers[0], index: 0 },
                                                { value: diffNumbers[1], index: 1 },
                                                { value: diffNumbers[2], index: 2 },
                                                { value: diffNumbers[3], index: 3 }
                                            ].sort((a, b) => a.value - b.value);

                                            // Create mapping arrays to track which original number corresponds to which sorted position
                                            let originalToSorted = [0, 0, 0, 0];
                                            let sortedToOriginal = [0, 0, 0, 0];
                                            for (let i = 0; i < 4; i++) {
                                                originalToSorted[sortedNumbers[i].index] = i;
                                                sortedToOriginal[i] = sortedNumbers[i].index;
                                            }

                                            // Remove number1, number2, number3, and number4 from every cell 
                                            // in column other than row1, row2, row3, and row4
                                            for (let i = ROW_START[l]; i <= ROW_END[l]; i++) {
                                                for (let j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                                                    if (intPuzzle[i][j] === 0 && !(i === row1 && j === column1) && !(i === row2 && j === column2) &&
                                                        !(i === row3 && j === column3) && !(i === row4 && j === column4)) {
                                                        if (possible[i][j][diffNumbers[0]] === diffNumbers[0]+1) {
                                                            possible[i][j][diffNumbers[0]] = 0;
                                                            rowsChanged1[number1Changes] = i;
                                                            columnsChanged1[number1Changes] = j;
                                                            number1Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[1]] === diffNumbers[1]+1) {
                                                            possible[i][j][diffNumbers[1]] = 0;
                                                            rowsChanged2[number2Changes] = i;
                                                            columnsChanged2[number2Changes] = j;
                                                            number2Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[2]] === diffNumbers[2]+1) {
                                                            possible[i][j][diffNumbers[2]] = 0;
                                                            rowsChanged3[number3Changes] = i;
                                                            columnsChanged3[number3Changes] = j;
                                                            number3Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[3]] === diffNumbers[3]+1) {
                                                            possible[i][j][diffNumbers[3]] = 0;
                                                            rowsChanged4[number4Changes] = i;
                                                            columnsChanged4[number4Changes] = j;
                                                            number4Changes++;
                                                            totalCount++;
                                                        }
                                                    }
                                                }
                                            }

                                            // Save data to change log
                                            if (totalCount > 0) {
                                                if (!isGuessAndCheck && !isBruteForce) {
                                                    possibleChangeMethod.push("Naked Quad - Group");

                                                    description = "Since the numbers " + (sortedNumbers[0].value+1) + ", " + (sortedNumbers[1].value+1) +
                                                        ", " + (sortedNumbers[2].value+1) + " and " + (sortedNumbers[3].value+1) + " form a naked quad in the cells (" + (row1+1) + "," + (column1+1) + "), (" +
                                                        (row2+1) + "," + (column2+1) + "), (" + (row3+1) + "," + (column3+1) + "), and (" + (row4+1) + "," + (column4+1) + 
                                                        "), the below numbers were removed as possible options:";

                                                    // Map the changes to the sorted order
                                                    let changes = [
                                                        { count: number1Changes, rows: rowsChanged1, columns: columnsChanged1, number: diffNumbers[0] },
                                                        { count: number2Changes, rows: rowsChanged2, columns: columnsChanged2, number: diffNumbers[1] },
                                                        { count: number3Changes, rows: rowsChanged3, columns: columnsChanged3, number: diffNumbers[2] },
                                                        { count: number4Changes, rows: rowsChanged4, columns: columnsChanged4, number: diffNumbers[3] }
                                                    ];

                                                    // Log changes in sorted order
                                                    for (let s = 0; s < 4; s++) {
                                                        const originalIndex = sortedToOriginal[s];
                                                        if (changes[originalIndex].count > 0) {
                                                            for (let t = 0; t < changes[originalIndex].count; t++) {
                                                                description = description + "\nRow " + (changes[originalIndex].rows[t]+1) + ", Column " + (changes[originalIndex].columns[t]+1) + ": " + (sortedNumbers[s].value+1);
                                                                possibleChangeOrder.push(possibleChangeCount);
                                                                possibleChangeNumber.push(sortedNumbers[s].value+1);
                                                                possibleChangeRow.push(changes[originalIndex].rows[t]);
                                                                possibleChangeColumn.push(changes[originalIndex].columns[t]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }
                                                    }

                                                    possibleChangeDescription.push(description);
                                                    totalChangeType.push("possible");
                                                    totalChangeMethod.push("Naked Quad - Group");
                                                    levelTwoChanges++;
                                                    nakedQuadGroupChanges++;
                                                    possibleChangeCount++;
                                                    totalChangeCount++;
                                                }
                                                tempChanges++;

                                                // Run previous methods to see if the puzzle can be solved
                                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                if (!solved) {
                                                    tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function xWingChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempXWingChanges = 0;

    do {
        changes = 0;
        changes += xWingRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += xWingColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempXWingChanges += changes;
    } while (changes !== 0 && !solved);
    
    return tempXWingChanges;
}

function xWingRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let count = new Array(9).fill(0);
    let columns = new Array(9).fill().map(() => new Array(2).fill(0));
    let doubleRows = new Array(9).fill(0);
    let doubleCount = 0;
    let row1 = 0;
    let row2 = 0;
    let column1 = 0;
    let column2 = 0;
    let totalCount = 0;
    let column1Changes = 0;
    let column2Changes = 0;
    let rowsChanged1 = new Array(9).fill(0);
    let rowsChanged2 = new Array(9).fill(0);
    let description;

    do {
        tempChanges = 0;
        for (let k = 0; k < 9 && !solved; k++) {
            count.fill(0);
            doubleRows.fill(0);
            doubleCount = 0;

            // Goes down each row, counts the number of columns the number k appears in,
            // and then stores the first two columns
            for (let i = 0; i < 9; i++) { // row number
                if (!Rows[i][k]) {
                    for (let j = 0; j < 9; j++) { // column number
                        if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                            if (count[i] < 2) {
                                columns[i][count[i]] = j;
                            }
                            count[i]++;
                        }
                    }
                }
            }

            // Counts the number of rows the number appears twice in and stores them
            for (let i = 0; i < 9; i++) { // row number
                if (count[i] === 2) {
                    doubleRows[doubleCount] = i;
                    doubleCount++;
                }
            }

            if (doubleCount > 1) {
                // Stage 1
                for (let a = 0; a <= doubleCount-2 && !solved; a++) {
                    row1 = doubleRows[a];
                    column1 = columns[row1][0];
                    column2 = columns[row1][1];

                    // Stage 2
                    for (let b = a+1; b <= doubleCount-1 && !solved; b++) {
                        row2 = doubleRows[b];

                        if (columns[row2][0] === column1 && columns[row2][1] === column2) {
                            // There is an X Wing in row1, row2 and column1, column2
                            totalCount = 0;
                            column1Changes = 0;
                            column2Changes = 0;
                            rowsChanged1.fill(0);
                            rowsChanged2.fill(0);
                            description = "";

                            // Remove number k from every cell in column1 and column2 other than row1 and row2
                            for (let i = 0; i < 9; i++) { // row number
                                if (i !== row1 && i !== row2) {
                                    if (intPuzzle[i][column1] === 0 && possible[i][column1][k] === k+1) {
                                        possible[i][column1][k] = 0;
                                        rowsChanged1[column1Changes] = i;
                                        column1Changes++;
                                        totalCount++;
                                    }
                                    if (intPuzzle[i][column2] === 0 && possible[i][column2][k] === k+1) {
                                        possible[i][column2][k] = 0;
                                        rowsChanged2[column2Changes] = i;
                                        column2Changes++;
                                        totalCount++;
                                    }
                                }
                            }

                            // Save data to change log
                            if (totalCount > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.push("X Wing - Row");

                                    description = "Since the number " + (k+1) + " forms an X Wing in the rows " + (row1+1) + " and " + (row2+1) + ", columns " + (column1+1) + " and " + (column2+1) + 
                                        ", it was removed from the below cells as a possible option:";

                                    // Create arrays to store all changes for sorting
                                    let allChanges = [];
                                    
                                    // Add column1 changes
                                    for (let s = 0; s < column1Changes; s++) {
                                        allChanges.push({
                                            row: rowsChanged1[s],
                                            column: column1,
                                            number: k+1
                                        });
                                    }
                                    
                                    // Add column2 changes
                                    for (let s = 0; s < column2Changes; s++) {
                                        allChanges.push({
                                            row: rowsChanged2[s],
                                            column: column2,
                                            number: k+1
                                        });
                                    }
                                    
                                    // Sort changes by row, then column
                                    allChanges.sort((a, b) => {
                                        if (a.row !== b.row) return a.row - b.row;
                                        return a.column - b.column;
                                    });
                                    
                                    // Add sorted changes to description and tracking arrays
                                    for (let change of allChanges) {
                                        description += "\nRow " + (change.row+1) + ", Column " + (change.column+1) + ": " + change.number;
                                        possibleChangeOrder.push(possibleChangeCount);
                                        possibleChangeNumber.push(change.number);
                                        possibleChangeRow.push(change.row);
                                        possibleChangeColumn.push(change.column);
                                        possibleChangePossibleCount++;
                                    }

                                    possibleChangeDescription.push(description);
                                    totalChangeType.push("possible");
                                    totalChangeMethod.push("X Wing - Row");
                                    levelTwoChanges++;
                                    xWingRowChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;

                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); 
                                if (!solved) {
                                    tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function xWingColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let count = new Array(9).fill(0);
    let rows = new Array(9).fill().map(() => new Array(2).fill(0));
    let doubleColumns = new Array(9).fill(0);
    let doubleCount = 0;
    let row1 = 0;
    let row2 = 0;
    let column1 = 0;
    let column2 = 0;
    let totalCount = 0;
    let row1Changes = 0;
    let row2Changes = 0;
    let columnsChanged1 = new Array(9).fill(0);
    let columnsChanged2 = new Array(9).fill(0);
    let description;

    do {
        tempChanges = 0;
        for (let k = 0; k < 9 && !solved; k++) {
            count.fill(0);
            doubleColumns.fill(0);
            doubleCount = 0;

            // Goes down each column, counts the number of rows the number k appears in,
            // and then stores the first two rows
            for (let j = 0; j < 9; j++) { // column number
                if (!Columns[j][k]) {
                    for (let i = 0; i < 9; i++) { // row number
                        if (intPuzzle[i][j] === 0 && possible[i][j][k] === k+1) {
                            if (count[j] < 2) {
                                rows[j][count[j]] = i;
                            }
                            count[j]++;
                        }
                    }
                }
            }

            // Counts the number of columns the number appears twice in and stores them
            for (let j = 0; j < 9; j++) { // column number
                if (count[j] === 2) {
                    doubleColumns[doubleCount] = j;
                    doubleCount++;
                }
            }

            if (doubleCount > 1) {
                // Stage 1
                for (let a = 0; a <= doubleCount-2 && !solved; a++) {
                    column1 = doubleColumns[a];
                    row1 = rows[column1][0];
                    row2 = rows[column1][1];

                    // Stage 2
                    for (let b = a+1; b <= doubleCount-1 && !solved; b++) {
                        column2 = doubleColumns[b];

                        if (rows[column2][0] === row1 && rows[column2][1] === row2) {
                            // There is an X Wing in row1, row2 and column1, column2
                            totalCount = 0;
                            row1Changes = 0;
                            row2Changes = 0;
                            columnsChanged1.fill(0);
                            columnsChanged2.fill(0);
                            description = "";

                            // Remove number k from every cell in row1 and row2 other than column1 and column2
                            for (let j = 0; j < 9; j++) { // column number
                                if (j !== column1 && j !== column2) {
                                    if (intPuzzle[row1][j] === 0 && possible[row1][j][k] === k+1) {
                                        possible[row1][j][k] = 0;
                                        columnsChanged1[row1Changes] = j;
                                        row1Changes++;
                                        totalCount++;
                                    }
                                    if (intPuzzle[row2][j] === 0 && possible[row2][j][k] === k+1) {
                                        possible[row2][j][k] = 0;
                                        columnsChanged2[row2Changes] = j;
                                        row2Changes++;
                                        totalCount++;
                                    }
                                }
                            }

                            // Save data to change log
                            if (totalCount > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.push("X Wing - Column");

                                    description = "Since the number " + (k+1) + " forms an X Wing in the rows " + (row1+1) + " and " + (row2+1) + ", columns " + (column1+1) + " and " + (column2+1) + 
                                        ", it was removed from the below cells as a possible option:";

                                    // Create arrays to store all changes for sorting
                                    let allChanges = [];
                                    
                                    // Add column1 changes
                                    for (let s = 0; s < row1Changes; s++) {
                                        allChanges.push({
                                            row: row1,
                                            column: columnsChanged1[s],
                                            number: k+1
                                        });
                                    }
                                    
                                    // Add column2 changes
                                    for (let s = 0; s < row2Changes; s++) {
                                        allChanges.push({
                                            row: row2,
                                            column: columnsChanged2[s],
                                            number: k+1
                                        }); 
                                    }

                                    // Sort changes by row, then column
                                    allChanges.sort((a, b) => {
                                        if (a.row !== b.row) return a.row - b.row;
                                        return a.column - b.column;
                                    });

                                    // Add sorted changes to description and tracking arrays
                                    for (let change of allChanges) {
                                        description += "\nRow " + (change.row+1) + ", Column " + (change.column+1) + ": " + change.number;
                                        possibleChangeOrder.push(possibleChangeCount);
                                        possibleChangeNumber.push(change.number);
                                        possibleChangeRow.push(change.row);
                                        possibleChangeColumn.push(change.column);
                                        possibleChangePossibleCount++;
                                    }

                                    possibleChangeDescription.push(description);
                                    totalChangeType.push("possible");
                                    totalChangeMethod.push("X Wing - Column");
                                    levelTwoChanges++;
                                    xWingColumnChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;

                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); 
                                if (!solved) {
                                    tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function yWingChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempYWingChanges = 0;
    let isTwoOption = new Array(9).fill().map(() => new Array(9).fill(false));
    let numbers = new Array(9).fill().map(() => new Array(9).fill(0).map(() => new Array(2).fill(0)));
    
    do {
        changes = 0;
        changes += rowColumnYWingCheck(intPuzzle, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += rowGroupYWingCheck(intPuzzle, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        changes += columnGroupYWingCheck(intPuzzle, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        tempYWingChanges += changes;
    } while (changes !== 0 && !solved);
    
    return tempYWingChanges;
}

function rowColumnYWingCheck(intPuzzle, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let A;
    let B;
    let C;
    let rowWingColumn;
    let isRowWing_AC;
    let isRowWing_BC;
    let columnWingRow;
    let centerWingGroup;
    let yWingChangesMade;
    let description;

    do {
        tempChanges = 0;
        updateTwoOption(intPuzzle, possible, numbers, isTwoOption);
        yWingChangesMade = false;

        for (let i = 0; i < 9 && !yWingChangesMade && !solved; i++) { // row number
            for (let j = 0; j < 9 && !yWingChangesMade && !solved; j++) { // column number
                A = 0;
                B = 0;
                C = 0;

                if (isTwoOption[i][j] === true) {
                    A = numbers[i][j][0];
                    B = numbers[i][j][1];
                    centerWingGroup = determineGroup(i, j);

                    // go down the row to see if there is another two option cell
                    // that can be a wing cell
                    for (let q = 0; q < 9 && !yWingChangesMade && !solved; q++) { // column number
                        rowWingColumn = -1;
                        let tempGroup = determineGroup(i, q);
                        isRowWing_AC = false;
                        isRowWing_BC = false;

                        if (isTwoOption[i][q] === true && q !== j && tempGroup !== centerWingGroup) {
                            if (numbers[i][q][0] === A && numbers[i][q][1] !== B) {
                                rowWingColumn = q;
                                C = numbers[i][q][1];
                                isRowWing_AC = true;
                            } else if (numbers[i][q][0] === B && numbers[i][q][1] !== A) {
                                rowWingColumn = q;
                                C = numbers[i][q][1];
                                isRowWing_BC = true;
                            } else if (numbers[i][q][0] !== A && numbers[i][q][1] === B) {
                                rowWingColumn = q;
                                C = numbers[i][q][0];
                                isRowWing_BC = true;
                            } else if (numbers[i][q][0] !== B && numbers[i][q][1] === A) {
                                rowWingColumn = q;
                                C = numbers[i][q][0];
                                isRowWing_AC = true;
                            }

                            // if a row wing has been found, check for a column wing
                            if (rowWingColumn !== -1) {
                                columnWingRow = -1;
                                
                                for (let r = 0; r < 9 && !yWingChangesMade && !solved; r++) { // row number
                                    tempGroup = determineGroup(r, j);

                                    if (isTwoOption[r][j] === true && r !== i && tempGroup !== centerWingGroup) {
                                        // check to see if the column wing is equal to the opposite config of the row wing
                                        // case 1) Row Wing = AC, is Column Wing = BC?
                                        // case 2) Row Wing = BC, is Column Wing = AC?
                                        
                                        if ((isRowWing_AC === true && ((numbers[r][j][0] === B && numbers[r][j][1] === C) ||
                                                (numbers[r][j][1] === B && numbers[r][j][0] === C))) ||
                                                (isRowWing_BC === true && ((numbers[r][j][0] === A && numbers[r][j][1] === C) ||
                                                (numbers[r][j][1] === A && numbers[r][j][0] === C)))) {
                                            // Y Wing exists!!
                                            columnWingRow = r;
                                            description = "";

                                            // Remove C from the cell at (columnWingRow, rowWingColumn), if it's an option
                                            if (intPuzzle[columnWingRow][rowWingColumn] === 0 && possible[columnWingRow][rowWingColumn][C-1] === C) {
                                                // Remove C and record the change
                                                possible[columnWingRow][rowWingColumn][C-1] = 0;
                                                yWingChangesMade = true;
                                            }
                                        }

                                        // save changes to change log
                                        if (yWingChangesMade) { 
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.push("Y Wing - Row + Column");

                                                // Sort the numbers in ascending order
                                                const sortedNumbers = [A, B, C].sort((a, b) => a - b);
                                                const numbersText = sortedNumbers.slice(0, -1).join(", ") + " and " + sortedNumbers[sortedNumbers.length - 1];

                                                description = "Since the numbers " + numbersText +
                                                    " form a Y Wing with the center wing at Row " + (i+1) + " Column " + (j+1) +
                                                    ", the row wing at Row " + (i+1) + " Column " + (rowWingColumn+1) +
                                                    ", and the column wing at Row " + (columnWingRow+1) + " Column " + (j+1) +
                                                    ", the below numbers were removed as possible options:";
                                                description = description + "\nRow " + (columnWingRow+1) + ", Column " + (rowWingColumn+1) + ": " + C;
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(C);
                                                possibleChangeRow.push(columnWingRow);
                                                possibleChangeColumn.push(rowWingColumn);
                                                possibleChangeDescription.push(description);
                                                totalChangeType.push("possible");
                                                possibleChangePossibleCount++;
                                                levelTwoChanges++;
                                                yWingRowColumnChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;

                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function rowGroupYWingCheck(intPuzzle, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let yWingChanges = 0;
    let A;
    let B;
    let C;
    let rowWingColumn;
    let rowWingGroup;
    let isRowWing_AC;
    let isRowWing_BC;
    let centerWingGroup;
    let groupWingColumn;
    let groupWingRow;
    let yWingChangesMade;
    let rowsChanged = new Array(5).fill(0);
    let columnsChanged = new Array(5).fill(0);
    let description;

    do {
        tempChanges = 0;
        updateTwoOption(intPuzzle, possible, numbers, isTwoOption);
        yWingChangesMade = false;

        for (let i = 0; i < 9 && !yWingChangesMade && !solved; i++) { // row number
            for (let j = 0; j < 9 && !yWingChangesMade && !solved; j++) { // column number
                A = 0;
                B = 0;
                C = 0;

                if (isTwoOption[i][j] === true) {
                    A = numbers[i][j][0];
                    B = numbers[i][j][1];
                    centerWingGroup = determineGroup(i, j);

                    // go down the row to see if there is another two option cell
                    // that can be a wing cell
                    for (let q = 0; q < 9 && !yWingChangesMade && !solved; q++) { // column number
                        rowWingColumn = -1;
                        rowWingGroup = -1;
                        let tempGroup = determineGroup(i, q);
                        isRowWing_AC = false;
                        isRowWing_BC = false;

                        if (isTwoOption[i][q] === true && q !== j && tempGroup !== centerWingGroup) {
                            if (numbers[i][q][0] === A && numbers[i][q][1] !== B) {
                                rowWingColumn = q;
                                rowWingGroup = determineGroup(i, q);
                                C = numbers[i][q][1];
                                isRowWing_AC = true;
                            } else if (numbers[i][q][0] === B && numbers[i][q][1] !== A) {
                                rowWingColumn = q;
                                rowWingGroup = determineGroup(i, q);
                                C = numbers[i][q][1];
                                isRowWing_BC = true;
                            } else if (numbers[i][q][0] !== A && numbers[i][q][1] === B) {
                                rowWingColumn = q;
                                rowWingGroup = determineGroup(i, q);
                                C = numbers[i][q][0];
                                isRowWing_BC = true;
                            } else if (numbers[i][q][0] !== B && numbers[i][q][1] === A) {
                                rowWingColumn = q;
                                rowWingGroup = determineGroup(i, q);
                                C = numbers[i][q][0];
                                isRowWing_AC = true;
                            }

                            // if a row wing has been found, check for a group wing
                            if (rowWingColumn !== -1) {
                                groupWingColumn = -1;
                                groupWingRow = -1;

                                for (let r = ROW_START[centerWingGroup]; r <= ROW_END[centerWingGroup] && !yWingChangesMade && !solved; r++) { // row number
                                    for (let s = COLUMN_START[centerWingGroup]; s <= COLUMN_END[centerWingGroup] && !yWingChangesMade && !solved; s++) { // column number
                                        if (isTwoOption[r][s] === true && r !== i) {
                                            // check to see if the group wing is equal to the opposite config of the row wing
                                            // case 1) Row Wing = AC, is Group Wing = BC?
                                            // case 2) Row Wing = BC, is Group Wing = AC?

                                            if ((isRowWing_AC === true && ((numbers[r][s][0] === B && numbers[r][s][1] === C) ||
                                                    (numbers[r][s][1] === B && numbers[r][s][0] === C))) ||
                                                    (isRowWing_BC === true && ((numbers[r][s][0] === A && numbers[r][s][1] === C) ||
                                                    (numbers[r][s][1] === A && numbers[r][s][0] === C)))) {
                                                // Y Wing exists!!
                                                groupWingRow = r;
                                                groupWingColumn = s;
                                                yWingChanges = 0;
                                                rowsChanged.fill(0);
                                                columnsChanged.fill(0);
                                                description = "";

                                                // Remove C from all cells that are:
                                                // 1) in both the Group Wing's row & the Row Wing's group OR
                                                // 2) in the Center group & current row
                                                for (let t = COLUMN_START[rowWingGroup]; t <= COLUMN_END[rowWingGroup]; t++) {
                                                    if (intPuzzle[groupWingRow][t] === 0 && possible[groupWingRow][t][C-1] === C && t !== groupWingColumn) {
                                                        // Remove C and record the change
                                                        possible[groupWingRow][t][C-1] = 0;
                                                        rowsChanged[yWingChanges] = groupWingRow;
                                                        columnsChanged[yWingChanges] = t;
                                                        yWingChangesMade = true;
                                                        yWingChanges++;
                                                    }
                                                }

                                                for (let t = COLUMN_START[centerWingGroup]; t <= COLUMN_END[centerWingGroup]; t++) {
                                                    if (intPuzzle[i][t] === 0 && possible[i][t][C-1] === C && t !== j) {
                                                        // Remove C and record the change
                                                        possible[i][t][C-1] = 0;    
                                                        rowsChanged[yWingChanges] = i;
                                                        columnsChanged[yWingChanges] = t;
                                                        yWingChangesMade = true;
                                                        yWingChanges++;
                                                    }
                                                }
                                                
                                                // save changes to change log
                                                if (yWingChangesMade) {
                                                    if (!isGuessAndCheck && !isBruteForce) {
                                                        possibleChangeMethod.push("Y Wing - Row + Group");

                                                        // Sort the numbers in ascending order
                                                        const sortedNumbers = [A, B, C].sort((a, b) => a - b);
                                                        const numbersText = sortedNumbers.slice(0, -1).join(", ") + " and " + sortedNumbers[sortedNumbers.length - 1];
                                                        description = "Since the numbers " + numbersText +
                                                            " form a Y Wing with the center wing at Row " + (i+1) + " Column " + (j+1) +
                                                            ", the row wing at Row " + (i+1) + " Column " + (rowWingColumn+1) +
                                                            ", and the group wing at Row " + (groupWingRow+1) + " Column " + (groupWingColumn+1) +
                                                            ", the below numbers were removed as possible options:";    

                                                        // Create an array of changes to sort
                                                        const changes = [];
                                                        for (let u = 0; u < yWingChanges; u++) {
                                                            changes.push({
                                                                row: rowsChanged[u],
                                                                column: columnsChanged[u],
                                                                number: C
                                                            });
                                                        }

                                                        // Sort changes by number, then row, then column
                                                        changes.sort((a, b) => {
                                                            if (a.number !== b.number) return a.number - b.number;
                                                            if (a.row !== b.row) return a.row - b.row;
                                                            return a.column - b.column;
                                                        });

                                                        // Add sorted changes to description and arrays
                                                        for (const change of changes) {
                                                            description = description + "\nRow " + (change.row+1) + ", Column " + (change.column+1) + ": " + change.number;
                                                            possibleChangeOrder.push(possibleChangeCount);
                                                            possibleChangeNumber.push(change.number);
                                                            possibleChangeRow.push(change.row);
                                                            possibleChangeColumn.push(change.column);
                                                            possibleChangePossibleCount++;
                                                        }

                                                        possibleChangeDescription.push(description);
                                                        totalChangeType.push("possible");
                                                        levelTwoChanges++;
                                                        yWingRowGroupChanges++;
                                                        possibleChangeCount++;
                                                        totalChangeCount++;
                                                    }
                                                    tempChanges++;

                                                    // Run previous methods to see if the puzzle can be solved
                                                    tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    if (!solved) {
                                                        tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    }
                                                }
                                            }   
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function columnGroupYWingCheck(intPuzzle, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let yWingChanges = 0;
    let A;
    let B;
    let C;
    let columnWingRow;
    let columnWingGroup;
    let isColumnWing_AC;
    let isColumnWing_BC;
    let centerWingGroup;
    let groupWingRow;
    let groupWingColumn;
    let yWingChangesMade;
    let rowsChanged = new Array(5).fill(0);
    let columnsChanged = new Array(5).fill(0);
    let description;

    do {
        tempChanges = 0;
        updateTwoOption(intPuzzle, possible, numbers, isTwoOption);
        yWingChangesMade = false;

        for (let i = 0; i < 9 && !yWingChangesMade && !solved; i++) { // row number
            for (let j = 0; j < 9 && !yWingChangesMade && !solved; j++) { // column number
                A = 0;
                B = 0;
                C = 0;

                if (isTwoOption[i][j] === true) {
                    A = numbers[i][j][0];
                    B = numbers[i][j][1];
                    centerWingGroup = determineGroup(i, j);
                }

                // go down the column to see if there is another two option cell
                // that can be a wing cell
                for (let q = 0; q < 9 && !yWingChangesMade && !solved; q++) { // row number
                    columnWingRow = -1;
                    columnWingGroup = -1;
                    let tempGroup = determineGroup(q, j);
                    isColumnWing_AC = false;
                    isColumnWing_BC = false;

                    if (isTwoOption[q][j] === true && q !== i && tempGroup !== centerWingGroup) {   
                        if (numbers[q][j][0] === A && numbers[q][j][1] !== B) {
                            columnWingRow = q;
                            columnWingGroup = determineGroup(q, j);
                            C = numbers[q][j][1];
                            isColumnWing_AC = true;
                        } else if (numbers[q][j][0] === B && numbers[q][j][1] !== A) {
                            columnWingRow = q;
                            columnWingGroup = determineGroup(q, j);
                            C = numbers[q][j][1];
                            isColumnWing_BC = true;
                        } else if (numbers[q][j][0] !== A && numbers[q][j][1] === B) {
                            columnWingRow = q;
                            columnWingGroup = determineGroup(q, j);
                            C = numbers[q][j][0];
                            isColumnWing_BC = true;
                        } else if (numbers[q][j][0] !== B && numbers[q][j][1] === A) {
                            columnWingRow = q;
                            columnWingGroup = determineGroup(q, j);
                            C = numbers[q][j][0];
                            isColumnWing_AC = true;
                        }   

                        // if a column wing has been found, check for a group wing
                        if (columnWingRow !== -1) {
                            groupWingRow = -1;
                            groupWingColumn = -1;

                            for (let r = ROW_START[centerWingGroup]; r <= ROW_END[centerWingGroup] && !yWingChangesMade && !solved; r++) { // row number
                                for (let s = COLUMN_START[centerWingGroup]; s <= COLUMN_END[centerWingGroup] && !yWingChangesMade && !solved; s++) { // column number
                                    if (isTwoOption[r][s] === true && s !== j) {
                                        // check to see if the group wing is equal to the opposite config of the column wing
                                        // case 1) Column Wing = AC, is Group Wing = BC?
                                        // case 2) Column Wing = BC, is Group Wing = AC?

                                        if ((isColumnWing_AC === true && ((numbers[r][s][0] === B && numbers[r][s][1] === C) ||
                                                (numbers[r][s][1] === B && numbers[r][s][0] === C))) ||
                                                (isColumnWing_BC === true && ((numbers[r][s][0] === A && numbers[r][s][1] === C) ||
                                                (numbers[r][s][1] === A && numbers[r][s][0] === C)))) {
                                            // Y Wing exists!!
                                            groupWingRow = r;
                                            groupWingColumn = s;
                                            yWingChanges = 0;
                                            rowsChanged.fill(0);
                                            columnsChanged.fill(0);
                                            description = "";

                                            // Remove C from all cells that are:    
                                            // 1) in both the Group Wing's row & the Column Wing's group OR
                                            // 2) in the Center group & current column
                                            for (let t = ROW_START[columnWingGroup]; t <= ROW_END[columnWingGroup]; t++) {
                                                if (intPuzzle[t][groupWingColumn] === 0 && possible[t][groupWingColumn][C-1] === C && t !== groupWingRow) {
                                                    // Remove C and record the change
                                                    possible[t][groupWingColumn][C-1] = 0;
                                                    rowsChanged[yWingChanges] = t;
                                                    columnsChanged[yWingChanges] = groupWingColumn;
                                                    yWingChangesMade = true;
                                                    yWingChanges++;
                                                }
                                            }

                                            for (let t = ROW_START[centerWingGroup]; t <= ROW_END[centerWingGroup]; t++) {
                                                if (intPuzzle[t][j] === 0 && possible[t][j][C-1] === C && t !== i) {
                                                    // Remove C and record the change
                                                    possible[t][j][C-1] = 0;
                                                    rowsChanged[yWingChanges] = t;
                                                    columnsChanged[yWingChanges] = j;
                                                    yWingChangesMade = true;
                                                    yWingChanges++;
                                                }
                                            }
                                            
                                            // save changes to change log
                                            if (yWingChangesMade) {
                                                if (!isGuessAndCheck && !isBruteForce) {
                                                    possibleChangeMethod.push("Y Wing - Column + Group");

                                                    // Sort the numbers in ascending order
                                                    const sortedNumbers = [A, B, C].sort((a, b) => a - b);
                                                    const numbersText = sortedNumbers.slice(0, -1).join(", ") + " and " + sortedNumbers[sortedNumbers.length - 1];
                                                    description = "Since the numbers " + numbersText +
                                                        " form a Y Wing with the center wing at Row " + (i+1) + " Column " + (j+1) +
                                                        ", the column wing at Row " + (columnWingRow+1) + " Column " + (j+1) +
                                                        ", and the group wing at Row " + (groupWingRow+1) + " Column " + (groupWingColumn+1) +
                                                        ", the below numbers were removed as possible options:";

                                                    // Create an array of changes to sort
                                                    const changes = [];
                                                    for (let u = 0; u < yWingChanges; u++) {
                                                        changes.push({
                                                            row: rowsChanged[u],
                                                            column: columnsChanged[u],
                                                            number: C
                                                        });
                                                    }

                                                    // Sort changes by number, then row, then column
                                                    changes.sort((a, b) => {
                                                        if (a.number !== b.number) return a.number - b.number;
                                                        if (a.row !== b.row) return a.row - b.row;
                                                        return a.column - b.column;
                                                    });
                                                    
                                                    // Add sorted changes to description and arrays
                                                    for (const change of changes) {
                                                        description = description + "\nRow " + (change.row+1) + ", Column " + (change.column+1) + ": " + change.number;
                                                        possibleChangeOrder.push(possibleChangeCount);
                                                        possibleChangeNumber.push(change.number);
                                                        possibleChangeRow.push(change.row);
                                                        possibleChangeColumn.push(change.column);
                                                        possibleChangePossibleCount++;
                                                    }

                                                    possibleChangeDescription.push(description);
                                                    totalChangeType.push("possible");
                                                    levelTwoChanges++;
                                                    yWingColumnGroupChanges++;
                                                    possibleChangeCount++;
                                                    totalChangeCount++;
                                                }
                                                tempChanges++;

                                                // Run previous methods to see if the puzzle can be solved
                                                tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                if (!solved) {
                                                    tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);          
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function updateTwoOption(intPuzzle, possible, numbers, isTwoOption) {
    let cellCount;
    
    for (let i = 0; i < 9; i++) {
        isTwoOption[i].fill(false);
        for (let j = 0; j < 9; j++) {
            numbers[i][j].fill(0);
        }
    }

    for (let i = 0; i < 9; i++) { // row number
        for (let j = 0; j < 9; j++) { // column number
            cellCount = 0;
            if (intPuzzle[i][j] === 0) {
                for (let k = 0; k < 9; k++) { // number 1-9
                    if (possible[i][j][k] === k+1) {
                        if (cellCount === 0) {
                            numbers[i][j][0] = k+1;
                        } else if (cellCount === 1) {
                            numbers[i][j][1] = k+1;
                        }
                        cellCount++;
                    }
                }
            }

            if (cellCount === 2) {
                isTwoOption[i][j] = true;
            }   
        }
    }
}

function levelThreeMethods(intPuzzle, possible, Rows, Columns, Groups) {
    let changes = 0;
    let tempLevelThreeChanges = 0;

    do {
        changes = 0;
        changes += guessAndCheck(intPuzzle, possible, Rows, Columns, Groups, false);
        tempLevelThreeChanges += changes;
    } while (changes !== 0 && !solved);
    
    if (!solved) {
        // clone intPuzzle, possible, Rows, Columns, and Groups here and feed them into bruteForce below
        let clonePuzzle = new Array(9).fill().map(() => new Array(9).fill(0));
        let clonePossible = new Array(9).fill().map(() => new Array(9).fill(0).map(() => new Array(9).fill(0)));
        let cloneRows = new Array(9).fill().map(() => new Array(9).fill(false));
        let cloneColumns = new Array(9).fill().map(() => new Array(9).fill(false));
        let cloneGroups = new Array(9).fill().map(() => new Array(9).fill(false));

        setGameOrBoolEqual(intPuzzle, clonePuzzle);
        setPossibleEqual(possible, clonePossible);
        setGameOrBoolEqual(Rows, cloneRows);
        setGameOrBoolEqual(Columns, cloneColumns);
        setGameOrBoolEqual(Groups, cloneGroups);

        bruteForce(clonePuzzle, clonePossible, cloneRows, cloneColumns, cloneGroups);

        // update possible so the puzzle will solve by calling previous methods again
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (intPuzzle[i][j] !== clonePuzzle[i][j]) {
                    for (let k = 0; k < 9; k++) {
                        if (possible[i][j][k] !== 0 && possible[i][j][k] !== clonePuzzle[i][j]) {
                            possible[i][j][k] = 0;
                            possibleChangeOrder.push(possibleChangeCount);
                            possibleChangeNumber.push(k+1);
                            possibleChangeRow.push(i);
                            possibleChangeColumn.push(j);
                            possibleChangePossibleCount++;
                        }
                    }
                }
            }
        }
        totalChangeType.push("possible");
        levelThreeChanges++;
        bruteForceChanges++;
        possibleChangeCount++;
        totalChangeCount++;

        // save data to change log
        possibleChangeMethod.push("Brute Force");
        let description = "Eliminating the highlighted possible options makes the puzzle solvable using previous methods";
        possibleChangeDescription.push(description);

        // call previous methods again to solve the puzzle
        levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, false, false);
        if (!solved) {
            levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, false, false);
            if (!solved) {
                levelTwoMethods(intPuzzle, possible, Rows, Columns, Groups, false, false);
                if (!solved) {
                    guessAndCheck(intPuzzle, possible, Rows, Columns, Groups, false);
                }
            }
        }
    }

    return tempLevelThreeChanges;
}

function guessAndCheck(intPuzzle, possible, Rows, Columns, Groups, isBruteForce) {
    let changes = 0;
    let tempChanges = 0;
    let tempCount;
    let tempOptions = new Array(9).fill(0);
    let clonePuzzles = new Array(9).fill().map(() => new Array(9).fill(0).map(() => new Array(9).fill(0))); // first index: clone game number, second index: row, third index: column
    let clonePossible = new Array(9).fill().map(() => new Array(9).fill(0).map(() => new Array(9).fill(0)));
    let cloneRows = new Array(9).fill().map(() => new Array(9).fill(false));
    let cloneColumns = new Array(9).fill().map(() => new Array(9).fill(false));
    let cloneGroups = new Array(9).fill().map(() => new Array(9).fill(false));
    let contradictionFound;
    let sameNumFound;
    let tempSolved;
    let description;
    
    do {
        tempChanges = 0;
        contradictionFound = false;
        sameNumFound = false;
        tempSolved = false;
        
        for (let optionCount = 2; optionCount < 10 && !contradictionFound && !sameNumFound && !tempSolved; optionCount++) {
            for (let i = 0; i < 9 && !contradictionFound && !sameNumFound && !tempSolved; i++) {
                for (let j = 0; j < 9 && !contradictionFound && !sameNumFound && !tempSolved; j++) {
                    if (intPuzzle[i][j] === 0) {
                        // count how many options are in this cell and store them
                        tempCount = 0;
                        for (let k = 0; k < 9; k++) {
                            if (possible[i][j][k] === k+1) {
                                tempOptions[tempCount] = k+1;
                                tempCount++;
                            }
                        }
                        
                        if (tempCount === optionCount) {
                            // set clonePuzzles to zero
                            resetCloneGames(clonePuzzles);

                            for (let currentOption = 0; currentOption < optionCount && !contradictionFound && !tempSolved; currentOption++) {
                                // clone the current puzzle
                                setGameOrBoolEqual(intPuzzle, clonePuzzles[currentOption]);
                                setPossibleEqual(possible, clonePossible);
                                setGameOrBoolEqual(Rows, cloneRows);
                                setGameOrBoolEqual(Columns, cloneColumns);
                                setGameOrBoolEqual(Groups, cloneGroups);

                                // set the current option as the answer
                                clonePuzzles[currentOption][i][j] = tempOptions[currentOption];
                                updateShadowPossible(tempOptions[currentOption], i, j, clonePossible, cloneRows, cloneColumns, cloneGroups, true, isBruteForce);

                                // solve the clone as much as possible using all previous methods
                                levelZeroMethods(clonePuzzles[currentOption], clonePossible, cloneRows, cloneColumns, cloneGroups, true, isBruteForce);
                                if (!isSolved(clonePuzzles[currentOption])) {
                                    levelOneMethods(clonePuzzles[currentOption], clonePossible, cloneRows, cloneColumns, cloneGroups, true, isBruteForce);
                                    if (!isSolved(clonePuzzles[currentOption])) {
                                        levelTwoMethods(clonePuzzles[currentOption], clonePossible, cloneRows, cloneColumns, cloneGroups, true, isBruteForce);
                                    }
                                }

                                // check to see if this guess solved the puzzle
                                if (isSolved(clonePuzzles[currentOption])) {
                                    tempSolved = true;
                                    for (let k = 0; k < 9; k++) {
                                        if (possible[i][j][k] !== tempOptions[currentOption] && possible[i][j][k] !== 0) {
                                            possible[i][j][k] = 0;
                                            if (!isBruteForce) {
                                                possibleChangeOrder.push(possibleChangeCount);
                                                possibleChangeNumber.push(k+1);
                                                possibleChangeRow.push(i);
                                                possibleChangeColumn.push(j);
                                                possibleChangePossibleCount++;
                                            }
                                            tempChanges++;
                                        }
                                    }

                                    if (!isBruteForce) {
                                        totalChangeType.push("possible");
                                        levelThreeChanges++;
                                        guessAndCheckChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;

                                        // save data to change log
                                        possibleChangeMethod.push("Guess and Check - Solved");
                                        description = "Making row " + (i+1) + ", column " + (j+1) + " the number " + tempOptions[currentOption] + " solved the puzzle." + 
                                                " Therefore, all possible options besides " + tempOptions[currentOption] + " were removed";
                                        possibleChangeDescription.push(description);
                                    }
                                }

                                // check to see if there are any cells with zero options
                                if (!tempSolved) {
                                    for (let x = 0; x < 9 && !contradictionFound; x++) {
                                        for (let y = 0; y < 9 && !contradictionFound; y++) {
                                            if (clonePuzzles[currentOption][x][y] === 0) {
                                                if (countPossibleOptions(x, y, clonePossible) === 0) {
                                                    // a contradiction has occured that made a cell unfillable
                                                    // therefore, the current option is not possible and needs to be removed
                                                    contradictionFound = true;
                                                }
                                            }
                                        }
                                    }   

                                    // if a contradiction was found, remove the current option as a possible option
                                    if (contradictionFound) {
                                        possible[i][j][tempOptions[currentOption]-1] = 0;

                                        // save data to change log
                                        if (!isBruteForce) {
                                            possibleChangeMethod.push("Guess and Check - Contradiction");
                                            description = "Making row " + (i+1) + ", column " + (j+1) + " the number " + tempOptions[currentOption] + " leads to a contradiction. Therefore, it was removed as a possible option";
                                            possibleChangeDescription.push(description);
                                            possibleChangeOrder.push(possibleChangeCount);
                                            possibleChangeNumber.push(tempOptions[currentOption]);
                                            possibleChangeRow.push(i);
                                            possibleChangeColumn.push(j);
                                            possibleChangePossibleCount++;
                                            totalChangeType.push("possible");
                                            levelThreeChanges++;
                                            guessAndCheckChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;
                                    }
                                }
                            }

                            // check to see if any cells resulted in the same number with all guesses
                            if (!contradictionFound && !tempSolved) {
                                for (let x = 0; x < 9; x++) {
                                    for (let y = 0; y < 9; y++) {
                                        if (intPuzzle[x][y] === 0) {
                                            let num = clonePuzzles[0][x][y];
                                            let diffFlag = false;
                                            for (let currentOption = 1; currentOption < optionCount; currentOption++) {
                                                if (clonePuzzles[currentOption][x][y] !== num) {
                                                    diffFlag = true;
                                                }
                                            }
                                            if (!diffFlag && num !== 0) {
                                                // the value at row x column y must be num
                                                // in order to let the level zero methods place the number in the grid, remove all possible options except num
                                                sameNumFound = true;
                                                for (let k = 0; k < 9; k++) {
                                                    if (possible[x][y][k] !== num && possible[x][y][k] !== 0) {
                                                        possible[x][y][k] = 0;
                                                        if (!isBruteForce) {
                                                            possibleChangeOrder.push(possibleChangeCount);
                                                            possibleChangeNumber.push(k+1);
                                                            possibleChangeRow.push(x);
                                                            possibleChangeColumn.push(y);
                                                            possibleChangePossibleCount++;
                                                        }
                                                        tempChanges++;
                                                    }
                                                }
                                                if (!isBruteForce) {
                                                    totalChangeType.push("possible");
                                                    levelThreeChanges++;
                                                    guessAndCheckChanges++;
                                                    possibleChangeCount++;
                                                    totalChangeCount++;

                                                    // save data to change log
                                                    possibleChangeMethod.push("Guess and Check - Same Number");
                                                    description = "Making row " + (i+1) + ", column " + (j+1) + " all possible options leads to row " + (x+1) + ", column " + (y+1) + " being number " + num + " for each option." + 
                                                            " Therefore, all possible options besides " + num + " were removed";
                                                    possibleChangeDescription.push(description);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Run previous methods to see if the puzzle can be solved
        tempChanges += levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, false, isBruteForce);
        if (!solved) {
            tempChanges += levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, false, isBruteForce);
            if (!solved) {
                tempChanges += levelTwoMethods(intPuzzle, possible, Rows, Columns, Groups, false, isBruteForce);
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);

    return changes;
}

function bruteForce(intPuzzle, possible, Rows, Columns, Groups) {
    let clonePuzzle = new Array(9).fill().map(() => new Array(9).fill(0));
    let clonePossible = new Array(9).fill().map(() => new Array(9).fill(0).map(() => new Array(9).fill(0)));
    
    for (let optionCount = 2; optionCount < 10; optionCount++) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (intPuzzle[i][j] === 0) {
                    // count how many options are in this cell and store them
                    let tempCount = 0;
                    let tempOptions = new Array(9).fill(0);
                    for (let k = 0; k < 9; k++) {
                        if (possible[i][j][k] === k+1) {
                            tempOptions[tempCount] = k+1;
                            tempCount++;
                        }
                    }
                    if (tempCount === optionCount) {
                        for (let currentOption = 0; currentOption < optionCount; currentOption++) {
                            setGameOrBoolEqual(intPuzzle, clonePuzzle);
                            setPossibleEqual(possible, clonePossible);
                            intPuzzle[i][j] = tempOptions[currentOption];
                            updateShadowPossible(tempOptions[currentOption], i, j, possible, Rows, Columns, Groups, false, true);

                            // solve the puzzle as much as possible using previous methods
                            levelZeroMethods(intPuzzle, possible, Rows, Columns, Groups, false, true);
                            if (!isSolved(intPuzzle)) {
                                levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, false, true);
                                if (!isSolved(intPuzzle)) {
                                    levelTwoMethods(intPuzzle, possible, Rows, Columns, Groups, false, true);
                                    if (!isSolved(intPuzzle)) {
                                        guessAndCheck(intPuzzle, possible, Rows, Columns, Groups, true);
                                    }
                                }
                            }

                            // check if the puzzle is solved
                            if (isSolved(intPuzzle)) {
                                bruteForceSolved = true;
                                // reset the game to only have the digits needed to solve the puzzle with previous methods, and return
                                setGameOrBoolEqual(clonePuzzle, intPuzzle);
                                intPuzzle[i][j] = tempOptions[currentOption];
                                return;
                            }

                            // if the puzzle wasn't solved, check if it's still valid
                            if (isValid(intPuzzle, possible)) {
                                // puzzle is still valid, continue with the recursion
                                bruteForce(intPuzzle, possible, Rows, Columns, Groups);
                                // return if the subsequent recursions have solved the puzzle
                                if (bruteForceSolved) {
                                    return;
                                }
                            } else {
                                // puzzle is invalid, reset game and possible, try the next option
                                setGameOrBoolEqual(clonePuzzle, intPuzzle);
                                setPossibleEqual(clonePossible, possible);
                            }
                        }
                    }
                }
            }
        }
    }
}

function resetCloneGames(clonePuzzles) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            clonePuzzles[i][j].fill(0);
        }
    }
}

function setGameOrBoolEqual(intPuzzle, clonePuzzles) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            clonePuzzles[i][j] = intPuzzle[i][j];
        }
    }
}

function setPossibleEqual(possible, clonePossible) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < 9; k++) {
                clonePossible[i][j][k] = possible[i][j][k];
            }
        }
    }
}

function countPossibleOptions(row, column, possible) {
    let options = 0;

    for (let k = 0; k < 9; k++) {
        if (possible[row][column][k] === k+1) {
            options++;
        }
    }
    
    return options;
}

function isValid(intPuzzle, possible) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (intPuzzle[i][j] === 0) {
                if (countPossibleOptions(i, j, possible) === 0) {
                    // a contradiction has occured that made a cell unfillable
                    return false;
                }
            }
        }
    }
    return true;
}
