let solved = false;
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
                    if (!solved) {
                        levelFourMethods(solvePuzzle, solvePossible);
                    }
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
        difficulty: calculateDifficulty(convertedChanges),

        ...convertedChanges
    };

    return {
        metrics,
        solution: solutionString,
    };
}

function resetMetrics() {
    solved = false;
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
    let swordfishRowChanges = 0;
    let swordfishColumnChanges = 0;
    let jellyfishRowChanges = 0;
    let jellyfishColumnChanges = 0;

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
            default:
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
            case "Swordfish - Row":
                swordfishRowChanges++;
                break;
            case "Swordfish - Column":
                swordfishColumnChanges++;
                break;
            case "Jellyfish - Row":
                jellyfishRowChanges++;
                break;
            case "Jellyfish - Column":
                jellyfishColumnChanges++;
                break;
            case "Guess and Check - Solved":
            case "Guess and Check - Contradiction":
            case "Guess and Check - Same Number":
                guessAndCheckChanges++;
                break;
            case "Brute Force":
                bruteForceChanges++;
                break;
            default:
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
    const levelThreeChanges = xyChainChanges + rectangleChanges + swordfishRowChanges + swordfishColumnChanges +
                             jellyfishRowChanges + jellyfishColumnChanges;
    const levelFourChanges = guessAndCheckChanges + bruteForceChanges;

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
        levelFourChanges,
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
        rectangleChanges,
        swordfishRowChanges,
        swordfishColumnChanges,
        jellyfishRowChanges,
        jellyfishColumnChanges,
        guessAndCheckChanges,
        bruteForceChanges
    };
}

function calculateDifficulty(metrics) {
    if (metrics.levelFourChanges > 0) {
        return "Impossible";
    }
    if (metrics.levelThreeChanges > 0) {
        return "Expert";
    }
    if (metrics.levelTwoChanges > 0) {
        return "Hard";
    }
    if (metrics.levelOneChanges > 0) {
        return "Intermediate";
    }
    if (metrics.levelZeroChanges > 0) {
        return "Easy";
    }
    return null;
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

function isValid(possible) {
    return possible.every(cell => cell.options.length > 0);
}
function updateSolved(intPuzzle) {
    solved = isSolved(intPuzzle);
}

function levelZeroMethods(intPuzzle, possible) {
    let changes;
    let tempLevelZeroChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += oneInARowPossibleCheck(intPuzzle, possible);
        changes += oneInAColumnPossibleCheck(intPuzzle, possible);
        changes += oneInAGroupPossibleCheck(intPuzzle, possible);
        changes += oneInACellPossibleCheck(intPuzzle, possible);
        tempLevelZeroChanges += changes;
    }
    return tempLevelZeroChanges;
}

function oneInARowPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges;

    while (tempChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }
    
    return changes;
}

function oneInAColumnPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges;

    while (tempChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }
    
    return changes;
}

function oneInAGroupPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges;

    while (tempChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }
    
    return changes;
}

function oneInACellPossibleCheck(intPuzzle, possible) {
    let changes = 0;
    let tempChanges;

    while (tempChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        tempChanges = 0;
        const oneOptionCells = possible.filter(cell => cell.options.length === 1);
        if (oneOptionCells.length > 0) {
            // Get the first cell and make the change
            const cell = oneOptionCells[0];
            const cellValue = cell.options[0];
            intPuzzle[cell.row * 9 + cell.column] = cellValue;
            possible.splice(possible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);
            
            // Log the change
            if (!isGuessAndCheck && !isBruteForce) {
                mainChanges.push({
                    method: "One in a Cell",
                    description: "The number " + cellValue + " is the only possible option for row " + 
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
        }
        changes += tempChanges;
    }
    
    return changes;
}

function levelOneMethods(intPuzzle, possible) {
    let changes;
    let tempLevelOneChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += phantomChecks(intPuzzle, possible);
        changes += nakedPairChecks(intPuzzle, possible);
        changes += hiddenPairChecks(intPuzzle, possible);
        tempLevelOneChanges += changes;
    }
    return tempLevelOneChanges;
}

function phantomChecks(intPuzzle, possible) {
    let changes;
    let tempPhantomChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += rowPhantomCheck(intPuzzle, possible);
        changes += columnPhantomCheck(intPuzzle, possible);
        changes += groupPhantomCheck(intPuzzle, possible);
        tempPhantomChanges += changes;
    }
    return tempPhantomChanges;
}

function rowPhantomCheck(intPuzzle, possible) {
    let changes = 0;
    let tempRowPhantomChanges;

    while (tempRowPhantomChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }

    return changes;
}

function columnPhantomCheck(intPuzzle, possible) {
    let changes = 0;
    let tempColumnPhantomChanges;

    while (tempColumnPhantomChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }

    return changes;
}

function groupPhantomCheck(intPuzzle, possible) {
    let changes = 0;
    let tempGroupPhantomChanges;

    while (tempGroupPhantomChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }

    return changes;
}

function nakedPairChecks(intPuzzle, possible) {
    let changes;
    let tempNakedPairChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += nakedPairCheck(intPuzzle, possible, "row");
        changes += nakedPairCheck(intPuzzle, possible, "column");
        changes += nakedPairCheck(intPuzzle, possible, "group");
        tempNakedPairChanges += changes;
    }

    return tempNakedPairChanges;
}

function nakedPairCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempNakedPairChanges;

    while (tempNakedPairChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
    }

    return changes;
}

function hiddenPairChecks(intPuzzle, possible) {
    let changes;
    let tempHiddenPairChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += hiddenPairCheck(intPuzzle, possible, "row");
        changes += hiddenPairCheck(intPuzzle, possible, "column");
        changes += hiddenPairCheck(intPuzzle, possible, "group");
        tempHiddenPairChanges += changes;
    }
    return tempHiddenPairChanges;
}

function hiddenPairCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempHiddenPairChanges;

    while (tempHiddenPairChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                    const sameCells = (cellsForNum1[0] === cellsForNum2[0] && cellsForNum1[1] === cellsForNum2[1]) ||
                                    (cellsForNum1[0] === cellsForNum2[1] && cellsForNum1[1] === cellsForNum2[0]);
                        
                    if (sameCells) {
                        let description = "Since the numbers " + twoCellNumbers[i] + " and " + twoCellNumbers[j] +
                            " form a hidden pair in the cells (" + (cellsForNum1[0].row+1) + "," + (cellsForNum1[0].column+1) + ") and (" +
                            (cellsForNum1[1].row+1) + "," + (cellsForNum1[1].column+1) + "), the below numbers were removed as possible options:";
                        let removedOptions = [];
                        let removedRows = [];
                        let removedColumns = [];
                        let changesFound = false;
                        for (const cell of cellsForNum1) {
                            const numbersToRemove = cell.options.filter(num => num !== twoCellNumbers[i] && num !== twoCellNumbers[j]);
                            
                            if (numbersToRemove.length > 0) {
                                cell.options = [twoCellNumbers[i], twoCellNumbers[j]];
                                changesFound = true;

                                if (!isGuessAndCheck && !isBruteForce) {
                                    for (const num of numbersToRemove) {
                                        description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                        removedOptions.push(num);
                                        removedRows.push(cell.row);
                                        removedColumns.push(cell.column);
                                    }
                                }
                            }
                            
                        }
                        
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
    }

    return changes;
}

function levelTwoMethods(intPuzzle, possible) {
    let changes;
    let tempLevelTwoChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += nakedTripleChecks(intPuzzle, possible);
        changes += hiddenTripleChecks(intPuzzle, possible);
        changes += nakedQuadChecks(intPuzzle, possible);
        changes += xWingChecks(intPuzzle, possible);
        changes += yWingChecks(intPuzzle, possible);
        tempLevelTwoChanges += changes;
    }
    return tempLevelTwoChanges;
}

function nakedTripleChecks(intPuzzle, possible) {
    let changes;
    let tempNakedTripleChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += nakedTripleCheck(intPuzzle, possible, "row");
        changes += nakedTripleCheck(intPuzzle, possible, "column");
        changes += nakedTripleCheck(intPuzzle, possible, "group");
        tempNakedTripleChanges += changes;
    }
    return tempNakedTripleChanges;
}

function nakedTripleCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempNakedTripleChanges;

    while (tempNakedTripleChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                                if (!isSolved(intPuzzle) && isValid(possible)) {
                                    tempNakedTripleChanges += levelOneMethods(intPuzzle, possible);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempNakedTripleChanges;
    }

    return changes;
}

function hiddenTripleChecks(intPuzzle, possible) {
    let changes;
    let tempHiddenTripleChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += hiddenTripleCheck(intPuzzle, possible, "row");
        changes += hiddenTripleCheck(intPuzzle, possible, "column");
        changes += hiddenTripleCheck(intPuzzle, possible, "group");
        tempHiddenTripleChanges += changes;
    }
    return tempHiddenTripleChanges;
}

function hiddenTripleCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempHiddenTripleChanges;

    while (tempHiddenTripleChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                            for (const cell of cellsWithNumbers) {
                                const numbersToRemove = cell.options.filter(num => !currentNums.includes(num));
                                
                                if (numbersToRemove.length > 0) {
                                    cell.options = cell.options.filter(num => currentNums.includes(num));
                                    changesFound = true;

                                    if (!isGuessAndCheck && !isBruteForce) {
                                        for (const num of numbersToRemove) {
                                            description += "\nRow " + (cell.row+1) + ", Column " + (cell.column+1) + ": " + num;
                                            removedOptions.push(num);
                                            removedRows.push(cell.row);
                                            removedColumns.push(cell.column);
                                        }
                                    }
                                }
                                
                            }
                            
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
                                if (!isSolved(intPuzzle) && isValid(possible)) {
                                    tempHiddenTripleChanges += levelOneMethods(intPuzzle, possible);
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempHiddenTripleChanges;
    }

    return changes;
}

function nakedQuadChecks(intPuzzle, possible) {
    let changes;
    let tempNakedQuadChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += nakedQuadCheck(intPuzzle, possible, "row");
        changes += nakedQuadCheck(intPuzzle, possible, "column");
        changes += nakedQuadCheck(intPuzzle, possible, "group");
        tempNakedQuadChanges += changes;
    }
    return tempNakedQuadChanges;
}

function nakedQuadCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempNakedQuadChanges;

    while (tempNakedQuadChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                                    if (!isSolved(intPuzzle) && isValid(possible)) {
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
    }

    return changes;
}

function xWingChecks(intPuzzle, possible) {
    let changes;
    let tempXWingChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += xWingCheck(intPuzzle, possible, "row");
        changes += xWingCheck(intPuzzle, possible, "column");
        tempXWingChanges += changes;
    }
    return tempXWingChanges;
}

function xWingCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempXWingChanges;

    while (tempXWingChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                            if (!isSolved(intPuzzle) && isValid(possible)) {
                                tempXWingChanges += levelOneMethods(intPuzzle, possible);
                            }
                        }
                    }
                }
            }
        }
        changes += tempXWingChanges;
    }

    return changes;
}

function yWingChecks(intPuzzle, possible) {
    let changes;
    let tempYWingChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += yWingCheck(intPuzzle, possible, "row", "column");
        changes += yWingCheck(intPuzzle, possible, "row", "group");
        changes += yWingCheck(intPuzzle, possible, "column", "group");
        tempYWingChanges += changes;
    }
    return tempYWingChanges;
}

function yWingCheck(intPuzzle, possible, wing1, wing2) {
    let changes = 0;
    let tempYWingChanges;

    while (tempYWingChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                        if (!isSolved(intPuzzle) && isValid(possible)) {
                            tempYWingChanges += levelOneMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        changes += tempYWingChanges;
    }

    return changes;
}

function levelThreeMethods(intPuzzle, possible) {
    let changes;
    let tempLevelThreeChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += xyChainCheck(intPuzzle, possible);
        changes += rectangleCheck(intPuzzle, possible);
        changes += swordfishChecks(intPuzzle, possible);
        changes += jellyfishChecks(intPuzzle, possible);
        tempLevelThreeChanges += changes;
    }
    return tempLevelThreeChanges;
}

function xyChainCheck(intPuzzle, possible) {
    let changes = 0;
    let tempXYChainChanges;
    
    while (tempXYChainChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                    if (!isSolved(intPuzzle) && isValid(possible)) {
                        tempXYChainChanges += levelOneMethods(intPuzzle, possible);
                        if (!isSolved(intPuzzle) && isValid(possible)) {
                            tempXYChainChanges += levelTwoMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        
    }

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
    let tempRectangleChanges;

    while (tempRectangleChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
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
                if (solved) break;
                // Get all cells containing this number and are in the groups
                const cellsWithNum = possible.filter(cell => cell.options.includes(num) && groups.includes(cell.group));
                if (cellsWithNum.length < 8) continue;

                const tCells = getTCells(groups, cellsWithNum);
                // If there tCells is null, or there are less than 3 groups with tCells, continue
                if (!tCells || Object.keys(tCells).filter(group => tCells[group].length > 0).length < 3) continue;

                let cellsToChange = [];
                let rectangleRows = [];
                let rectangleCols = [];

                // Check if a perfect rectangle can be formed
                const perfectRectangle = checkForPerfectRectangle(tCells);
                if (perfectRectangle) {
                    // Check if the number can be removed from the corners of the rectangle
                    cellsToChange = cellsWithNum.filter(cell => 
                        perfectRectangle.rows.includes(cell.row) && 
                        perfectRectangle.cols.includes(cell.column) 
                    );

                    if (cellsToChange.length > 0) {
                        rectangleRows = perfectRectangle.rows;
                        rectangleCols = perfectRectangle.cols;
                    }
                }

                if (cellsToChange.length === 0) {
                    // Check if there is a pseudo-rectangle
                    const pseudoRectangle = checkForPseudoRectangle(tCells);
                    if (pseudoRectangle) {
                        // Check if the number can be removed from the corner of the rectangle in the 4th group
                        cellsToChange = cellsWithNum.filter(cell => 
                            pseudoRectangle.rows.includes(cell.row) && 
                            pseudoRectangle.cols.includes(cell.column) &&
                            !pseudoRectangle.groups.includes(cell.group)
                        );

                        if (cellsToChange.length > 0) {
                            rectangleRows = pseudoRectangle.rows;
                            rectangleCols = pseudoRectangle.cols;
                        }
                    }
                }

                if (cellsToChange.length > 0) {
                    let description = "Since the number " + num + " forms a rectangle in groups " + 
                        (groups[0] + 1) + ", " + (groups[1] + 1) + ", " + (groups[2] + 1) + ", and " + (groups[3] + 1) +
                        " across rows " + (rectangleRows[0] + 1) + " through " + (rectangleRows[1] + 1) + 
                        ", columns " + (rectangleCols[0] + 1) + " through " + (rectangleCols[1] + 1) +
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
                    if (!isSolved(intPuzzle) && isValid(possible)) {
                        tempRectangleChanges += levelOneMethods(intPuzzle, possible);
                        if (!isSolved(intPuzzle) && isValid(possible)) {
                            tempRectangleChanges += levelTwoMethods(intPuzzle, possible);
                        }
                    }
                }
            }
        }
        changes += tempRectangleChanges;
    }

    return changes;
}

function getTCells(groups, cellsWithNum) {
    let tCells = {
        [groups[0]]: [],
        [groups[1]]: [],
        [groups[2]]: [],
        [groups[3]]: []
    };

    groups.forEach(group => {
        const groupCells = cellsWithNum.filter(cell => cell.group === group);
        if (groupCells.length < 2) return null;
        
        // Check if there are only 2 cells in the group
        if (groupCells.length === 2) {
            tCells[group].push({
                row: groupCells[1].row,
                col: groupCells[0].column,
            });
            tCells[group].push({
                row: groupCells[0].row,
                col: groupCells[1].column,
            });
        } else {
            // Check if there is exactly one row or one column with multiple cells
            const rowCounts = new Array(9).fill(0);
            const colCounts = new Array(9).fill(0);
            groupCells.forEach(cell => {
                rowCounts[cell.row]++;
                colCounts[cell.column]++;
            });

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
                
            if (rowsWithMultiple.length === 1) {
                // Check if the cells not in the row are in the same column
                const otherCells = groupCells.filter(cell => cell.row !== rowsWithMultiple[0]);
                if(otherCells.length < 1) return null; // Should be caught by Phantom Checks

                const sameColumn = otherCells.every(cell => cell.column === otherCells[0].column);
                if (sameColumn) {
                    tCells[group].push({
                        row: rowsWithMultiple[0],
                        col: otherCells[0].column,
                    });
                }
            } else if (colsWithMultiple.length === 1) {
                // Check if the cells not in the column are in the same row
                const otherCells = groupCells.filter(cell => cell.column !== colsWithMultiple[0]);
                if(otherCells.length < 1) return null; // Should be caught by Phantom Checks
                
                const sameRow = otherCells.every(cell => cell.row === otherCells[0].row);
                if (sameRow) {
                    tCells[group].push({
                        row: otherCells[0].row,
                        col: colsWithMultiple[0],
                    });
                }
            }
        }
    });

    return tCells;
}

function checkForPerfectRectangle(tCells) {
    // Get the groups
    const groups = Object.keys(tCells);

    // Check which groups have at least 1 tCell
    const groupsWithTCells = groups.filter(group => tCells[group].length > 0);
    if (groupsWithTCells.length < 4) return null;

    // Loop through every combination of 4 tCells and check if they only have 2 unique rows and 2 unique columns
    for (const tCell1 of tCells[groups[0]]) {
        for (const tCell2 of tCells[groups[1]]) {
            for (const tCell3 of tCells[groups[2]]) {
                for (const tCell4 of tCells[groups[3]]) {
                    // Get a Set of the rows and columns of the tCells
                    const uniqueRows = new Set([tCell1.row, tCell2.row, tCell3.row, tCell4.row]);
                    const uniqueColumns = new Set([tCell1.col, tCell2.col, tCell3.col, tCell4.col]);

                    // Check if there are exactly 2 unique rows and 2 unique columns
                    if (uniqueRows.size === 2 && uniqueColumns.size === 2) {
                        // A perfect rectangle has been found
                        return {
                            rows: Array.from(uniqueRows),
                            cols: Array.from(uniqueColumns),
                        };
                    }
                }
            }
        }
    }

    return null;
}

function checkForPseudoRectangle(tCells) {
    // Get the groups
    const groups = Object.keys(tCells);

    // Check which groups have at least 1 tCell
    const groupsWithTCells = groups.filter(group => tCells[group].length > 0);
    if (groupsWithTCells.length < 3) return null;

    // Generate all possible combinations of 3 groups
    for (let i = 0; i < groupsWithTCells.length - 2; i++) {
        for (let j = i + 1; j < groupsWithTCells.length - 1; j++) {
            for (let k = j + 1; k < groupsWithTCells.length; k++) {
                const group1 = groupsWithTCells[i];
                const group2 = groupsWithTCells[j];
                const group3 = groupsWithTCells[k];

                // Loop through every combination of tCells from these 3 groups
                for (const tCell1 of tCells[group1]) {
                    for (const tCell2 of tCells[group2]) {
                        for (const tCell3 of tCells[group3]) {
                            // Get a Set of the rows and columns of the tCells
                            const uniqueRows = new Set([tCell1.row, tCell2.row, tCell3.row]);
                            const uniqueColumns = new Set([tCell1.col, tCell2.col, tCell3.col]);

                            // Check if there are exactly 2 unique rows and 2 unique columns
                            if (uniqueRows.size === 2 && uniqueColumns.size === 2) {
                                // A pseudo-rectangle has been found
                                return {
                                    rows: Array.from(uniqueRows),
                                    cols: Array.from(uniqueColumns),
                                    groups: [Number(group1), Number(group2), Number(group3)],
                                };
                            }
                        }
                    }
                }
            }
        }
    }

    return null;
}

function swordfishChecks(intPuzzle, possible) {
    let changes;
    let tempSwordfishChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += swordfishCheck(intPuzzle, possible, "row");
        changes += swordfishCheck(intPuzzle, possible, "column");
        tempSwordfishChanges += changes;
    }
    return tempSwordfishChanges;
}

function swordfishCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempSwordfishChanges;

    while (tempSwordfishChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        tempSwordfishChanges = 0;
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
                
                // Only consider rows/columns with exactly 2 or 3 cells containing the number
                if (cellsWithNum.length === 2 || cellsWithNum.length === 3) {
                    // Store the row/column and the positions where the number could be
                    numLocations.push({
                        rowCol,
                        positions: cellsWithNum.map(cell => cell[otherCheckType]).sort((a, b) => a - b),
                        cellCount: cellsWithNum.length
                    });
                }
            }

            if (numLocations.length < 3) continue;

            // Look for triplets of rows/columns that have the number in the same three columns/rows
            for (let i = 0; i < numLocations.length - 2 && !solved; i++) {
                for (let j = i + 1; j < numLocations.length - 1 && !solved; j++) {
                    for (let k = j + 1; k < numLocations.length && !solved; k++) {
                        const loc1 = numLocations[i];
                        const loc2 = numLocations[j];
                        const loc3 = numLocations[k];

                        // Get all unique positions across the three rows/columns
                        const positionsSet = new Set([...loc1.positions, ...loc2.positions, ...loc3.positions]);
                        
                        // Check if there are exactly 3 unique positions
                        if (positionsSet.size === 3) {
                            const positions = Array.from(positionsSet).sort((a, b) => a - b);
                            
                            // Verify that each position appears in at least 2 of the rows/columns
                            const positionCounts = positions.map(pos => {
                                let count = 0;
                                if (loc1.positions.includes(pos)) count++;
                                if (loc2.positions.includes(pos)) count++;
                                if (loc3.positions.includes(pos)) count++;
                                return count;
                            });

                            // A valid swordfish requires each position to appear in at least 2 rows/columns
                            if (positionCounts.every(count => count >= 2)) {
                                const rowCols = [loc1.rowCol, loc2.rowCol, loc3.rowCol].sort((a, b) => a - b);
                                
                                let description = "Since the number " + (num) + ` forms a Swordfish in the ${checkType}s ` + 
                                    (rowCols[0]+1) + ", " + (rowCols[1]+1) + ", and " + (rowCols[2]+1) + `, ${otherCheckType}s ` + (positions[0]+1) + 
                                    ", " + (positions[1]+1) + ", and " + (positions[2]+1) + 
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
                                            method: "Swordfish - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                            order: possibleChanges.length,
                                            description: description,
                                            options: removedOptions,
                                            rows: removedRows,
                                            columns: removedColumns
                                        });
                                        totalChanges.push({
                                            type: "possible",
                                            method: "Swordfish - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                        });
                                    }
                                    tempSwordfishChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempSwordfishChanges += levelZeroMethods(intPuzzle, possible);
                                    if (!isSolved(intPuzzle) && isValid(possible)) {
                                        tempSwordfishChanges += levelOneMethods(intPuzzle, possible);
                                        if (!isSolved(intPuzzle) && isValid(possible)) {
                                            tempSwordfishChanges += levelTwoMethods(intPuzzle, possible);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        changes += tempSwordfishChanges;
    }

    return changes;
}

function jellyfishChecks(intPuzzle, possible) {
    let changes;
    let tempJellyfishChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += jellyfishCheck(intPuzzle, possible, "row");
        changes += jellyfishCheck(intPuzzle, possible, "column");
        tempJellyfishChanges += changes;
    }
    return tempJellyfishChanges;
}

function jellyfishCheck(intPuzzle, possible, checkType) {
    let changes = 0;
    let tempJellyfishChanges;

    while (tempJellyfishChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        tempJellyfishChanges = 0;
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
                
                // Only consider rows/columns with exactly 2, 3, or 4 cells containing the number
                if (cellsWithNum.length === 2 || cellsWithNum.length === 3 || cellsWithNum.length === 4) {
                    // Store the row/column and the positions where the number could be
                    numLocations.push({
                        rowCol,
                        positions: cellsWithNum.map(cell => cell[otherCheckType]).sort((a, b) => a - b),
                        cellCount: cellsWithNum.length
                    });
                }
            }

            if (numLocations.length < 4) continue;

            // Look for quadruplets of rows/columns that have the number in the same four columns/rows
            for (let i = 0; i < numLocations.length - 3 && !solved; i++) {
                for (let j = i + 1; j < numLocations.length - 2 && !solved; j++) {
                    for (let k = j + 1; k < numLocations.length - 1 && !solved; k++) {
                        for (let l = k + 1; l < numLocations.length && !solved; l++) {
                            const loc1 = numLocations[i];
                            const loc2 = numLocations[j];
                            const loc3 = numLocations[k];
                            const loc4 = numLocations[l];

                            // Get all unique positions across the four rows/columns
                            const positionsSet = new Set([...loc1.positions, ...loc2.positions, ...loc3.positions, ...loc4.positions]);
                            
                            // Check if there are exactly 4 unique positions
                            if (positionsSet.size === 4) {
                                const positions = Array.from(positionsSet).sort((a, b) => a - b);
                                
                                // Verify that each position appears in at least 2 of the rows/columns
                                const positionCounts = positions.map(pos => {
                                    let count = 0;
                                    if (loc1.positions.includes(pos)) count++;
                                    if (loc2.positions.includes(pos)) count++;
                                    if (loc3.positions.includes(pos)) count++;
                                    if (loc4.positions.includes(pos)) count++;
                                    return count;
                                });

                                // A valid jellyfish requires each position to appear in at least 2 rows/columns
                                // and at least one position must appear in 3 or 4 rows/columns
                                if (positionCounts.every(count => count >= 2) && positionCounts.some(count => count >= 3)) {
                                    const rowCols = [loc1.rowCol, loc2.rowCol, loc3.rowCol, loc4.rowCol].sort((a, b) => a - b);
                                    
                                    let description = "Since the number " + (num) + ` forms a Jellyfish in the ${checkType}s ` + 
                                        (rowCols[0]+1) + ", " + (rowCols[1]+1) + ", " + (rowCols[2]+1) + ", and " + (rowCols[3]+1) + `, ${otherCheckType}s ` + (positions[0]+1) + 
                                        ", " + (positions[1]+1) + ", " + (positions[2]+1) + ", and " + (positions[3]+1) + 
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
                                                method: "Jellyfish - " + checkType.charAt(0).toUpperCase() + checkType.slice(1),
                                                order: possibleChanges.length,
                                                description: description,
                                                options: removedOptions,
                                                rows: removedRows,
                                                columns: removedColumns
                                            });
                                            totalChanges.push({
                                                type: "possible",
                                                method: "Jellyfish - " + checkType.charAt(0).toUpperCase() + checkType.slice(1)
                                            });
                                        }
                                        tempJellyfishChanges++;
                                        
                                        // Run previous methods to see if the puzzle can be solved
                                        tempJellyfishChanges += levelZeroMethods(intPuzzle, possible);
                                        if (!isSolved(intPuzzle) && isValid(possible)) {
                                            tempJellyfishChanges += levelOneMethods(intPuzzle, possible);
                                            if (!isSolved(intPuzzle) && isValid(possible)) {
                                                tempJellyfishChanges += levelTwoMethods(intPuzzle, possible);
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
        changes += tempJellyfishChanges;
    }

    return changes;
}

function levelFourMethods(intPuzzle, possible) {
    let changes;
    let tempLevelFourChanges = 0;
    while (changes !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        changes = 0;
        changes += guessAndCheck(intPuzzle, possible);
        tempLevelFourChanges += changes;
    }

    // If we make it here, we have to use brute force
    if (!isSolved(intPuzzle) && isValid(possible)) {
        // Clone the current puzzle state
        const clonePuzzle = [...intPuzzle];
        const clonePossible = possible.map(c => ({
            row: c.row,
            column: c.column,
            group: c.group,
            options: [...c.options]
        }));

        isBruteForce = true;

        // Use brute force to find a solution
        const solution = bruteForce(clonePuzzle, clonePossible);

        isBruteForce = false;

        if (solution) {
            let description = "Eliminating the highlighted possible options makes the puzzle solvable using previous methods.";
            let removedOptions = [];
            let removedRows = [];
            let removedColumns = [];

            // Update possible options based on the solution
            for (let i = 0; i < 81; i++) {
                if (solution[i] !== 0 && solution[i] !== intPuzzle[i]) {
                    const row = Math.floor(i / 9);
                    const column = i % 9;
                    const cell = possible.find(p => p.row === row && p.column === column);
                    
                    if (cell) {
                        const optionsToRemove = cell.options.filter(opt => opt !== solution[i]);
                        if (optionsToRemove.length > 0) {
                            optionsToRemove.forEach(opt => {
                                const index = cell.options.indexOf(opt);
                                cell.options.splice(index, 1);
                                removedOptions.push(opt);
                                removedRows.push(row);
                                removedColumns.push(column);
                            });
                        }
                    }
                }
            }

            possibleChanges.push({
                method: "Brute Force",
                order: possibleChanges.length,
                description: description,
                options: removedOptions,
                rows: removedRows,
                columns: removedColumns
            });
            totalChanges.push({
                type: "possible",
                method: "Brute Force"
            });
            tempLevelFourChanges++;

            // Call previous methods again to solve the puzzle
            tempLevelFourChanges += levelZeroMethods(intPuzzle, possible);
            if (!isSolved(intPuzzle) && isValid(possible)) {
                tempLevelFourChanges += levelOneMethods(intPuzzle, possible);
                if (!isSolved(intPuzzle) && isValid(possible)) {
                    tempLevelFourChanges += levelTwoMethods(intPuzzle, possible);
                    if (!isSolved(intPuzzle) && isValid(possible)) {
                        tempLevelFourChanges += levelThreeMethods(intPuzzle, possible);
                        if (!isSolved(intPuzzle) && isValid(possible)) {
                            guessAndCheck(intPuzzle, possible);
                        }
                    }
                }
            }
        }
    }
    
    return tempLevelFourChanges;
}

function guessAndCheck(intPuzzle, possible) {
    let changes = 0;
    let tempGuessAndCheckChanges;
    let tempSolved;
    let contradictionFound;
    let sameNumberFound;
    

    while (tempGuessAndCheckChanges !== 0 && !isSolved(intPuzzle) && isValid(possible)) {
        tempGuessAndCheckChanges = 0;
        tempSolved = false;
        contradictionFound = false;
        sameNumberFound = false;

        // Set isGuessAndCheck to true
        isGuessAndCheck = true;

        for (let optionCount = 2; optionCount < 10 && !tempSolved && !contradictionFound && !sameNumberFound; optionCount++) {
            // Get all of the unsolved cells that have the correct number of options
            const cellsToCheck = possible.filter(cell => cell.options.length === optionCount);

            if (cellsToCheck.length === 0) continue;

            // For each unsolved cell, try each of its options
            for (const cell of cellsToCheck) {
                if (tempSolved || contradictionFound || sameNumberFound) break;

                // Intialize an array to store the results of each guess
                const clonePuzzleResults = [];

                // Try each of the options
                for (const option of [...cell.options]) {
                    if (tempSolved || contradictionFound) break;

                    // Clone the current puzzle
                    const clonePuzzle = [...intPuzzle];
                    const clonePossible = possible.map(c => ({
                        row: c.row,
                        column: c.column,
                        group: c.group,
                        options: [...c.options]
                    }));    

                    // Set the current option as the answer
                    clonePuzzle[cell.row*9 + cell.column] = option;
                    clonePossible.splice(clonePossible.findIndex(p => p.row === cell.row && p.column === cell.column), 1);
                    updateShadowPossible(option, cell, clonePossible);

                    // Solve the clone as much as possible using all previous methods
                    levelZeroMethods(clonePuzzle, clonePossible);
                    if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
                        levelOneMethods(clonePuzzle, clonePossible);
                        if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
                            levelTwoMethods(clonePuzzle, clonePossible);
                            if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
                                levelThreeMethods(clonePuzzle, clonePossible);
                            }
                        }
                    }

                    // Store the clone puzzle results
                    clonePuzzleResults.push(clonePuzzle);

                    // Check to see if this guess solved the puzzle
                    if (isSolved(clonePuzzle)) {
                        // Remove all other options from the cell so previous methods can solve the puzzle
                        const optionsToRemove = cell.options.filter(opt => opt !== option);
                        
                        let description = "Making row " + (cell.row+1) + ", column " + (cell.column+1) + " the number " + option + " solved the puzzle." + 
                            "\nTherefore, the following options were removed from the cell:";
                        let removedOptions = [];
                        let removedRows = [];
                        let removedColumns = [];

                        optionsToRemove.forEach(opt => {
                            const index = cell.options.indexOf(opt);
                            cell.options.splice(index, 1);

                            removedOptions.push(opt);
                            removedRows.push(cell.row);
                            removedColumns.push(cell.column);
                            description += "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + opt;
                            
                        });

                        if (!isBruteForce) {
                            possibleChanges.push({
                                method: "Guess and Check - Solved",
                                order: possibleChanges.length,
                                description: description,
                                options: removedOptions,
                                rows: removedRows,
                                columns: removedColumns
                            });
                            totalChanges.push({
                                type: "possible",
                                method: "Guess and Check - Solved"
                            });
                        }
                        tempGuessAndCheckChanges++;
                        tempSolved = true;
                        break;
                    } else if (!isValid(clonePossible)) {
                        // Remove the current option from the cell
                        const index = cell.options.indexOf(option);
                        cell.options.splice(index, 1);

                        contradictionFound = true;
                        let description = "Making row " + (cell.row+1) + ", column " + (cell.column+1) + " the number " + option + " leads to a contradiction. " + 
                            "\nTherefore, the following options were removed from the cell:" + 
                            "\nRow " + (cell.row + 1) + ", Column " + (cell.column + 1) + ": " + option;
                        
                        if (!isBruteForce) {
                            possibleChanges.push({
                                method: "Guess and Check - Contradiction",
                                order: possibleChanges.length,
                                description: description,
                                options: [option],
                                rows: [cell.row],
                                columns: [cell.column]
                            });
                            totalChanges.push({
                                type: "possible",
                                method: "Guess and Check - Contradiction"
                            });
                        }
                        tempGuessAndCheckChanges++;
                        break;
                    }
                }
                    
                // Check to see if any cells resulted in the same number with all guesses
                if (!tempSolved && !contradictionFound && clonePuzzleResults.length > 1) {
                    // Get all indices where value is 0
                    const zeroIndices = intPuzzle.reduce((indices, value, index) => {
                        if (value === 0) indices.push(index);
                        return indices;
                    }, []);

                    for (const index of zeroIndices) {
                        // Check if all clone puzzles have the same non-zero value at this index
                        const firstValue = clonePuzzleResults[0][index];
                        const sameNumber = firstValue !== 0 && clonePuzzleResults.every(puzzle => puzzle[index] === firstValue);

                        if (sameNumber) {
                            // Find the cell in possible array that corresponds to this index
                            const row = Math.floor(index / 9);
                            const column = index % 9;
                            const cellToChange = possible.find(c => c.row === row && c.column === column);
                            
                            if (cellToChange) {
                                // Remove all other options from this cell
                                const optionsToRemove = cellToChange.options.filter(opt => opt !== firstValue);
                                if (optionsToRemove.length === 0) continue;

                                sameNumberFound = true;
                                
                                let description = "Making row " + (cell.row+1) + ", column " + (cell.column+1) + " all possible options leads to row " + (row+1) + 
                                    ", column " + (column+1) + " being number " + firstValue + " for each option." + 
                                    "\nTherefore, the following options were removed from the cell:";
                                let removedOptions = [];
                                let removedRows = [];
                                let removedColumns = [];
                                
                                optionsToRemove.forEach(opt => {
                                    const optIndex = cellToChange.options.indexOf(opt);
                                    cellToChange.options.splice(optIndex, 1);
                                    
                                    removedOptions.push(opt);
                                    removedRows.push(row);
                                    removedColumns.push(column);
                                    description += "\nRow " + (row + 1) + ", Column " + (column + 1) + ": " + opt;
                                });
                                
                                if (!isBruteForce) {
                                    possibleChanges.push({
                                        method: "Guess and Check - Same Number",
                                        order: possibleChanges.length,
                                        description: description,
                                        options: removedOptions,
                                        rows: removedRows,
                                        columns: removedColumns
                                    });
                                    totalChanges.push({
                                        type: "possible",
                                        method: "Guess and Check - Same Number"
                                    });
                                }
                                tempGuessAndCheckChanges++;
                                break;
                            }
                        }
                    }
                }       
            }
        }
        
        // Set isGuessAndCheck to false when updating the actual puzzle
        isGuessAndCheck = false;

        // Run previous methods to see if the puzzle can be solved
        tempGuessAndCheckChanges += levelZeroMethods(intPuzzle, possible);
        if (!isSolved(intPuzzle) && isValid(possible)) {
            tempGuessAndCheckChanges += levelOneMethods(intPuzzle, possible);
            if (!isSolved(intPuzzle) && isValid(possible)) {
                tempGuessAndCheckChanges += levelTwoMethods(intPuzzle, possible);
                if (!isSolved(intPuzzle) && isValid(possible)) {
                    tempGuessAndCheckChanges += levelThreeMethods(intPuzzle, possible);
                }
            }
        }

        changes += tempGuessAndCheckChanges;
    }

    return changes;
}

function bruteForce(intPuzzle, possible) {
    // Find the cell with the fewest options
    let minOptions = 10;
    let minCell = null;
    
    for (const cell of possible) {
        if (cell.options.length < minOptions) {
            minOptions = cell.options.length;
            minCell = cell;
        }
    }
    
    // If no cell found or puzzle is solved, return
    if (!minCell || isSolved(intPuzzle)) {
        return isSolved(intPuzzle) ? [...intPuzzle] : null;
    }
    
    // Try each option for the cell with fewest options
    for (const option of minCell.options) {
        // Clone the current state
        const clonePuzzle = [...intPuzzle];
        const clonePossible = possible.map(c => ({
            row: c.row,
            column: c.column,
            group: c.group,
            options: [...c.options]
        }));
        
        // Set the option
        clonePuzzle[minCell.row * 9 + minCell.column] = option;
        clonePossible.splice(clonePossible.findIndex(p => p.row === minCell.row && p.column === minCell.column), 1);
        
        // Update shadow possible
        updateShadowPossible(option, minCell, clonePossible);
        
        // Try to solve with this option
        levelZeroMethods(clonePuzzle, clonePossible);
        if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
            levelOneMethods(clonePuzzle, clonePossible);
            if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
                levelTwoMethods(clonePuzzle, clonePossible);
                if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
                    levelThreeMethods(clonePuzzle, clonePossible);
                    if (!isSolved(clonePuzzle) && isValid(clonePossible)) {
                        guessAndCheck(clonePuzzle, clonePossible);
                    }
                }
            }
        }
        
        // If solved, return the solution
        if (isSolved(clonePuzzle)) {
            // Reset the game to only have the digits needed to solve the puzzle with previous methods, and return
            const clonePuzzle = [...intPuzzle];
            clonePuzzle[minCell.row * 9 + minCell.column] = option;
            return clonePuzzle;
        }
        // If not solved but still valid, try recursive brute force
        else if (isValid(clonePossible)) {
            const recursiveSolution = bruteForce(clonePuzzle, clonePossible);
            if (recursiveSolution) {
                return recursiveSolution;
            }
        }
    }
    
    return null;
}

