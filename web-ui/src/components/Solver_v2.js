let solved = false;
let bruteForceSolved = false;
let isGuessAndCheck = false;
let isBruteForce = false;

// Arrays to track changes
let mainChanges = []; // For actual number placements
let possibleChanges = []; // For possible number removals
let mainPossibleChanges = []; // For possible number updates after main changes
let totalChanges = []; // For all changes

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
            if(!solved) {
                levelTwoMethods(solvePuzzle, solvePossible);
                if(!solved) {
                    levelThreeMethods(solvePuzzle, solvePossible);
                }
            }
        }
    }

    // Calculate the time it took to solve the puzzle
    const endTime = performance.now();
    const solveTime = endTime - startTime;

    // Convert the solution array to a string
    const solutionString = solvePuzzle.join('');

    // Convert changes to metrics format
    const convertedChanges = convertChangesToMetricsFormat(mainChanges, possibleChanges, mainPossibleChanges, totalChanges);

    // Create metrics object
    const metrics = {
        solved,
        solveTime,

        ...convertedChanges
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

    // Reset change tracking arrays
    mainChanges = [];
    possibleChanges = [];
    mainPossibleChanges = [];
    totalChanges = [];
}

function convertChangesToMetricsFormat(mainChanges, possibleChanges, mainPossibleChanges, totalChanges) {
    // Initialize arrays for tracking changes
    const mainChangeMethod = [];
    const mainChangeDescription = [];
    const mainChangeNumber = [];
    const mainChangeRow = [];
    const mainChangeColumn = [];

    const mainChangePossibleOrder = [];
    const mainChangePossibleNumber = [];
    const mainChangePossibleRow = [];
    const mainChangePossibleColumn = [];

    const possibleChangeMethod = [];
    const possibleChangeDescription = [];
    const possibleChangeOrder = [];
    const possibleChangeNumber = [];
    const possibleChangeRow = [];
    const possibleChangeColumn = [];

    const totalChangeType = [];
    const totalChangeMethod = [];

    // Initialize counters for each method
    let oneInARowChanges = 0;
    let oneInAColumnChanges = 0;
    let oneInAGroupChanges = 0;
    let oneInACellChanges = 0;

    let phantomRowChanges = 0;
    let phantomColumnChanges = 0;
    let phantomGroupChanges = 0;
    let nakedPairRowChanges = 0;
    let nakedPairColumnChanges = 0;
    let nakedPairGroupChanges = 0;
    let hiddenPairRowChanges = 0;
    let hiddenPairColumnChanges = 0;
    let hiddenPairGroupChanges = 0;

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

    let xyChainChanges = 0;
    let rectangleChanges = 0;
    let guessAndCheckChanges = 0;
    let bruteForceChanges = 0;

    // Process main changes
    mainChanges.forEach(change => {
        mainChangeMethod.push(change.method);
        mainChangeDescription.push(change.description);
        mainChangeNumber.push(change.number);
        mainChangeRow.push(change.row);
        mainChangeColumn.push(change.column);

        // Update method counters based on the method name
        switch (change.method) {
            case "One in a Row":
                oneInARowChanges++;
                break;
            case "One in a Column":
                oneInAColumnChanges++;
                break;
            case "One in a Group":
                oneInAGroupChanges++;
                break;
            case "One in a Cell":
                oneInACellChanges++;
                break;
        }
    });

    // Process possible changes
    possibleChanges.forEach(change => {
        possibleChangeMethod.push(change.method);
        possibleChangeDescription.push(change.description);
        change.options.forEach((option, index) => {
            possibleChangeOrder.push(change.order);
            possibleChangeNumber.push(option);
            possibleChangeRow.push(change.rows[index]);
            possibleChangeColumn.push(change.columns[index]);
        });

        // Update method counters for possible changes
        switch (change.method) {
            case "Phantom - Row":
                phantomRowChanges++;
                break;
            case "Phantom - Column":
                phantomColumnChanges++;
                break;
            case "Phantom - Group":
                phantomGroupChanges++;
                break;
            case "Naked Pair - Row":
                nakedPairRowChanges++;
                break;
            case "Naked Pair - Column":
                nakedPairColumnChanges++;
                break;
            case "Naked Pair - Group":
                nakedPairGroupChanges++;
                break;
            case "Hidden Pair - Row":
                hiddenPairRowChanges++;
                break;
            case "Hidden Pair - Column":
                hiddenPairColumnChanges++;
                break;
            case "Hidden Pair - Group":
                hiddenPairGroupChanges++;
                break;
            case "Naked Triple - Row":
                nakedTripleRowChanges++;
                break;
            case "Naked Triple - Column":
                nakedTripleColumnChanges++;
                break;
            case "Naked Triple - Group":
                nakedTripleGroupChanges++;
                break;
            case "Hidden Triple - Row":
                hiddenTripleRowChanges++;
                break;
            case "Hidden Triple - Column":
                hiddenTripleColumnChanges++;
                break;
            case "Hidden Triple - Group":
                hiddenTripleGroupChanges++;
                break;
            case "Naked Quad - Row":
                nakedQuadRowChanges++;
                break;
            case "Naked Quad - Column":
                nakedQuadColumnChanges++;
                break;
            case "Naked Quad - Group":
                nakedQuadGroupChanges++;
                break;
            case "X Wing - Row":
                xWingRowChanges++;
                break;
            case "X Wing - Column":
                xWingColumnChanges++;
                break;
            case "Y Wing - Row + Group":
                yWingRowGroupChanges++;
                break;
            case "Y Wing - Column + Group":
                yWingColumnGroupChanges++;
                break;
            case "Y Wing - Row + Column":
                yWingRowColumnChanges++;
                break;
            case "XY Chain":
                xyChainChanges++;
                break;
            case "Rectangle":
                rectangleChanges++;
                break;
            case "Guess and Check":
                guessAndCheckChanges++;
                break;
            case "Brute Force":
                bruteForceChanges++;
                break;
        }
    });

    // Process main possible changes
    mainPossibleChanges.forEach(change => {
        // For each option that was removed, create a separate entry
        change.options.forEach(option => {
            mainChangePossibleOrder.push(change.order);
            mainChangePossibleNumber.push(option);
            mainChangePossibleRow.push(change.row);
            mainChangePossibleColumn.push(change.column);
        });
    });

    // Process total changes
    totalChanges.forEach(change => {
        totalChangeType.push(change.type);
        totalChangeMethod.push(change.method);
    });

    // Calculate level totals
    const levelZeroChanges = oneInARowChanges + oneInAColumnChanges + oneInAGroupChanges + oneInACellChanges;
    const levelOneChanges = phantomRowChanges + phantomColumnChanges + phantomGroupChanges +
                          nakedPairRowChanges + nakedPairColumnChanges + nakedPairGroupChanges +
                          hiddenPairRowChanges + hiddenPairColumnChanges + hiddenPairGroupChanges;
    const levelTwoChanges = nakedTripleRowChanges + nakedTripleColumnChanges + nakedTripleGroupChanges +
                          hiddenTripleRowChanges + hiddenTripleColumnChanges + hiddenTripleGroupChanges +
                          nakedQuadRowChanges + nakedQuadColumnChanges + nakedQuadGroupChanges +
                          xWingRowChanges + xWingColumnChanges +
                          yWingRowGroupChanges + yWingColumnGroupChanges + yWingRowColumnChanges;
    const levelThreeChanges = xyChainChanges + rectangleChanges + guessAndCheckChanges + bruteForceChanges;

    return {
        mainChangeMethod,
        mainChangeDescription,
        mainChangeNumber,
        mainChangeRow,
        mainChangeColumn,
        mainChangePossibleOrder,
        mainChangePossibleNumber,
        mainChangePossibleRow,
        mainChangePossibleColumn,
        possibleChangeMethod,
        possibleChangeDescription,
        possibleChangeOrder,
        possibleChangeNumber,
        possibleChangeRow,
        possibleChangeColumn,
        totalChangeType,
        totalChangeMethod,
        mainChangeCount: mainChanges.length,
        possibleChangeCount: possibleChanges.length,
        mainChangePossibleCount: mainChangePossibleOrder.length,
        totalChangeCount: totalChanges.length,
        // Level totals
        levelZeroChanges,
        levelOneChanges,
        levelTwoChanges,
        levelThreeChanges,
        // Individual method counts
        oneInARowChanges,
        oneInAColumnChanges,
        oneInAGroupChanges,
        oneInACellChanges,
        phantomRowChanges,
        phantomColumnChanges,
        phantomGroupChanges,
        nakedPairRowChanges,
        nakedPairColumnChanges,
        nakedPairGroupChanges,
        hiddenPairRowChanges,
        hiddenPairColumnChanges,
        hiddenPairGroupChanges,
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
        xyChainChanges,
        guessAndCheckChanges,
        bruteForceChanges
    };
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
                row: cell.row,
                column: cell.column,
                options: [number]
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
                        mainChanges.push({
                            method: "One in a Row",
                            description: "The number " + num + " is only possible in row " + 
                                (cell.row + 1) + ", column " + (cell.column + 1),
                            number: String(num),
                            row: cell.row,
                            column: cell.column
                        });
                        totalChanges.push({
                            type: "main",
                            method: "One in a Row"  
                        });
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
                        mainChanges.push({
                            method: "One in a Column",
                            description: "The number " + num + " is only possible in column " + 
                                (cell.column + 1) + ", row " + (cell.row + 1),
                            number: String(num),
                            row: cell.row,
                            column: cell.column
                        });
                        totalChanges.push({
                            type: "main",
                            method: "One in a Column"
                        });
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
                        mainChanges.push({
                            method: "One in a Group",
                            description: "The number " + num + " is only possible in row " + 
                                (cell.row + 1) + ", column " + (cell.column + 1) + " in group " + (cell.group + 1),
                            number: String(num),
                            row: cell.row,
                            column: cell.column
                        });
                        totalChanges.push({
                            type: "main",
                            method: "One in a Group"
                        });
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
        oneOptionCells.forEach((cell) => {
            const cellValue = cell.options[0];
            intPuzzle[cell.row * 9 + cell.column] = cellValue;
            possible.splice(possible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);
            
            // Log the change
            if (!isGuessAndCheck && !isBruteForce) {
                mainChanges.push({
                    method: "One in a Cell",
                    description: "The number " + cellValue + " is the only possible option for cell " + 
                        (cell.row + 1) + ", column " + (cell.column + 1),
                    number: String(cellValue),
                    row: cell.row,
                    column: cell.column
                });
                totalChanges.push({
                    type: "main",
                    method: "One in a Cell"
                });
                updateSolved(intPuzzle);
            }

            updateShadowPossible(cellValue, cell, possible);
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
                            let removedNumbers = [];
                            let removedRows = [];
                            let removedColumns = [];

                            // Remove the number from options in these cells
                            cellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                removedNumbers.push(num);
                                removedRows.push(cell.row);
                                removedColumns.push(cell.column);
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "Phantom - Row",
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedNumbers,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "Phantom - Row"
                                });
                            }
                            tempRowPhantomChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempRowPhantomChanges += levelZeroMethods(intPuzzle, possible);
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
                            let removedNumbers = [];
                            let removedRows = [];
                            let removedColumns = [];


                            // Remove the number from options in these cells
                            cellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                removedNumbers.push(num);
                                removedRows.push(cell.row);
                                removedColumns.push(cell.column);
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "Phantom - Column",
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedNumbers,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "Phantom - Column"
                                });
                            }
                            tempColumnPhantomChanges++;

                            // Run previous methods to see if the puzzle can be solved
                            tempColumnPhantomChanges += levelZeroMethods(intPuzzle, possible);
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
                            let removedNumbers = [];
                            let removedRows = [];
                            let removedColumns = [];

                            // Remove the number from options in these cells
                            rowCellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                removedNumbers.push(num);   
                                removedRows.push(cell.row);
                                removedColumns.push(cell.column);
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "Phantom - Group",
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedNumbers,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "Phantom - Group"
                                });
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
                            let removedNumbers = [];
                            let removedRows = [];
                            let removedColumns = [];

                            // Remove the number from options in these cells
                            columnCellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                removedNumbers.push(num);
                                removedRows.push(cell.row);
                                removedColumns.push(cell.column);
                                description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "Phantom - Group",
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedNumbers,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "Phantom - Group"
                                });
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
            
            if (rowColGroupCells.length < 2) {
                continue;
            }

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
                            let removedOptions = [];
                            let removedRows = [];
                            let removedColumns = [];
                            
                            // Remove these numbers from other cells in the row
                            cellsToChange.forEach(cell => {
                                const removedNumbers = numbersToRemove.filter(num => cell.options.includes(num));
                                removedNumbers.forEach(num => {
                                    const index = cell.options.indexOf(num);
                                    cell.options.splice(index, 1);  
                                    removedOptions.push(num);
                                    removedRows.push(cell.row);
                                    removedColumns.push(cell.column);
                                    description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + num;
                                });
                            });
                            
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "Naked Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedOptions,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "Naked Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                });
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
            
            if (twoCellNumbers.length < 2) {
                continue;
            }

            // Check for pairs of numbers that appear in exactly the same two cells
            for (let i = 0; i < twoCellNumbers.length - 1 && !solved; i++) {
                for (let j = i + 1; j < twoCellNumbers.length && !solved; j++) {
                    const cellsForNum1 = rowColGroupCells.filter(cell => cell.options.includes(twoCellNumbers[i]));
                    const cellsForNum2 = rowColGroupCells.filter(cell => cell.options.includes(twoCellNumbers[j]));
                    
                    // Check if they appear in exactly the same two cells
                    const sameCells = cellsForNum1[0] === cellsForNum2[0] && cellsForNum1[1] === cellsForNum2[1] ||
                                    cellsForNum1[0] === cellsForNum2[1] && cellsForNum1[1] === cellsForNum2[0];
                        
                    if (sameCells) {
                        let description = "Since the numbers " + twoCellNumbers[i] + " and " + twoCellNumbers[j] +
                            " form a hidden pair in the cells (" + (cellsForNum1[0].row+1) + "," + (cellsForNum1[0].column+1) + ") and (" +
                            (cellsForNum1[1].row+1) + "," + (cellsForNum1[1].column+1) + "), the below numbers were removed as possible options:";
                        let removedOptions = [];
                        let removedRows = [];
                        let removedColumns = [];
                        let changesFound = false;
                        cellsForNum1.forEach(cell => {
                            const numbersToRemove = cell.options.filter(num => num !== twoCellNumbers[i] && num !== twoCellNumbers[j]);
                            
                            if (numbersToRemove.length > 0) {
                                cell.options = [twoCellNumbers[i], twoCellNumbers[j]];
                                changesFound = true;

                                if (!isGuessAndCheck && !isBruteForce) {
                                    numbersToRemove.forEach(num => {
                                        description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                        removedOptions.push(num);
                                        removedRows.push(cell.row);
                                        removedColumns.push(cell.column);
                                    });
                                }
                            }
                            
                        });
                        
                        // Finish logging the change
                        if (changesFound) {
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "Hidden Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedOptions,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "Hidden Pair - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                });
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

function levelTwoMethods(intPuzzle, possible) {
    let changes = 0;
    let tempLevelTwoChanges = 0;
    do {
        changes = 0;
        changes += nakedTripleChecks(intPuzzle, possible);
        changes += hiddenTripleChecks(intPuzzle, possible);
        changes += nakedQuadChecks(intPuzzle, possible);
        changes += xWingChecks(intPuzzle, possible);
        changes += yWingChecks(intPuzzle, possible);
        tempLevelTwoChanges += changes;
    } while (changes !== 0 && !solved);
    return tempLevelTwoChanges;
}

function nakedTripleChecks(intPuzzle, possible) {
    let changes = 0;
    let tempNakedTripleChanges = 0;
    do {
        changes = 0;
        changes += nakedTripleCheck(intPuzzle, possible, "row");
        changes += nakedTripleCheck(intPuzzle, possible, "column");
        changes += nakedTripleCheck(intPuzzle, possible, "group");
        tempNakedTripleChanges += changes;
    } while (changes !== 0 && !solved);
    return tempNakedTripleChanges;
}

function nakedTripleCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempNakedTripleChanges = 0;

    do {
        tempNakedTripleChanges = 0;
        
        // For each row, column, or group
        for (let rowColGroup = 0; rowColGroup < 9 && !solved; rowColGroup++) {
            // Get all possible cells in this row, column, or group with 3 or less options
            const rowColGroupCells = possible.filter(cell => cell[checkType] === rowColGroup && cell.options.length <= 3);
            
            if (rowColGroupCells.length < 3) {
                continue;
            }

            // Check for triples of cells with identical options
            for (let i = 0; i < rowColGroupCells.length - 2 && !solved; i++) {
                for (let j = i + 1; j < rowColGroupCells.length - 1 && !solved; j++) {
                    for (let k = j + 1; k < rowColGroupCells.length && !solved; k++) {
                        const cell1 = rowColGroupCells[i];
                        const cell2 = rowColGroupCells[j];
                        const cell3 = rowColGroupCells[k];

                        const uniqueOptions = new Set([...cell1.options, ...cell2.options, ...cell3.options]);
                        
                        // Check if all three cells have the same three options using array methods
                        if (uniqueOptions.size === 3) {
                            // The three numbers in uniqueOptions must be in these three cells, so remove them from other cells in the row
                            const numbersToRemove = Array.from(uniqueOptions).sort((a, b) => a - b);
                            
                            // Get all other cells in the row that aren't part of the naked triple
                            const cellsToChange = possible.filter(cell => 
                                cell[checkType] === rowColGroup && 
                                cell !== cell1 && cell !== cell2 && cell !== cell3 && 
                                cell.options.some(num => numbersToRemove.includes(num))
                            );
                        
                            if (cellsToChange.length > 0) {
                                let description = "Since the numbers " + numbersToRemove[0] + ", " + numbersToRemove[1] + ", and " + numbersToRemove[2] +
                                    " form a naked triple in the cells (" + (cell1.row+1) + "," + (cell1.column+1) + "), (" + (cell2.row+1) + "," + (cell2.column+1) + "), and (" +
                                    (cell3.row+1) + "," + (cell3.column+1) + "), the below numbers were removed as possible options:";
                                let removedOptions = [];
                                let removedRows = [];
                                let removedColumns = [];
                                
                                // Remove these numbers from other cells in the row, column, or group
                                cellsToChange.forEach(cell => {
                                    const removedNumbers = numbersToRemove.filter(num => cell.options.includes(num));
                                    removedNumbers.forEach(num => {
                                        const index = cell.options.indexOf(num);
                                        cell.options.splice(index, 1);  
                                        removedOptions.push(num);
                                        removedRows.push(cell.row);
                                        removedColumns.push(cell.column);
                                        description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + num;
                                    });
                                });
                                
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChanges.push({
                                        method: "Naked Triple - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                        order: possibleChanges.length,
                                        description: description,
                                        options: removedOptions,
                                        rows: removedRows,
                                        columns: removedColumns
                                    });
                                    totalChanges.push({
                                        type: "possible",
                                        method: "Naked Triple - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                    });
                                }
                                tempNakedTripleChanges++;
                                
                                // Run previous methods to see if the puzzle can be solved
                                tempNakedTripleChanges += levelZeroMethods(intPuzzle, possible);
                                if (!solved) {
                                    tempNakedTripleChanges += levelOneMethods(intPuzzle, possible);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempNakedTripleChanges;
    } while (tempNakedTripleChanges !== 0 && !solved);

    return changes;
}

function hiddenTripleChecks(intPuzzle, possible) {
    let changes = 0;
    let tempHiddenTripleChanges = 0;
    do {
        changes = 0;
        changes += hiddenTripleCheck(intPuzzle, possible, "row");
        changes += hiddenTripleCheck(intPuzzle, possible, "column");
        changes += hiddenTripleCheck(intPuzzle, possible, "group");
        tempHiddenTripleChanges += changes;
    } while (changes !== 0 && !solved);
    return tempHiddenTripleChanges;
}

function hiddenTripleCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempHiddenTripleChanges = 0;

    do {
        tempHiddenTripleChanges = 0;

        // For each row, column, or group
        for (let rowColGroup = 0; rowColGroup < 9 && !solved; rowColGroup++) {
            // Get all cells in this row, column, or group
            const rowColGroupCells = possible.filter(cell => cell[checkType] === rowColGroup);
            
            // Get an array of all numbers
            const allNumbers = rowColGroupCells.flatMap(cell => cell.options);

            // Get an array of all unique numbers
            const numbersInRowColGroup = new Set(allNumbers);

            // Create an array of all numbers that appear in exactly two or three cells
            const twoOrThreeCellNumbers = Array.from(numbersInRowColGroup).filter(num => allNumbers.filter(n => n === num).length === 2 || allNumbers.filter(n => n === num).length === 3).sort((a, b) => a - b);
            
            if (twoOrThreeCellNumbers.length < 3) {
                continue;
            }

            // Check for pairs of numbers that appear in exactly the same two cells
            for (let i = 0; i < twoOrThreeCellNumbers.length - 2 && !solved; i++) {
                for (let j = i + 1; j < twoOrThreeCellNumbers.length - 1 && !solved; j++) {
                    for (let k = j + 1; k < twoOrThreeCellNumbers.length && !solved; k++) {
                        const currentNums = [twoOrThreeCellNumbers[i], twoOrThreeCellNumbers[j], twoOrThreeCellNumbers[k]].sort((a, b) => a - b);

                        // Get the cells that contain the numbers
                        const cellsWithNumbers = rowColGroupCells.filter(cell => cell.options.some(num => currentNums.includes(num)));
                        if (cellsWithNumbers.length === 3) {
                            let description = "Since the numbers " + currentNums[0] + ", " + currentNums[1] + ", and " + currentNums[2] +
                                " form a hidden triple in the cells (" + (cellsWithNumbers[0].row+1) + "," + (cellsWithNumbers[0].column+1) + "), (" + (cellsWithNumbers[1].row+1) + "," + (cellsWithNumbers[1].column+1) + "), and (" +
                                (cellsWithNumbers[2].row+1) + "," + (cellsWithNumbers[2].column+1) + "), the below numbers were removed as possible options:";
                            let removedOptions = [];
                            let removedRows = [];
                            let removedColumns = [];
                            let changesFound = false;
                            cellsWithNumbers.forEach(cell => {
                                const numbersToRemove = cell.options.filter(num => !currentNums.includes(num));
                                
                                if (numbersToRemove.length > 0) {
                                    cell.options = cell.options.filter(num => currentNums.includes(num));
                                    changesFound = true;

                                    if (!isGuessAndCheck && !isBruteForce) {
                                        numbersToRemove.forEach(num => {
                                            description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                            removedOptions.push(num);
                                            removedRows.push(cell.row);
                                            removedColumns.push(cell.column);
                                        });
                                    }
                                }
                                
                            });
                            
                            // Finish logging the change
                            if (changesFound) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChanges.push({
                                        method: "Hidden Triple - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                        order: possibleChanges.length,
                                        description: description,
                                        options: removedOptions,
                                        rows: removedRows,
                                        columns: removedColumns
                                    });
                                    totalChanges.push({
                                        type: "possible",
                                        method: "Hidden Triple - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                    });
                                }
                                tempHiddenTripleChanges++;

                                // Run previous methods to see if the puzzle can be solved
                                tempHiddenTripleChanges += levelZeroMethods(intPuzzle, possible);
                                if (!solved) {
                                    tempHiddenTripleChanges += levelOneMethods(intPuzzle, possible);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempHiddenTripleChanges;
    } while (tempHiddenTripleChanges !== 0 && !solved);

    return changes;
}

function nakedQuadChecks(intPuzzle, possible) {
    let changes = 0;
    let tempNakedQuadChanges = 0;
    do {
        changes = 0;
        changes += nakedQuadCheck(intPuzzle, possible, "row");
        changes += nakedQuadCheck(intPuzzle, possible, "column");
        changes += nakedQuadCheck(intPuzzle, possible, "group");
        tempNakedQuadChanges += changes;
    } while (changes !== 0 && !solved);
    return tempNakedQuadChanges;
}

function nakedQuadCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempNakedQuadChanges = 0;

    do {
        tempNakedQuadChanges = 0;
        
        // For each row, column, or group
        for (let rowColGroup = 0; rowColGroup < 9 && !solved; rowColGroup++) {
            // Get all possible cells in this row, column, or group with 4 or less options
            const rowColGroupCells = possible.filter(cell => cell[checkType] === rowColGroup && cell.options.length <= 4);
            
            if (rowColGroupCells.length < 4) {
                continue;
            }

            // Check for triples of cells with identical options
            for (let i = 0; i < rowColGroupCells.length - 3 && !solved; i++) {
                for (let j = i + 1; j < rowColGroupCells.length - 2 && !solved; j++) {
                    for (let k = j + 1; k < rowColGroupCells.length - 1 && !solved; k++) {
                        for (let l = k + 1; l < rowColGroupCells.length && !solved; l++) {
                            const cell1 = rowColGroupCells[i];
                            const cell2 = rowColGroupCells[j];
                            const cell3 = rowColGroupCells[k];
                            const cell4 = rowColGroupCells[l];

                            const uniqueOptions = new Set([...cell1.options, ...cell2.options, ...cell3.options, ...cell4.options]);
                        
                            // Check if all four cells have the same four options using array methods
                            if (uniqueOptions.size === 4) {
                                // The four numbers in uniqueOptions must be in these four cells, so remove them from other cells in the row
                                const numbersToRemove = Array.from(uniqueOptions).sort((a, b) => a - b);
                            
                                // Get all other cells in the row that aren't part of the naked quad
                                const cellsToChange = possible.filter(cell => 
                                    cell[checkType] === rowColGroup && 
                                    cell !== cell1 && cell !== cell2 && cell !== cell3 && cell !== cell4 && 
                                    cell.options.some(num => numbersToRemove.includes(num))
                                );
                        
                                if (cellsToChange.length > 0) {
                                    let description = "Since the numbers " + numbersToRemove[0] + ", " + numbersToRemove[1] + ", " + numbersToRemove[2] + ", and " + numbersToRemove[3] +
                                        " form a naked quad in the cells (" + (cell1.row+1) + "," + (cell1.column+1) + "), (" + (cell2.row+1) + "," + (cell2.column+1) + "), (" + (cell3.row+1) + "," + (cell3.column+1) + "), and (" +
                                        (cell4.row+1) + "," + (cell4.column+1) + "), the below numbers were removed as possible options:";
                                    let removedOptions = [];
                                    let removedRows = [];
                                    let removedColumns = [];
                                    
                                    // Remove these numbers from other cells in the row, column, or group
                                    cellsToChange.forEach(cell => {
                                        const removedNumbers = numbersToRemove.filter(num => cell.options.includes(num));
                                        removedNumbers.forEach(num => {
                                            const index = cell.options.indexOf(num);
                                            cell.options.splice(index, 1);  
                                            removedOptions.push(num);
                                            removedRows.push(cell.row);
                                            removedColumns.push(cell.column);
                                            description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + num;
                                        });
                                    });
                                    
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChanges.push({
                                            method: "Naked Quad - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                            order: possibleChanges.length,
                                            description: description,
                                            options: removedOptions,
                                            rows: removedRows,
                                            columns: removedColumns
                                        });
                                        totalChanges.push({
                                            type: "possible",
                                            method: "Naked Quad - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                        });
                                    }
                                    tempNakedQuadChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempNakedQuadChanges += levelZeroMethods(intPuzzle, possible);
                                    if (!solved) {
                                        tempNakedQuadChanges += levelOneMethods(intPuzzle, possible);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempNakedQuadChanges;
    } while (tempNakedQuadChanges !== 0 && !solved);

    return changes;
}

function xWingChecks(intPuzzle, possible) {
    let changes = 0;
    let tempXWingChanges = 0;
    do {
        changes = 0;
        changes += xWingCheck(intPuzzle, possible, "row");
        changes += xWingCheck(intPuzzle, possible, "column");
        tempXWingChanges += changes;
    } while (changes !== 0 && !solved);
    return tempXWingChanges;
}

function xWingCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempXWingChanges = 0;

    do {
        tempXWingChanges = 0;
        const otherCheckType = checkType === 'row' ? 'column' : 'row';

        // For each number 1-9
        for (let num = 1; num <= 9 && !solved; num++) {
            // Track which rows/columns have this number as a possibility
            const numLocations = [];
            
            // For each row/column
            for (let rowCol = 0; rowCol < 9; rowCol++) {
                // Get cells in this row/column that could contain the number
                const cellsWithNum = possible.filter(cell => 
                    cell[checkType] === rowCol && 
                    cell.options.includes(num)
                );
                
                if (cellsWithNum.length === 2) {
                    // Store the row/column and the two positions where the number could be
                    numLocations.push({
                        rowCol,
                        positions: cellsWithNum.map(cell => cell[otherCheckType]).sort((a, b) => a - b)
                    });
                }
            }

            if (numLocations.length < 2) {
                continue;
            }

            // Look for pairs of rows/columns that have the number in the same two positions
            for (let i = 0; i < numLocations.length - 1 && !solved; i++) {
                for (let j = i + 1; j < numLocations.length && !solved; j++) {
                    const loc1 = numLocations[i];
                    const loc2 = numLocations[j];

                    const positionsSet = new Set([...loc1.positions, ...loc2.positions]);
                    
                    // Check if the positions match exactly
                    if (positionsSet.size === 2) {
                        // We found an X-Wing! Now remove the number from other cells in those positions
                        const positions = Array.from(positionsSet).sort((a, b) => a - b);
                        const rowCols = [loc1.rowCol, loc2.rowCol].sort((a, b) => a - b);
                        
                        let description = "Since the number " + (num) + ` forms an X Wing in the ${checkType}s ` + 
                            (rowCols[0]+1) + " and " + (rowCols[1]+1) + `, ${otherCheckType}s ` + (positions[0]+1) + 
                            " and " + (positions[1]+1) + 
                            ", it was removed from the below cells as a possible option:";
                        let removedOptions = [];
                        let removedRows = [];
                        let removedColumns = [];
                        
                        // Remove the number from other cells in those positions
                        const cellsToChange = possible.filter(cell => 
                            !rowCols.includes(cell[checkType]) && 
                            positions.includes(cell[otherCheckType]) &&
                            cell.options.includes(num)
                        );

                        if (cellsToChange.length > 0) {
                            cellsToChange.forEach(cell => {
                                const index = cell.options.indexOf(num);
                                cell.options.splice(index, 1);
                                
                                removedOptions.push(num);
                                removedRows.push(cell.row);
                                removedColumns.push(cell.column);
                                description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + num;
                            });

                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChanges.push({
                                    method: "X Wing - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                    order: possibleChanges.length,
                                    description: description,
                                    options: removedOptions,
                                    rows: removedRows,
                                    columns: removedColumns
                                });
                                totalChanges.push({
                                    type: "possible",
                                    method: "X Wing - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                });
                            }
                            tempXWingChanges++;
                            
                            // Run previous methods to see if the puzzle can be solved
                            tempXWingChanges += levelZeroMethods(intPuzzle, possible);
                            if (!solved) {
                                tempXWingChanges += levelOneMethods(intPuzzle, possible);
                            }
                        }
                    }
                }
            }
        }
        changes += tempXWingChanges;
    } while (tempXWingChanges !== 0 && !solved);

    return changes;
}

function yWingChecks(intPuzzle, possible) {
    let changes = 0;
    let tempYWingChanges = 0;
    do {
        changes = 0;
        changes += yWingCheck(intPuzzle, possible, "row", "column");
        changes += yWingCheck(intPuzzle, possible, "row", "group");
        changes += yWingCheck(intPuzzle, possible, "column", "group");
        tempYWingChanges += changes;
    } while (changes !== 0 && !solved);
    return tempYWingChanges;
}

function yWingCheck(intPuzzle, possible, wing1, wing2) {
    let changes = 0;
    let tempYWingChanges = 0;

    do {
        tempYWingChanges = 0;
        
        // Find all cells with exactly two options
        const twoOptionCells = possible.filter(cell => cell.options.length === 2);
        
        if (twoOptionCells.length < 3) continue;

        // Try each two-option cell as the pivot
        for (const pivot of twoOptionCells) {
            if (solved) break;

            // Get cells in wing1 that share a row/column/group with pivot and have two options
            const wing1Cells = twoOptionCells.filter(cell => 
                cell !== pivot &&
                cell[wing1] === pivot[wing1]
            );
            if (wing1Cells.length < 1) continue;

            // Get cells in wing2 that share a row/column/group with pivot and have two options
            const wing2Cells = twoOptionCells.filter(cell => 
                cell !== pivot &&
                cell[wing2] === pivot[wing2]
            );
            if (wing2Cells.length < 1) continue;

            // Try each combination of wing1 and wing2 cells
            for (const wing1Cell of wing1Cells) {
                if (solved) break;
                for (const wing2Cell of wing2Cells) {
                    if (solved) break;
                    // Skip if wings are the same cell
                    if (wing1Cell === wing2Cell) continue;
                    
                    // Get the shared number between pivot and each wing
                    const pivotWing1Shared = pivot.options.filter(num => wing1Cell.options.includes(num));
                    const pivotWing2Shared = pivot.options.filter(num => wing2Cell.options.includes(num));
                    
                    // Skip if pivot doesn't share exactly one number with each wing OR if the shared number is the same as the pivot number
                    if (pivotWing1Shared.length !== 1 || pivotWing2Shared.length !== 1 || pivotWing1Shared[0] === pivotWing2Shared[0]) continue;
                    
                    // Get the shared number between the wings
                    const wingShared = wing1Cell.options.filter(num => wing2Cell.options.includes(num));
                    
                    // Skip if wings don't share exactly one number
                    if (wingShared.length !== 1) continue;
                    
                    const sharedNumber = wingShared[0];
                    
                    // Find cells that see both wings and could have the shared number eliminated
                    const cellsToChange = possible.filter(cell => 
                        cell !== wing1Cell && 
                        cell !== wing2Cell && 
                        cell.options.includes(sharedNumber) &&
                        (
                            (cell[wing1] === wing1Cell[wing1] && cell[wing2] === wing2Cell[wing2]) ||
                            (cell[wing1] === wing2Cell[wing1] && cell[wing2] === wing1Cell[wing2])
                        )
                    );
                    
                    if (cellsToChange.length > 0) {
                        const sortedNumbers = [pivot.options[0], pivot.options[1], sharedNumber].sort((a, b) => a - b);
                        let description = "Since the numbers " + sortedNumbers[0] + ", " + sortedNumbers[1] + ", and " + sortedNumbers[2] +
                            " form a Y Wing with the pivot at (" + (pivot.row+1) + "," + (pivot.column+1) + `), the ${wing1} wing at (` + 
                            (wing1Cell.row+1) + "," + (wing1Cell.column+1) + `), and the ${wing2} wing at (` + 
                            (wing2Cell.row+1) + "," + (wing2Cell.column+1) + `), the number ` + sharedNumber + 
                            " was removed from the below cells as a possible option:";
                        let removedOptions = [];
                        let removedRows = [];
                        let removedColumns = [];
                        
                        // Remove the shared number from the affected cells
                        cellsToChange.forEach(cell => {
                            const index = cell.options.indexOf(sharedNumber);
                            cell.options.splice(index, 1);
                            
                            removedOptions.push(sharedNumber);
                            removedRows.push(cell.row);
                            removedColumns.push(cell.column);
                            description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + sharedNumber;
                        });
                        
                        if (!isGuessAndCheck && !isBruteForce) {
                            possibleChanges.push({
                                method: "Y Wing - " + wing1.charAt(0).toUpperCase() + wing1.slice(1) + " + " + wing2.charAt(0).toUpperCase() + wing2.slice(1),
                                order: possibleChanges.length,
                                description: description,
                                options: removedOptions,
                                rows: removedRows,
                                columns: removedColumns
                            });
                            totalChanges.push({
                                type: "possible",
                                method: "Y Wing - " + wing1.charAt(0).toUpperCase() + wing1.slice(1) + " + " + wing2.charAt(0).toUpperCase() + wing2.slice(1)
                            });
                        }
                        tempYWingChanges++;
                        
                        // Run previous methods to see if the puzzle can be solved
                        tempYWingChanges += levelZeroMethods(intPuzzle, possible);
                        if (!solved) {
                            tempYWingChanges += levelOneMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        changes += tempYWingChanges;
    } while (tempYWingChanges !== 0 && !solved);

    return changes;
}

function levelThreeMethods(intPuzzle, possible) {
    let changes = 0;
    let tempLevelThreeChanges = 0;

    do {
        tempLevelThreeChanges = 0;
        changes += xyChainCheck(intPuzzle, possible);
        changes += rectangleCheck(intPuzzle, possible);
        
    } while (tempLevelThreeChanges !== 0 && !solved);

    return changes;
}

function xyChainCheck(intPuzzle, possible) {
    let changes = 0;
    let tempXYChainChanges = 0;
    
    do {
        tempXYChainChanges = 0;

        // Find all cells with exactly two options
        const twoOptionCells = possible.filter(cell => cell.options.length === 2);
        
        // Try each two-option cell as the chain start
        for (const chainStart of twoOptionCells) {
            if (solved) break;
            
            for (const targetNumber of chainStart.options) {
                if (solved) break;
                
                const otherNumber = chainStart.options.find(num => num !== targetNumber);

                const result = xyChain(possible, twoOptionCells, chainStart, [chainStart], targetNumber, otherNumber);
                
                if (result) {
                    const { chain, cellsToChange } = result;
                    
                    let description = "Since there is an XY Chain with the path: ";
                    // Add each cell in the chain to the description
                    for (let i = 0; i < chain.length - 1; i++) {
                        description += "(" + (chain[i].row+1) + "," + (chain[i].column+1) + ") -> ";
                    }
                    description += "(" + (chain[chain.length-1].row+1) + "," + (chain[chain.length-1].column+1) + 
                        "), the number " + targetNumber + " was removed from the below cells as a possible option:";
                    
                    let removedOptions = [];
                    let removedRows = [];
                    let removedColumns = [];
                    
                    // Remove the number from the affected cells
                    cellsToChange.forEach(cell => {
                        const index = cell.options.indexOf(targetNumber);
                        cell.options.splice(index, 1);
                        
                        removedOptions.push(targetNumber);
                        removedRows.push(cell.row);
                        removedColumns.push(cell.column);
                        description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + targetNumber;
                    });
                    
                    if (!isGuessAndCheck && !isBruteForce) {
                        possibleChanges.push({
                            method: "XY Chain",
                            order: possibleChanges.length,
                            description: description,
                            options: removedOptions,
                            rows: removedRows,
                            columns: removedColumns
                        });
                        totalChanges.push({
                            type: "possible",
                            method: "XY Chain"
                        });
                    }
                    tempXYChainChanges++;
                    
                    // Run previous methods to see if the puzzle can be solved
                    tempXYChainChanges += levelZeroMethods(intPuzzle, possible);
                    if (!solved) {
                        tempXYChainChanges += levelOneMethods(intPuzzle, possible);
                        if (!solved) {
                            tempXYChainChanges += levelTwoMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        
    } while (tempXYChainChanges !== 0 && !solved);

    return changes;
}

function xyChain(possible, twoOptionCells, currentCell, chain, targetNumber, otherNumber) {
    // Get cells that share a row, column, or group with currentCell
    // and are not already in the chain
    // and have the other number in their options
    const cellsWithOtherNumber = twoOptionCells.filter(cell => 
        !chain.includes(cell) && 
        (cell.row === currentCell.row || 
         cell.column === currentCell.column || 
         cell.group === currentCell.group) &&
        cell.options.includes(otherNumber)
    );

    // If there are no cells with the other number, return null
    if (cellsWithOtherNumber.length === 0) return null;

    // For each connected cell
    for (const nextCell of cellsWithOtherNumber) {
        const nextOtherNumber = nextCell.options.find(num => num !== otherNumber);

        // Check if nextOtherNumber is targetNumber
        if (nextOtherNumber === targetNumber) {
            // We found a chain! Now check for cells that see both ends
            const cellsToChange = possible.filter(p => 
                p !== chain[0] && 
                p !== nextCell && 
                p.options.includes(targetNumber) &&
                (
                    (p.row === chain[0].row || p.column === chain[0].column || p.group === chain[0].group) &&
                    (p.row === nextCell.row || p.column === nextCell.column || p.group === nextCell.group)
                )
            );

            if (cellsToChange.length > 0) {
                return {
                    chain: [...chain, nextCell],
                    cellsToChange
                };
            }
        }

        // Recursively try to extend the chain
        const result = xyChain(possible, twoOptionCells, nextCell, [...chain, nextCell], targetNumber, nextOtherNumber);
        if (result) {
            return result;
        }
    }

    // If we get here, no valid chain was found
    return null;
}

function rectangleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempRectangleChanges = 0;

    do {
        tempRectangleChanges = 0;

        const groupCombinations = [
            [0, 1, 3, 4],
            [0, 1, 6, 7],
            [0, 2, 3, 5],
            [0, 2, 6, 8],
            [1, 2, 4, 5],
            [3, 4, 6, 7],
            [4, 5, 7, 8],
            [0, 2, 3, 5],
            [3, 5, 6, 8]
        ];

        // For each group combination
        for (const groups of groupCombinations) {
            if (solved) break;
            // For each number 1-9
            for (let num = 1; num <= 9 && !solved; num++) {
                // Get all cells containing this number and are in the groups
                const cellsWithNum = possible.filter(cell => cell.options.includes(num) && groups.includes(cell.group));

                // Skip if not enough cells to form a rectangle
                if (cellsWithNum.length < 4) continue;
                
                // Get the groups that these cells are in
                const uniqueGroups = [...new Set(cellsWithNum.map(cell => cell.group))].sort((a, b) => a - b);

                // Skip if not exactly 4 unique groups
                if (uniqueGroups.length !== 4) continue;

                

                // Count cells in each row and column
                const rowCounts = new Array(9).fill(0);
                const colCounts = new Array(9).fill(0);
                cellsWithNum.forEach(cell => {
                    rowCounts[cell.row]++;
                    colCounts[cell.column]++;
                });

                // Find rows and columns with multiple cells
                const rowsWithMultiple = rowCounts
                    .map((count, index) => ({ count, index }))
                    .filter(({ count }) => count > 1)
                    .map(({ index }) => index)
                    .sort((a, b) => a - b);

                const colsWithMultiple = colCounts
                    .map((count, index) => ({ count, index }))
                    .filter(({ count }) => count > 1)
                    .map(({ index }) => index)
                    .sort((a, b) => a - b);

                // Skip if we don't have exactly 2 rows and 2 columns with multiple cells
                if (rowsWithMultiple.length !== 2 || colsWithMultiple.length !== 2) continue;

                // Check if the rows and columns with multiple cells are the outer most rows and columns
                const smallestRow = rowCounts.findIndex(count => count > 0);
                const largestRow = rowCounts.length - 1 - [...rowCounts].reverse().findIndex(count => count > 0);
                const smallestCol = colCounts.findIndex(count => count > 0);
                const largestCol = colCounts.length - 1 - [...colCounts].reverse().findIndex(count => count > 0);

                if (rowsWithMultiple[0] !== smallestRow || rowsWithMultiple[1] !== largestRow ||
                    colsWithMultiple[0] !== smallestCol || colsWithMultiple[1] !== largestCol) continue;

                // Check that each group has at least 2 unique rows and 2 unique columns and they all appear in the outer most rows and columns
                const groupsValid = uniqueGroups.every(group => {
                    const groupCells = cellsWithNum.filter(cell => cell.group === group);
                    const uniqueRows = new Set(groupCells.map(cell => cell.row));
                    const uniqueCols = new Set(groupCells.map(cell => cell.column));
                    
                    // Check for minimum unique rows and columns
                    if (uniqueRows.size < 2 || uniqueCols.size < 2) return false;
                    
                    // Check that all cells in this group fall within the outer rows and columns
                    return groupCells.every(cell => 
                        (cell.row === smallestRow || cell.row === largestRow) &&
                        (cell.column === smallestCol || cell.column === largestCol)
                    );
                });

                if (!groupsValid) continue;

                // Find cells that are in the corners of the rectangle
                const cellsToChange = cellsWithNum.filter(cell => 
                    rowsWithMultiple.includes(cell.row) && 
                    colsWithMultiple.includes(cell.column)
                );

                if (cellsToChange.length > 0) {
                    console.log("** Rectangle found **");
                    let description = "Since the number " + num + " forms a rectangle in groups " + 
                        (groups[0] + 1) + ", " + (groups[1] + 1) + ", " + (groups[2] + 1) + ", and " + (groups[3] + 1) +
                        " across rows " + (rowsWithMultiple[0] + 1) + " through " + (rowsWithMultiple[rowsWithMultiple.length-1] + 1) + 
                        ", columns " + (colsWithMultiple[0] + 1) + " through " + (colsWithMultiple[colsWithMultiple.length-1] + 1) +
                        ", it was removed from the below cells as a possible option:";
                    let removedOptions = [];
                    let removedRows = [];
                    let removedColumns = [];

                    // Remove the number from the affected cells
                    cellsToChange.forEach(cell => {
                        const index = cell.options.indexOf(num);
                        cell.options.splice(index, 1);
                        
                        removedOptions.push(num);
                        removedRows.push(cell.row);
                        removedColumns.push(cell.column);
                        description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + num;
                    });

                    if (!isGuessAndCheck && !isBruteForce) {
                        possibleChanges.push({
                            method: "Rectangle",
                            order: possibleChanges.length,
                            description: description,
                            options: removedOptions,
                            rows: removedRows,
                            columns: removedColumns
                        });
                        totalChanges.push({
                            type: "possible",
                            method: "Rectangle"
                        });
                    }
                    tempRectangleChanges++;

                    // Run previous methods to see if the puzzle can be solved
                    tempRectangleChanges += levelZeroMethods(intPuzzle, possible);
                    if (!solved) {
                        tempRectangleChanges += levelOneMethods(intPuzzle, possible);
                        if (!solved) {
                            tempRectangleChanges += levelTwoMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        changes += tempRectangleChanges;
    } while (tempRectangleChanges !== 0 && !solved);

    return changes;
}



