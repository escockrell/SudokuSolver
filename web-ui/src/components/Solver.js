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
let totalChangeMethod = [];

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
    console.log("Phantom Column Changes: ", phantomColumnChanges);
    console.log("Phantom Group Changes: ", phantomGroupChanges);
    console.log("Naked Pair Row Changes: ", nakedPairRowChanges);
    console.log("Naked Pair Column Changes: ", nakedPairColumnChanges);
    console.log("Naked Pair Group Changes: ", nakedPairGroupChanges);

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
    console.log("Total Change Method: ", totalChangeMethod);

    // Convert the solution array to a string
    const solutionString = solvePuzzle.map(row => 
        row.join('')
    ).join('');

    // Create metrics object
    const metrics = {
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
        mainChangeCount,
        possibleChangeCount,
        possibleChangePossibleCount,
        totalChangeCount
    };

    // Create changes object
    const changes = {
        main: mainChangeNumber.map((number, index) => ({
            number,
            method: mainChangeMethod[index],
            description: mainChangeDescription[index],
            row: mainChangeRow[index],
            column: mainChangeColumn[index]
        })),
        possible: possibleChangeNumber.map((number, index) => ({
            number,
            method: possibleChangeMethod[index],
            description: possibleChangeDescription[index],
            order: possibleChangeOrder[index],
            row: possibleChangeRow[index],
            column: possibleChangeColumn[index]
        })),
        total: totalChangeType.map((type, index) => ({
            type,
            method: totalChangeMethod[index]
        }))
    };

    // Return the formatted response object
    return {
        solution: solutionString,
        solved,
        metrics,
        changes
    };
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
                                if (intPuzzle[row][col] === 0 && possible[row][col][k] === k+1 && row != i) {
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
                                if (intPuzzle[row][col] === 0 && possible[row][col][k] === k+1 && col != j) {
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
                                if (intPuzzle[i][j] === 0 && j != column1 && j != column2) {
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
                                if (intPuzzle[i][j] === 0 && i != row1 && i != row2) {
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
                                    if (intPuzzle[i][j] === 0 && !(i == row1 && j == column1) && !(i == row2 && j == column2)) {
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
