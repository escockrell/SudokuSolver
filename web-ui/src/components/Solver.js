let solved = false;
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
    console.log(`Solving puzzle: ${startPuzzleString}`);
    resetMetrics();
    const startPuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solvePuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solveRows = initializeRows(solvePuzzle);
    let solveColumns = initializeColumns(solvePuzzle);
    let solveGroups = initializeGroups(solvePuzzle);
    const startPossible = initializePossible(solvePuzzle, solveRows, solveColumns, solveGroups);
    let solvePossible = initializePossible(solvePuzzle, solveRows, solveColumns, solveGroups);

    levelZeroMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);

    if (!solved) {
        levelOneMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);
        if (!solved) {
            levelTwoMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);
            if (!solved) {
                // levelThreeMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups);
            }
        }
    }
    
    // Convert the solution array to a string
    const solutionString = solvePuzzle.map(row => 
        row.join('')
    ).join('');

    // Create metrics object
    const metrics = {
        solved,

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
        // changes += hiddenTripleChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += nakedQuadChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += xWingChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += yWingChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
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
