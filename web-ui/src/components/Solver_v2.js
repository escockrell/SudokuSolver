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

export function solvePuzzle(startPuzzleString) {
    const startTime = performance.now();
    resetMetrics();
    let solvePuzzle = convertPuzzleToIntArray(startPuzzleString);
    let solvePossible = initializePossible(solvePuzzle);

    levelZeroMethods(solvePuzzle, solvePossible);

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

function levelZeroMethods(intPuzzle, possible) {
    let changes;
    let tempLevelZeroChanges = 0;
    do {
        changes = 0;
        changes += oneInARowPossibleCheck(intPuzzle, possible);
        changes += oneInAColumnPossibleCheck(intPuzzle, possible);
        // changes += oneInAGroupPossibleCheck(intPuzzle, possible);
        // changes += oneInACellPossibleCheck(intPuzzle, possible);
        tempLevelZeroChanges += changes;
    } while (changes !== 0);
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
                    tempChanges++;

                    updateShadowPossible(num, cell, possible);
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0);
    
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
                    tempChanges++;

                    updateShadowPossible(num, cell, possible);
                }
            }
        }
        changes += tempChanges;
    } while (tempChanges !== 0);
    
    return changes;
}

function updateShadowPossible(number, changedCell, possible) {
    changedCell.options.forEach(option => {
        mainChangePossibleOrder.push(mainChangeCount);
        mainChangePossibleNumber.push(option);
        mainChangePossibleRow.push(changedCell.row);
        mainChangePossibleColumn.push(changedCell.column);
        mainChangePossibleCount++;
    });
    
    const updateCells = possible.filter(cell => (cell.row === changedCell.row || cell.column === changedCell.column || cell.group === changedCell.group) && cell.options.includes(number));
    updateCells.forEach(cell => {
        mainChangePossibleOrder.push(mainChangeCount);
        mainChangePossibleNumber.push(number);
        mainChangePossibleRow.push(cell.row);
        mainChangePossibleColumn.push(cell.column);
        mainChangePossibleCount++;

        const index = possible.findIndex(p => p.row === cell.row && p.column === cell.column);
        possible[index].options = possible[index].options.filter(n => n !== number);
    });
}
