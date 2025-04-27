let solved = false;
let bruteForceSolved = false;
let isGuessAndCheck = false;
let isBruteForce = false;

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

// Arrays to track changes
let mainChanges = []; // For actual number placements
let possibleChanges = []; // For possible number removals
let mainPossibleChanges = []; // For possible number updates after main changes

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

export function solvePuzzle(startPuzzleString) {
    const startTime = performance.now();
    resetMetrics();
    let solvePuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solvePossible = initializePossible(solvePuzzle);

    // Only try to solve the puzzle if it is valid
    if (check(solvePuzzle)) {
        levelZeroMethods(solvePuzzle, solvePossible);
        if(!solved) {
            levelOneMethods(solvePuzzle, solvePossible);
            // if(!solved) {
            //     levelTwoMethods(solvePuzzle, solvePossible);
            //     if(!solved) {
            //         levelThreeMethods(solvePuzzle, solvePossible);
            //     }
            // }
        }
    }

    // Calculate the time it took to solve the puzzle
    const endTime = performance.now();
    const solveTime = endTime - startTime;

    // Convert the solution array to a string
    const solutionString = solvePuzzle.join('');

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

        changes: {
            main: mainChanges,
            possible: possibleChanges,
            mainPossible: mainPossibleChanges
        }
    };

    return {
        metrics,
        solution: solutionString,
    };
}

function resetMetrics() {
    solved = false;
    bruteForceSolved = false;
    isGuessAndCheck = false;
    isBruteForce = false;

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

    // Reset change tracking arrays
    mainChanges = [];
    possibleChanges = [];
    mainPossibleChanges = [];
}

function convertPuzzleToIntArray(startPuzzleString) {
    return startPuzzleString.split('').map(num => parseInt(num));
}

function getNumbersInRow(solvePuzzle, row) {
    const startIndex = row * 9;
    return solvePuzzle.slice(startIndex, startIndex + 9).filter(num => num !== 0);
}

function getNumbersInColumn(solvePuzzle, column) {
    const numbers = [];
    for (let row = 0; row < 9; row++) {
        const num = solvePuzzle[row * 9 + column];
        if (num !== 0) numbers.push(num);
    }
    return numbers;
}

function getNumbersInGroup(solvePuzzle, row, column) {
    const numbers = [];
    const groupRow = Math.floor(row / 3) * 3;
    const groupCol = Math.floor(column / 3) * 3;
    
    for (let r = groupRow; r < groupRow + 3; r++) {
        for (let c = groupCol; c < groupCol + 3; c++) {
            const num = solvePuzzle[r * 9 + c];
            if (num !== 0) numbers.push(num);
        }
    }
    return numbers;
}

function determineGroup(row, column) {
    return Math.floor(row / 3) * 3 + Math.floor(column / 3);
}

function initializePossible(solvePuzzle) {
    let possible = [];
    
    for (let i = 0; i < 81; i++) {
        if (solvePuzzle[i] === 0) {
            const row = Math.floor(i / 9);
            const column = i % 9;
            const group = determineGroup(row, column);
            
            // Get numbers that are already in the row, column, and group
            const rowNumbers = getNumbersInRow(solvePuzzle, row);
            const columnNumbers = getNumbersInColumn(solvePuzzle, column);
            const groupNumbers = getNumbersInGroup(solvePuzzle, row, column);
            
            // Combine all existing numbers and remove duplicates
            const existingNumbers = [...new Set([...rowNumbers, ...columnNumbers, ...groupNumbers])];
            
            // Filter out numbers that already exist in row, column, or group
            const options = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
                num => !existingNumbers.includes(num)
            );
            
            const possibleOption = {
                row,
                column,
                group,
                options
            };
            possible.push(possibleOption);
        }
    }

    return possible;
}

function updateShadowPossible(number, changedCell, possible) {
    if (!isGuessAndCheck && !isBruteForce) {
        // Track the original cell's possible options
        mainPossibleChanges.push({
            order: mainChanges.length,
            number: number,
            row: changedCell.row,
            column: changedCell.column,
            options: [...changedCell.options]
        });
    }
    
    const updateCells = possible.filter(cell => 
        (cell.row === changedCell.row || 
         cell.column === changedCell.column || 
         cell.group === changedCell.group) && 
        cell.options.includes(number)
    );
    
    updateCells.forEach(cell => {
        if (!isGuessAndCheck && !isBruteForce) {
            mainPossibleChanges.push({
                order: mainChanges.length,
                number: number,
                row: cell.row,
                column: cell.column,
                options: [...cell.options]
            });
        }
        const index = possible.findIndex(p => p.row === cell.row && p.column === cell.column);
        possible[index].options = possible[index].options.filter(n => n !== number);
    });
}

function check(intPuzzle) {
    let count = 0;
        
    // Check to make sure there are at least 17 given digits
    count = intPuzzle.filter(num => num !== 0).length;
    if (count < 17) {
        return false;
    }
    
    // Checks each row for duplicates
    for (let i = 0; i < 9; i++) {
        const row = intPuzzle.slice(i * 9, (i + 1) * 9).filter(num => num !== 0);
        const uniqueNumbers = new Set(row);
        if (row.length !== uniqueNumbers.size) {
            return false;
        }
    }
    
    // Checks each column for duplicates
    for (let j = 0; j < 9; j++) { // column number
        const column = [];
        for (let i = 0; i < 9; i++) { // row number
            const num = intPuzzle[i * 9 + j];
            if (num !== 0) column.push(num);
        }
        const uniqueNumbers = new Set(column);
        if (column.length !== uniqueNumbers.size) {
            return false;
        }
    }
    
    // Checks each group for duplicates
    for (let group = 0; group < 9; group++) {
        const groupNumbers = [];
        const startRow = Math.floor(group / 3) * 3;
        const startCol = (group % 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const num = intPuzzle[(startRow + i) * 9 + (startCol + j)];
                if (num !== 0) groupNumbers.push(num);
            }
        }
        
        const uniqueNumbers = new Set(groupNumbers);
        if (groupNumbers.length !== uniqueNumbers.size) {
            return false;
        }
    }
    
    return true;
}

function isSolved(intPuzzle) {
    const count = intPuzzle.filter(num => num !== 0).length;
    return count === 81 && check(intPuzzle);
}

function updateSolved(intPuzzle) {
    solved = isSolved(intPuzzle);
}

function levelZeroMethods(intPuzzle, possible) {
    let changes;
    let tempLevelZeroChanges = 0;
    do {
        changes = 0;
        changes += oneInARowPossibleCheck(intPuzzle, possible);
        changes += oneInAColumnPossibleCheck(intPuzzle, possible);
        changes += oneInAGroupPossibleCheck(intPuzzle, possible);
        changes += oneInACellPossibleCheck(intPuzzle, possible);
        tempLevelZeroChanges += changes;
    } while (changes !== 0 && !solved);
    return tempLevelZeroChanges;
}

function oneInARowPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges = 0;

    do {
        tempChanges = 0;
        for (let row = 0; row < 9; row++) {
            const rowCells = possible.filter(cell => cell.row === row);
            for (let num = 1; num <= 9; num++) {
                const count = rowCells.filter(cell => cell.options.includes(num)).length;
                if (count === 1) {
                    const cell = rowCells.find(cell => cell.options.includes(num));
                    intPuzzle[cell.row * 9 + cell.column] = num;
                    possible.splice(possible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);
                    
                    // Log the change
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangeNumber.push(String(num));
                        mainChangeMethod.push("One in a Row");
                        mainChangeDescription.push("The number " + num + " is only possible in row " + 
                                (cell.row + 1) + ", column " + (cell.column + 1));
                        mainChangeRow.push(cell.row);
                        mainChangeColumn.push(cell.column);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Row");
                        levelZeroChanges++;
                        oneInARowChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                    }

                    updateShadowPossible(num, cell, possible);
                    tempChanges++;
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function oneInAColumnPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges = 0;

    do {
        tempChanges = 0;
        for (let column = 0; column < 9; column++) {
            const columnCells = possible.filter(cell => cell.column === column);
            for (let num = 1; num <= 9; num++) {
                const count = columnCells.filter(cell => cell.options.includes(num)).length;
                if (count === 1) {
                    const cell = columnCells.find(cell => cell.options.includes(num));
                    intPuzzle[cell.row * 9 + cell.column] = num;
                    possible.splice(possible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);

                    // Log the change
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangeNumber.push(String(num));
                        mainChangeMethod.push("One in a Column");
                        mainChangeDescription.push("The number " + num + " is only possible in column " + 
                                (cell.column + 1) + ", row " + (cell.row + 1));
                        mainChangeRow.push(cell.row);
                        mainChangeColumn.push(cell.column);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Column");
                        levelZeroChanges++;
                        oneInAColumnChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                        updateSolved(intPuzzle);
                    }

                    updateShadowPossible(num, cell, possible);
                    tempChanges++;
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function oneInAGroupPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges = 0;

    do {
        tempChanges = 0;
        for (let group = 0; group < 9; group++) {
            const groupCells = possible.filter(cell => cell.group === group);
            for (let num = 1; num <= 9; num++) {
                const count = groupCells.filter(cell => cell.options.includes(num)).length;
                if (count === 1) {
                    const cell = groupCells.find(cell => cell.options.includes(num));
                    intPuzzle[cell.row * 9 + cell.column] = num;
                    possible.splice(possible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);

                    // Log the change
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangeNumber.push(String(num));
                        mainChangeMethod.push("One in a Group");
                        mainChangeDescription.push("The number " + num + " is only possible in row " + 
                            (cell.row + 1) + ", column " + (cell.column + 1) + " in group " + (cell.group + 1));
                        mainChangeRow.push(cell.row);
                        mainChangeColumn.push(cell.column);
                        totalChangeType.push("main");
                        totalChangeMethod.push("One in a Group");
                        levelZeroChanges++;
                        oneInAGroupChanges++;
                        mainChangeCount++;
                        totalChangeCount++;
                        updateSolved(intPuzzle);
                    }

                    updateShadowPossible(num, cell, possible);
                    tempChanges++;
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function oneInACellPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges = 0;

    do {
        tempChanges = 0;
        const oneOptionCells = possible.filter(cell => cell.options.length === 1);
        oneOptionCells.forEach(cell => {
            intPuzzle[cell.row * 9 + cell.column] = cell.options[0];
            possible.splice(possible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);
            
            // Log the change
            if (!isGuessAndCheck && !isBruteForce) {
                mainChangeNumber.push(String(cell.options[0]));
                mainChangeMethod.push("One in a Cell");
                mainChangeDescription.push("The number " + cell.options[0] + " is the only possible option for cell " + 
                        (cell.row + 1) + ", column " + (cell.column + 1));
                mainChangeRow.push(cell.row);
                mainChangeColumn.push(cell.column);
                totalChangeType.push("main");
                totalChangeMethod.push("One in a Cell");
                levelZeroChanges++;
                oneInACellChanges++;
                mainChangeCount++;
                totalChangeCount++;
                tempChanges++;
                updateSolved(intPuzzle);
            }

            updateShadowPossible(cell.options[0], cell, possible);
            tempChanges++;
        });
        changes += tempChanges;
    } while (tempChanges !== 0 && !solved);
    
    return changes;
}

function levelOneMethods(intPuzzle, possible) {
    let changes;
    let tempLevelOneChanges = 0;
    do {
        changes = 0;
        changes += phantomChecks(intPuzzle, possible);
        changes += nakedPairChecks(intPuzzle, possible);
        changes += hiddenPairChecks(intPuzzle, possible);
        tempLevelOneChanges += changes;
    } while (changes !== 0 && !solved);
    return tempLevelOneChanges;
}

function phantomChecks(intPuzzle, possible) {
    let changes;
    let tempPhantomChanges = 0;
    do {
        changes = 0;
        changes += rowPhantomCheck(intPuzzle, possible);
        changes += columnPhantomCheck(intPuzzle, possible);
        changes += groupPhantomCheck(intPuzzle, possible);
        tempPhantomChanges += changes;
    } while (changes !== 0 && !solved);
    return tempPhantomChanges;
}

function rowPhantomCheck(intPuzzle, possible) {
    let changes = 0;
    let tempRowPhantomChanges = 0;

    do {
        tempRowPhantomChanges = 0;
        
        // For each group
        for (let group = 0; group < 9 && !solved; group++) {
            
            // Get all possible cells in this group
            const groupCells = possible.filter(cell => cell.group === group);
            
            // For each number 1-9
            for (let num = 1; num <= 9 && !solved; num++) {
                // Find cells in group that could contain this number
                const cellsWithNum = groupCells.filter(cell => cell.options.includes(num));
                
                if (cellsWithNum.length > 0) {
                    // Check if all cells with this number are in the same row
                    const uniqueRows = new Set(cellsWithNum.map(cell => cell.row));
                    
                    if (uniqueRows.size === 1) {
                        const phantomRow = uniqueRows.values().next().value;
                        
                        // Get all cells in the row outside this group with num as a possible option
                        const cellsToChange = possible.filter(cell => cell.row === phantomRow && cell.group !== group && cell.options.includes(num));
                        
                        if (cellsToChange.length > 0) {
                            
                            let description = "Since the number " + num + " only appears in row " + 
                                (phantomRow + 1) + " in group " + (group + 1) + ", it was removed as a possible option in the below cells:";

                            // Remove the number from options in these cells
                            cellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(num);
                                    possibleChangeRow.push(cell.row);
                                    possibleChangeColumn.push(cell.column);
                                    possibleChangePossibleCount++;
                                }
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Row");
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Row");
                                levelOneChanges++;
                                phantomRowChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempRowPhantomChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempRowPhantomChanges += levelZeroMethods(intPuzzle, possible, isGuessAndCheck, isBruteForce);
                        }
                    }
                }
            }
        }
        changes += tempRowPhantomChanges;
    } while (tempRowPhantomChanges !== 0 && !solved);

    return changes;
}

function columnPhantomCheck(intPuzzle, possible) {
    let changes = 0;
    let tempColumnPhantomChanges = 0;

    do {
        tempColumnPhantomChanges = 0;
        
        // For each group
        for (let group = 0; group < 9 && !solved; group++) {
            
            // Get all possible cells in this group
            const groupCells = possible.filter(cell => cell.group === group);
            
            // For each number 1-9
            for (let num = 1; num <= 9 && !solved; num++) {
                // Find cells in group that could contain this number
                const cellsWithNum = groupCells.filter(cell => cell.options.includes(num));
                
                if (cellsWithNum.length > 0) {
                    // Check if all cells with this number are in the same row
                    const uniqueColumns = new Set(cellsWithNum.map(cell => cell.column));
                    
                    if (uniqueColumns.size === 1) {
                        const phantomColumn = uniqueColumns.values().next().value;
                        
                        // Get all cells in the row outside this group with num as a possible option
                        const cellsToChange = possible.filter(cell => cell.column === phantomColumn && cell.group !== group && cell.options.includes(num));
                        
                        if (cellsToChange.length > 0) {
                            
                            let description = "Since the number " + num + " only appears in column " + 
                                (phantomColumn + 1) + " in group " + (group + 1) + ", it was removed as a possible option in the below cells:";

                            // Remove the number from options in these cells
                            cellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(num);
                                    possibleChangeRow.push(cell.row);
                                    possibleChangeColumn.push(cell.column);
                                    possibleChangePossibleCount++;
                                }
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Column");
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Column");
                                levelOneChanges++;
                                phantomColumnChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempColumnPhantomChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempColumnPhantomChanges += levelZeroMethods(intPuzzle, possible, isGuessAndCheck, isBruteForce);
                        }
                    }
                }
            }
        }
        changes += tempColumnPhantomChanges;
    } while (tempColumnPhantomChanges !== 0 && !solved);

    return changes;
}

function groupPhantomCheck(intPuzzle, possible) {
    let changes = 0;
    let tempGroupPhantomChanges = 0;

    do {
        tempGroupPhantomChanges = 0;
        
        // For each row and column
        for (let rowColumn = 0; rowColumn < 9 && !solved; rowColumn++) {
            
            // Get all possible cells in this row
            const rowCells = possible.filter(cell => cell.row === rowColumn);

            // Get all possible cells in this column
            const columnCells = possible.filter(cell => cell.column === rowColumn);
            
            // For each number 1-9
            for (let num = 1; num <= 9 && !solved; num++) {
                // Find cells in row that could contain this number
                const rowCellsWithNum = rowCells.filter(cell => cell.options.includes(num));

                // Find cells in column that could contain this number
                const columnCellsWithNum = columnCells.filter(cell => cell.options.includes(num));
                
                if (rowCellsWithNum.length > 0 || columnCellsWithNum.length > 0) {
                    // Check if all row cells with this number are in the same group
                    const uniqueRowGroups = new Set(rowCellsWithNum.map(cell => cell.group));

                    // Check if all column cells with this number are in the same group
                    const uniqueColumnGroups = new Set(columnCellsWithNum.map(cell => cell.group));
                    
                    if (uniqueRowGroups.size === 1) {
                        const phantomRowGroup = uniqueRowGroups.values().next().value;
                        
                        // Get all cells in the group outside this row with num as a possible option
                        const rowCellsToChange = possible.filter(cell => cell.group === phantomRowGroup && cell.row !== rowColumn && cell.options.includes(num));

                        if (rowCellsToChange.length > 0) {
                            
                            let description = "Since the number " + num + " only appears in group " + 
                                (phantomRowGroup + 1) + " in row " + (rowColumn + 1) + ", it was removed as a possible option in the below cells:";

                            // Remove the number from options in these cells
                            rowCellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(num);
                                    possibleChangeRow.push(cell.row);
                                    possibleChangeColumn.push(cell.column);
                                    possibleChangePossibleCount++;
                                }
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Group");
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Group");
                                levelOneChanges++;
                                phantomGroupChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempGroupPhantomChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempGroupPhantomChanges += levelZeroMethods(intPuzzle, possible);
                        }
                    }

                    if (uniqueColumnGroups.size === 1 && !solved) {
                        const phantomColumnGroup = uniqueColumnGroups.values().next().value;
                        
                        // Get all cells in the group outside this column with num as a possible option
                        const columnCellsToChange = possible.filter(cell => cell.group === phantomColumnGroup && cell.column !== rowColumn && cell.options.includes(num));

                        if (columnCellsToChange.length > 0) {
                            
                            let description = "Since the number " + num + " only appears in group " + 
                                (phantomColumnGroup + 1) + " in column " + (rowColumn + 1) + ", it was removed as a possible option in the below cells:";

                            // Remove the number from options in these cells
                            columnCellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeOrder.push(possibleChangeCount);
                                    possibleChangeNumber.push(num);
                                    possibleChangeRow.push(cell.row);
                                    possibleChangeColumn.push(cell.column);
                                    possibleChangePossibleCount++;
                                }
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Phantom - Group");
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Phantom - Group");
                                levelOneChanges++;
                                phantomGroupChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempGroupPhantomChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempGroupPhantomChanges += levelZeroMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        changes += tempGroupPhantomChanges;
    } while (tempGroupPhantomChanges !== 0 && !solved);

    return changes;
}

function nakedPairChecks(intPuzzle, possible) {
    let changes = 0;
    let tempNakedPairChanges = 0;
    do {
        changes = 0;
        changes += nakedPairCheck(intPuzzle, possible, "row");
        changes += nakedPairCheck(intPuzzle, possible, "column");
        changes += nakedPairCheck(intPuzzle, possible, "group");
        tempNakedPairChanges += changes;
    } while (changes !== 0 && !solved);

    return tempNakedPairChanges;
}

function nakedPairCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempNakedPairChanges = 0;

    do {
        tempNakedPairChanges = 0;
        
        // For each row, column, or group
        for (let rowColGroup = 0; rowColGroup < 9 && !solved; rowColGroup++) {
            // Get all possible cells in this row, column, or group with exactly 2 options
            const rowColGroupCells = possible.filter(cell => cell[checkType] === rowColGroup && cell.options.length === 2);
            
            // Check for pairs of cells with identical options
            for (let i = 0; i < rowColGroupCells.length - 1 && !solved; i++) {
                for (let j = i + 1; j < rowColGroupCells.length && !solved; j++) {
                    const cell1 = rowColGroupCells[i];
                    const cell2 = rowColGroupCells[j];
                    
                    // Check if both cells have the same two options using array methods
                    if (cell1.options.every(num => cell2.options.includes(num))) {
                        // These two numbers must be in these two cells, so remove them from other cells in the row
                        const numbersToRemove = cell1.options;
                        
                        // Get all other cells in the row that aren't part of the naked pair
                        const cellsToChange = possible.filter(cell => 
                            cell[checkType] === rowColGroup && 
                            cell !== cell1 && cell !== cell2 && 
                            cell.options.some(num => numbersToRemove.includes(num))
                        );
                        
                        if (cellsToChange.length > 0) {
                            let description = "Since the numbers " + numbersToRemove[0] + " and " + numbersToRemove[1] +
                                " form a naked pair in the cells (" + (cell1.row+1) + "," + (cell1.column+1) + ") and (" +
                                (cell2.row+1) + "," + (cell2.column+1) + "), the below numbers were removed as possible options:";
                            
                            // Remove these numbers from other cells in the row
                            cellsToChange.forEach(cell => {
                                const removedNumbers = numbersToRemove.filter(num => cell.options.includes(num));
                                removedNumbers.forEach(num => {
                                    const index = cell.options.indexOf(num);
                                    cell.options.splice(index, 1);  

                                    description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + num;
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeOrder.push(possibleChangeCount);
                                        possibleChangeNumber.push(num);
                                        possibleChangeRow.push(cell.row);
                                        possibleChangeColumn.push(cell.column);
                                        possibleChangePossibleCount++;
                                    }
                                });
                            });
                            
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Naked Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1));
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Naked Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1));
                                levelOneChanges++;
                                switch (checkType) {
                                    case "row":
                                        nakedPairRowChanges++;
                                        break;
                                    case "column":
                                        nakedPairColumnChanges++;
                                        break;
                                    case "group":
                                        nakedPairGroupChanges++;
                                        break;
                                    default:
                                        break;
                                }
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempNakedPairChanges++;
                            
                            // Run previous methods to see if the puzzle can be solved
                            tempNakedPairChanges += levelZeroMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        
        changes += tempNakedPairChanges;
    } while (tempNakedPairChanges !== 0 && !solved);

    return changes;
}

function hiddenPairChecks(intPuzzle, possible) {
    let changes = 0;
    let tempHiddenPairChanges = 0;
    do {
        changes = 0;
        changes += hiddenPairCheck(intPuzzle, possible, "row");
        changes += hiddenPairCheck(intPuzzle, possible, "column");
        changes += hiddenPairCheck(intPuzzle, possible, "group");
        tempHiddenPairChanges += changes;
    } while (changes !== 0 && !solved);
    return tempHiddenPairChanges;
}

function hiddenPairCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempHiddenPairChanges = 0;

    do {
        tempHiddenPairChanges = 0;

        // For each row, column, or group
        for (let rowColGroup = 0; rowColGroup < 9 && !solved; rowColGroup++) {
            // Get all cells in this row, column, or group
            const rowColGroupCells = possible.filter(cell => cell[checkType] === rowColGroup);
            
            // Get an array of all numbers
            const allNumbers = rowColGroupCells.flatMap(cell => cell.options);

            // Get an array of all unique numbers
            const numbersInRowColGroup = new Set(allNumbers);

            // Create an array of all numbers that appear in exactly two cells
            const twoCellNumbers = Array.from(numbersInRowColGroup).filter(num => allNumbers.filter(n => n === num).length === 2).sort((a, b) => a - b);
            
            // Check for pairs of numbers that appear in exactly the same two cells
            for (let i = 0; i < twoCellNumbers.length - 1; i++) {
                for (let j = i + 1; j < twoCellNumbers.length; j++) {
                    const cellsForNum1 = rowColGroupCells.filter(cell => cell.options.includes(twoCellNumbers[i]));
                    const cellsForNum2 = rowColGroupCells.filter(cell => cell.options.includes(twoCellNumbers[j]));
                    
                    // Check if they appear in exactly the same two cells
                    const sameCells = cellsForNum1[0] === cellsForNum2[0] && cellsForNum1[1] === cellsForNum2[1] ||
                                    cellsForNum1[0] === cellsForNum2[1] && cellsForNum1[1] === cellsForNum2[0];
                        
                    if (sameCells) {
                        let description = "Since the numbers " + twoCellNumbers[i] + " and " + twoCellNumbers[j] +
                            " form a hidden pair in the cells (" + (cellsForNum1[0].row+1) + "," + (cellsForNum1[0].column+1) + ") and (" +
                            (cellsForNum1[1].row+1) + "," + (cellsForNum1[1].column+1) + "), the below numbers were removed as possible options:";
                        let changesFound = false;
                        cellsForNum1.forEach(cell => {
                            const numbersToRemove = cell.options.filter(num => num !== twoCellNumbers[i] && num !== twoCellNumbers[j]);
                            
                            if (numbersToRemove.length > 0) {
                                cell.options = [twoCellNumbers[i], twoCellNumbers[j]];
                                changesFound = true;

                                if (!isGuessAndCheck && !isBruteForce) {
                                    numbersToRemove.forEach(num => {
                                        description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                        possibleChangeOrder.push(possibleChangeCount);
                                        possibleChangeNumber.push(num);
                                        possibleChangeRow.push(cell.row);
                                        possibleChangeColumn.push(cell.column);
                                        possibleChangePossibleCount++;
                                    });
                                }
                            }
                            
                        });
                        
                        // Finish logging the change
                        if (changesFound) {
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.push("Hidden Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1));
                                possibleChangeDescription.push(description);
                                totalChangeType.push("possible");
                                totalChangeMethod.push("Hidden Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1));
                                levelOneChanges++;
                                switch (checkType) {
                                    case "row":
                                        hiddenPairRowChanges++;
                                        break;
                                    case "column":
                                        hiddenPairColumnChanges++;
                                        break;
                                    case "group":
                                        hiddenPairGroupChanges++;
                                        break;
                                    default:
                                        break;
                                }
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempHiddenPairChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempHiddenPairChanges += levelZeroMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        changes += tempHiddenPairChanges;
    } while (tempHiddenPairChanges !== 0 && !solved);

    return changes;
}
