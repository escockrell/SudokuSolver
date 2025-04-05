let solved = false;
let levelZeroChanges = 0;
let oneInARowChanges = 0;
let oneInAColumnChanges = 0;
let oneInAGroupChanges = 0;
let oneInACellChanges = 0;
let levelOneChanges = 0;
let phantomRowChanges = 0;
let mainChangeCount = 0;
let possibleChangeCount = 0;
let possibleChangePossibleCount = 0;
let totalChangeCount = 0;

let mainChangeNumber = [];
let mainChangeMethod = [];
let mainChangeDescription = [];
let mainChangeRow = [];
let mainChangeColumn = [];
let possibleChangeMethod = [];
let possibleChangeDescription = [];
let possibleChangeOrder = [];
let possibleChangeNumber = [];
let possibleChangeRow = [];
let possibleChangeColumn = [];
let totalChangeType = [];

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

    if (!solved) {
        levelOneMethods(solvePuzzle, solvePossible, solveRows, solveColumns, solveGroups, false, false);
    }
    

    console.log("Solved: ", solved);
    console.log("Total Change Count: ", totalChangeCount);
    console.log("Main Change Count: ", mainChangeCount);
    console.log("Possible Change Count: ", possibleChangeCount);

    console.log("Level Zero Changes: ", levelZeroChanges);
    console.log("One In A Row Changes: ", oneInARowChanges);
    console.log("One In A Column Changes: ", oneInAColumnChanges);
    console.log("One In A Group Changes: ", oneInAGroupChanges);
    console.log("One In A Cell Changes: ", oneInACellChanges);

    console.log("Level One Changes: ", levelOneChanges);
    console.log("Phantom Row Changes: ", phantomRowChanges);
    // console.log("Phantom Column Changes: ", phantomColumnChanges);
    // console.log("Phantom Group Changes: ", phantomGroupChanges);

    console.log("Main Change Number: ", mainChangeNumber);
    console.log("Main Change Row: ", mainChangeRow);
    console.log("Main Change Column: ", mainChangeColumn);
    console.log("Main Change Method: ", mainChangeMethod);
    console.log("Main Change Description: ", mainChangeDescription);

    console.log("Possible Change Number: ", possibleChangeNumber);
    console.log("Possible Change Row: ", possibleChangeRow);
    console.log("Possible Change Column: ", possibleChangeColumn);
    console.log("Possible Change Method: ", possibleChangeMethod);
    console.log("Possible Change Description: ", possibleChangeDescription);
    console.log("Possible Change Order: ", possibleChangeOrder);
    
    console.log("Total Change Type: ", totalChangeType);
    
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
    } while (tempChanges !== 0);
    
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
    } while (tempChanges !== 0);
    
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
    } while (tempChanges !== 0);

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
    } while (tempChanges !== 0);
    
    return changes;
}

function levelOneMethods(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce) {
    let changes;
    let tempLevelOneChanges = 0;

    do {
        changes = 0;
        changes += phantomChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += nakedPairChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += hiddenPairChecks(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
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
        // changes += columnPhantomCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += groupPhantomRowCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        // changes += groupPhantomColumnCheck(intPuzzle, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
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



