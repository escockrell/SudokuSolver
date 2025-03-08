import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import ChangesCell from '../components/ChangesCell';
import BackButton from '../components/BackButton';
import './ChangesPage.css';

const initializePossibleNumbers = (grid) => {
  const possibles = Array(9).fill().map(() => 
    Array(9).fill().map(() => Array(9).fill(false))
  );

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === '' || grid[row][col] === null) {
        // For empty cells, check each number 1-9
        for (let num = 1; num <= 9; num++) {
          if (isNumberPossible(row, col, num, grid)) {
            possibles[row][col][num - 1] = true;
          }
        }
      }
    }
  }
  return possibles;
};

const isNumberPossible = (row, col, num, grid) => {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (grid[row][j] === num.toString()) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num.toString()) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num.toString()) return false;
    }
  }
  
  return true;
};

const ChangesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentState, setCurrentState] = useState({
    currentTotalChange: 0,
    currentChangeType: null,
    previousChangeType: null,
    currentMainChange: 0,
    currentPossibleChange: 0,
    currentPossibleChangeOrder: 0,
    currentMainPossibleChange: 0
  });

  const [grid, setGrid] = useState(
    Array(9).fill().map(() => Array(9).fill(null))
  );

  const [possibleNumbers, setPossibleNumbers] = useState(
    Array(9).fill().map(() => 
      Array(9).fill().map(() => Array(9).fill(true))
    )
  );

  const [highlightedCells, setHighlightedCells] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );

  const [changeDescription, setChangeDescription] = useState(
    "Changes will be shown when you click 'Next'"
  );

  const [endMainChangePossibleFlag, setEndMainChangePossibleFlag] = useState(false);

  const [highlightedPossibles, setHighlightedPossibles] = useState(
    Array(9).fill().map(() => 
      Array(9).fill().map(() => Array(9).fill(false))
    )
  );

  const handleReset = useCallback(() => {
    // console.log("Resetting to initial state");
    setCurrentState({
      currentTotalChange: 0,
      currentChangeType: null,
      previousChangeType: null,
      currentMainChange: 0,
      currentPossibleChange: 0,
      currentPossibleChangeOrder: 0,
      currentMainPossibleChange: 0
    });
    setGrid(location.state.originalGrid.map(row => [...row]));
    setPossibleNumbers(initializePossibleNumbers(location.state.originalGrid));
    setHighlightedCells(Array(9).fill().map(() => Array(9).fill(false)));
    setHighlightedPossibles(Array(9).fill().map(() => 
      Array(9).fill().map(() => Array(9).fill(false))
    ));
    setChangeDescription("Changes will be shown when you click 'Next'");
    setEndMainChangePossibleFlag(false);
  }, [location.state]);

  const handleNext = useCallback(() => {
    if (!location.state?.metrics) return;
    const metrics = location.state.metrics;
    
    // console.log("\n=== NEXT BUTTON PRESSED ===");
    // console.log("Current state:", currentState);

    // Create a deep copy of the current state instead of a reference
    let newState = {
      ...currentState,  // Spread operator to create a new object
      currentTotalChange: currentState.currentTotalChange,
      currentChangeType: currentState.currentChangeType,
      previousChangeType: currentState.previousChangeType,
      currentMainChange: currentState.currentMainChange,
      currentPossibleChange: currentState.currentPossibleChange,
      currentPossibleChangeOrder: currentState.currentPossibleChangeOrder,
      currentMainPossibleChange: currentState.currentMainPossibleChange
    };

    // Don't proceed if we're already at the end
    if (endMainChangePossibleFlag) {
      // console.log("Already at the end, so don't proceed");
      return;
    }

    // First, apply the currently highlighted change
    if (currentState.currentChangeType === 'main') {
      // Get the current highlighted cell
      const row = metrics.mainChangeRow[currentState.currentMainChange - 1];
      const col = metrics.mainChangeColumn[currentState.currentMainChange - 1];
      const number = metrics.mainChangeNumber[currentState.currentMainChange - 1];

      // console.log("Applying main change:", { row, col, number });

      // Place the number
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = number;
      setGrid(newGrid);

      // Count how many possible changes this main change eliminated
      let possibleCount = 0;
      let j = currentState.currentMainPossibleChange;
      // console.log("Setting j to:", currentState.currentMainPossibleChange);
      while (j < metrics.mainChangePossibleOrder.length && 
             metrics.mainChangePossibleOrder[j] === currentState.currentMainChange) {
        possibleCount++;
        j++;
      }
      // console.log("Found", possibleCount, "possible changes eliminated by main change", currentState.currentMainChange);

      // Remove possible options that this main change eliminated
      const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
      let i = currentState.currentMainPossibleChange;  // Start from the first possible change for this main change
      // console.log("Starting removal of main change possible options from index, i:", i);
      while (i < currentState.currentMainPossibleChange + possibleCount) {
        const possibleRow = metrics.mainChangePossibleRow[i];
        const possibleCol = metrics.mainChangePossibleColumn[i];
        const possibleNum = metrics.mainChangePossibleNumber[i] - 1;
        newPossibleNumbers[possibleRow][possibleCol][possibleNum] = false;
        // console.log("Removed possible option at index, i:", i, "for row ", possibleRow, ", column ", possibleCol, ", number ", possibleNum);
        i++;
      }
      setPossibleNumbers(newPossibleNumbers);

      newState.currentMainPossibleChange = currentState.currentMainPossibleChange + possibleCount;
    }
    else if (currentState.currentChangeType === 'possible') {
      // Remove currently highlighted possible numbers
      const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
      
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          for (let k = 0; k < 9; k++) {
            if (highlightedPossibles[i][j][k]) {
              newPossibleNumbers[i][j][k] = false;
            }
          }
        }
      }
      setPossibleNumbers(newPossibleNumbers);
    }

    // Clear highlights
    setHighlightedCells(Array(9).fill().map(() => Array(9).fill(false)));
    setHighlightedPossibles(Array(9).fill().map(() => 
      Array(9).fill().map(() => Array(9).fill(false))
    ));

    // Only preview next change if not at the end
    if (currentState.currentTotalChange < metrics.totalChangeCount) {
      // Preview next change
      const nextChangeType = metrics.totalChangeType[currentState.currentTotalChange];
      // console.log("Next change type:", nextChangeType);
      
      if (nextChangeType === 'main') {
        // Highlight next main change
        const row = metrics.mainChangeRow[currentState.currentMainChange];
        const col = metrics.mainChangeColumn[currentState.currentMainChange];
        
        // console.log("Highlighting next main change:", { row, col });

        const newHighlightedCells = Array(9).fill().map(() => Array(9).fill(false));
        newHighlightedCells[row][col] = true;
        setHighlightedCells(newHighlightedCells);
        setChangeDescription(metrics.mainChangeDescription[currentState.currentMainChange]);

        newState = {
          ...newState,
          currentTotalChange: currentState.currentTotalChange + 1,
          currentMainChange: currentState.currentMainChange + 1,
          currentChangeType: nextChangeType,
          previousChangeType: currentState.currentChangeType  // This will be null on first click
        };
      } 
      else if (nextChangeType === 'possible') {
        // Highlight next possible changes
        const currentOrder = metrics.possibleChangeOrder[currentState.currentPossibleChange];
        let i = currentState.currentPossibleChange;
        const changes = [];
        
        while (i < metrics.possibleChangeOrder.length && 
               metrics.possibleChangeOrder[i] === currentOrder) {
          changes.push({
            row: metrics.possibleChangeRow[i],
            col: metrics.possibleChangeColumn[i],
            number: metrics.possibleChangeNumber[i] - 1
          });
          i++;
        }

        // console.log("Highlighting next possible changes:", changes);

        const newHighlightedPossibles = Array(9).fill().map(() => 
          Array(9).fill().map(() => Array(9).fill(false))
        );
        
        changes.forEach(change => {
          newHighlightedPossibles[change.row][change.col][change.number] = true;
        });
        setHighlightedPossibles(newHighlightedPossibles);
        setChangeDescription(metrics.possibleChangeDescription[currentState.currentPossibleChangeOrder]);

        newState = {
          ...newState,
          currentTotalChange: currentState.currentTotalChange + 1,
          currentPossibleChange: i,
          currentPossibleChangeOrder: currentState.currentPossibleChangeOrder + 1,
          currentChangeType: nextChangeType,
          previousChangeType: currentState.currentChangeType  // This will be null on first click
        };
      }
    } else if (currentState.currentTotalChange === metrics.totalChangeCount) {
      // This is the last change - apply it but don't preview anything
      const lastChangeType = metrics.totalChangeType[currentState.currentTotalChange - 1];
      
      if (lastChangeType === 'main') {
        const row = metrics.mainChangeRow[metrics.mainChangeCount - 1];
        const col = metrics.mainChangeColumn[metrics.mainChangeCount - 1];
        const number = metrics.mainChangeNumber[metrics.mainChangeCount - 1];

        // console.log("Applying final main change:", { row, col, number });

        // Place the number
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = number;
        setGrid(newGrid);

        // Remove affected possible options
        const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
        
        // Remove from row, column, and box
        for (let j = 0; j < 9; j++) {
          newPossibleNumbers[row][j][number - 1] = false;
          newPossibleNumbers[j][col][number - 1] = false;
        }
        
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            newPossibleNumbers[boxRow + i][boxCol + j][number - 1] = false;
          }
        }
        setPossibleNumbers(newPossibleNumbers);
        setChangeDescription("The solved puzzle is displayed above.\nClick 'Previous' to go back to the previous change or 'Reset' to start over.");
      }
      else if (lastChangeType === 'possible') {
        // Apply final possible changes
        const currentOrder = metrics.possibleChangeOrder[currentState.currentPossibleChange];
        let i = currentState.currentPossibleChange;
        const changes = [];
        
        while (i < metrics.possibleChangeOrder.length && 
               metrics.possibleChangeOrder[i] === currentOrder) {
          changes.push({
            row: metrics.possibleChangeRow[i],
            col: metrics.possibleChangeColumn[i],
            number: metrics.possibleChangeNumber[i] - 1
          });
          i++;
        }

        const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
        changes.forEach(change => {
          newPossibleNumbers[change.row][change.col][change.number] = false;
        });
        setPossibleNumbers(newPossibleNumbers);
        setChangeDescription(metrics.possibleChangeDescription[currentState.currentPossibleChangeOrder]);
      }

      // Update state for the last change
      newState = {
        ...newState,
        currentTotalChange: currentState.currentTotalChange + 1,
        currentChangeType: lastChangeType,
        previousChangeType: metrics.totalChangeType[metrics.totalChangeCount - 2]
      };
      setEndMainChangePossibleFlag(true);
    }

    setCurrentState(newState);
    // console.log("New state:", newState);
  }, [location.state, currentState, grid, possibleNumbers, highlightedPossibles, endMainChangePossibleFlag]);

  const handlePrevious = useCallback(() => {
    if (!location.state?.metrics) return;
    const metrics = location.state.metrics;

    // console.log("\n=== PREVIOUS BUTTON PRESSED ===");
    // console.log("Current state:", currentState);

    // Create a deep copy of the current state
    let newState = {
      ...currentState,
      currentTotalChange: currentState.currentTotalChange,
      currentChangeType: currentState.currentChangeType,
      previousChangeType: currentState.previousChangeType,
      currentMainChange: currentState.currentMainChange,
      currentPossibleChange: currentState.currentPossibleChange,
      currentPossibleChangeOrder: currentState.currentPossibleChangeOrder,
      currentMainPossibleChange: currentState.currentMainPossibleChange
    };

    // If at first change, reset to initial state
    if (currentState.currentTotalChange <= 1) {
      // console.log("At first change, so reset to initial state");
      handleReset();
      return;
    }

    // Special case: If we're after the last change (showing solved grid)
    if (currentState.currentTotalChange > metrics.totalChangeCount) {
      const lastChangeType = metrics.totalChangeType[metrics.totalChangeCount - 1];
      
      if (lastChangeType === 'main') {
        // Get the last change's details
        const row = metrics.mainChangeRow[metrics.mainChangeCount - 1];
        const col = metrics.mainChangeColumn[metrics.mainChangeCount - 1];

        // Remove the number
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = '';
        setGrid(newGrid);

        // Highlight the cell
        const newHighlightedCells = Array(9).fill().map(() => Array(9).fill(false));
        newHighlightedCells[row][col] = true;
        setHighlightedCells(newHighlightedCells);

        // Restore possible numbers that were removed by this main change
        const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
        let possibleCount = 0;
        let i = metrics.mainChangePossibleCount - 1;
        while (i >= 0 && metrics.mainChangePossibleOrder[i] === metrics.mainChangeCount) {
          const possibleRow = metrics.mainChangePossibleRow[i];
          const possibleCol = metrics.mainChangePossibleColumn[i];
          const possibleNum = metrics.mainChangePossibleNumber[i] - 1;
          newPossibleNumbers[possibleRow][possibleCol][possibleNum] = true;
          // console.log("Restored possible number at index, i:", i, "for row ", possibleRow + 1, ", column ", possibleCol + 1, ", number ", possibleNum + 1);
          possibleCount++;
          i--;
        }
        setPossibleNumbers(newPossibleNumbers);
        setChangeDescription(metrics.mainChangeDescription[metrics.mainChangeCount - 1]);

        newState = {
          ...newState,
          currentTotalChange: metrics.totalChangeCount,
          currentMainPossibleChange: metrics.mainChangePossibleCount - possibleCount
        };
      }

      setEndMainChangePossibleFlag(false);
      setCurrentState(newState);
      // console.log("New state:", newState);
      return;
    }

    // Clear current highlights
    if (currentState.currentChangeType === 'main') {
      setHighlightedCells(Array(9).fill().map(() => Array(9).fill(false)));
      // Update newState with the correct counts
      newState = {
        ...newState,
        currentMainChange: currentState.currentMainChange - 1
      };
    } else if (currentState.currentChangeType === 'possible') {
      setHighlightedPossibles(Array(9).fill().map(() => 
        Array(9).fill().map(() => Array(9).fill(false))
      ));

      // Count how many possible changes were in the current group
      let currentOrder = currentState.currentPossibleChangeOrder - 1;
      let i = currentState.currentPossibleChange - 1;
      let possibleCount = 0;
      
      while (i >= 0 && metrics.possibleChangeOrder[i] === currentOrder) {
        possibleCount++;
        i--;
      }

      // console.log(`Removing ${possibleCount} from currentPossibleChange`);
      // console.log("Decrementing currentPossibleChangeOrder by 1");

      // Update newState with the correct counts
      newState = {
        ...newState,
        currentPossibleChange: currentState.currentPossibleChange - possibleCount,
        currentPossibleChangeOrder: currentState.currentPossibleChangeOrder - 1
      };
    }

    if (currentState.previousChangeType === 'main') {
      // Get the previous main change details
      let row = 0;
      let col = 0;
      if (currentState.currentChangeType === 'main') {
        row = metrics.mainChangeRow[currentState.currentMainChange - 2];
        col = metrics.mainChangeColumn[currentState.currentMainChange - 2];
      } else if (currentState.currentChangeType === 'possible') {
        row = metrics.mainChangeRow[currentState.currentMainChange - 1];
        col = metrics.mainChangeColumn[currentState.currentMainChange - 1];
      }

      // Remove the number
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = '';
      setGrid(newGrid);
      // console.log(`Removed main number at row ${row + 1}, column ${col + 1}`);

      // Restore possible options that this main change eliminated
      const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
      let possibleCount = 0;
      let i = currentState.currentMainPossibleChange - 1;
      let currentOrder = currentState.currentChangeType === 'main' ? currentState.currentMainChange - 1 : currentState.currentMainChange;
      while (i < metrics.mainChangePossibleOrder.length && 
             metrics.mainChangePossibleOrder[i] === currentOrder) {
        const possibleRow = metrics.mainChangePossibleRow[i];
        const possibleCol = metrics.mainChangePossibleColumn[i];
        const possibleNum = metrics.mainChangePossibleNumber[i] - 1;
        newPossibleNumbers[possibleRow][possibleCol][possibleNum] = true;
        // console.log("Restored possible number at index, i:", i, "for row ", possibleRow + 1, ", column ", possibleCol + 1, ", number ", possibleNum + 1);
        possibleCount++;
        i--;
      }
      // console.log(`Restored ${possibleCount} possible numbers`);
      setPossibleNumbers(newPossibleNumbers);

      // Highlight the cell we just removed
      const newHighlightedCells = Array(9).fill().map(() => Array(9).fill(false));
      newHighlightedCells[row][col] = true;
      setHighlightedCells(newHighlightedCells);
      setChangeDescription(metrics.mainChangeDescription[currentOrder - 1]);

      let previousChangeIndex = currentState.currentTotalChange - 3;
      //let previousChangeIndex = currentState.currentChangeType === 'main' ? currentState.currentTotalChange - 3 : currentState.currentTotalChange - 2;

      newState = {
        ...newState,
        currentTotalChange: currentState.currentTotalChange - 1,
        currentChangeType: metrics.totalChangeType[previousChangeIndex + 1],
        previousChangeType: currentState.currentTotalChange > 1 ? 
          metrics.totalChangeType[previousChangeIndex] : null,
        currentMainPossibleChange: currentState.currentMainPossibleChange - possibleCount
      };
    }
    else if (currentState.previousChangeType === 'possible') {
      let possibleChangeDecrement = currentState.currentChangeType === 'main' ? 1 : 2;
      let currentOrder = currentState.currentPossibleChangeOrder - possibleChangeDecrement;
      let i = newState.currentPossibleChange - 1;
      const changes = [];
      
      // Find all changes with the same order
      while (i >= 0 && metrics.possibleChangeOrder[i] === currentOrder) {
        changes.push({
          row: metrics.possibleChangeRow[i],
          col: metrics.possibleChangeColumn[i],
          number: metrics.possibleChangeNumber[i] - 1
        });
        i--;
      }

      // Restore and highlight all changes at once
      const newPossibleNumbers = possibleNumbers.map(r => r.map(c => [...c]));
      const newHighlightedPossibles = Array(9).fill().map(() => 
        Array(9).fill().map(() => Array(9).fill(false))
      );

      changes.forEach(change => {
        newPossibleNumbers[change.row][change.col][change.number] = true;
        newHighlightedPossibles[change.row][change.col][change.number] = true;
        // console.log("Restored possible number at row ", change.row + 1, ", column ", change.col + 1, ", number ", change.number + 1);
      });

      setPossibleNumbers(newPossibleNumbers);
      setHighlightedPossibles(newHighlightedPossibles);
      setChangeDescription(metrics.possibleChangeDescription[currentState.currentPossibleChangeOrder - possibleChangeDecrement]);

      newState = {
        ...newState,
        currentTotalChange: currentState.currentTotalChange - 1,
        currentChangeType: metrics.totalChangeType[currentState.currentTotalChange - 2],
        previousChangeType: currentState.currentTotalChange > 2 ? 
          metrics.totalChangeType[currentState.currentTotalChange - 3] : null
      };
    }

    setCurrentState(newState);
    // console.log("New state:", newState);
  }, [location.state, currentState, grid, possibleNumbers, handleReset]);

  useEffect(() => {
    if (location.state) {
      const initialGrid = location.state.originalGrid.map((row, i) => 
        row.map((cell, j) => cell === '' ? null : cell)
      );
      setGrid(initialGrid);
      const initialPossibles = initializePossibleNumbers(location.state.originalGrid);
      setPossibleNumbers(initialPossibles);
    }
  }, [location.state]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add all necessary checks
      if (!location.state?.metrics || 
          !grid || 
          !possibleNumbers || 
          !currentState) {
        return;
      }
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }
    };

    // Only add the listener if we have all required data
    if (location.state?.metrics && grid && possibleNumbers && currentState) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [
    location.state, 
    handleNext, 
    handlePrevious, 
    grid, 
    possibleNumbers, 
    currentState
  ]);

  // Early return after hooks
  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { originalGrid, startingNumbers, solution, metrics, changes } = location.state;

  return (
    <div className="changes-page">
      <BackButton />
      <h1>Change Walkthrough</h1>
      <div className="changes-grid-container">
        <div className="changes-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((cell, colIndex) => (
                <ChangesCell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  possibleNumbers={possibleNumbers[rowIndex][colIndex]}
                  highlightedPossibles={highlightedPossibles[rowIndex][colIndex]}
                  isHighlighted={highlightedCells[rowIndex][colIndex]}
                  isStartingNumber={startingNumbers[rowIndex][colIndex]}
                />
              ))}
            </div>
          ))}
        </div>
        
        <div className="changes-controls">
          <button onClick={handleNext}>Next</button>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="changes-info">
        {currentState.currentTotalChange > 0 && currentState.currentTotalChange <= metrics.totalChangeCount && (
          <div className="change-header">
            <div className="change-number">
              Change #{currentState.currentTotalChange}
            </div>
            <div className="change-type">
              {currentState.currentChangeType === 'main' ? (
                <span>Method: {metrics.mainChangeMethod[currentState.currentMainChange - 1]}</span>
              ) : currentState.currentChangeType === 'possible' ? (
                <span>Method: {metrics.possibleChangeMethod[currentState.currentPossibleChangeOrder - 1]}</span>
              ) : (
                <span>Type: None</span>
              )}
            </div>
          </div>
        )}
        <div className="change-description">
          {changeDescription}
        </div>
      </div>

      <div className="changes-controls-bottom">
        <button 
          className="control-button back-button"
          onClick={() => {
            navigate('/', {
              state: {
                grid: solution,
                startingNumbers,
                isSolved: true,
                solutionData: {
                  originalGrid,
                  startingNumbers,
                  solution,
                  metrics,
                  changes
                }
              }
            });
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ChangesPage; 