import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import ChangesCell from '../components/ChangesCell';
import './ChangesPage.css';

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
    currentMainPossibleChange: 0,
    currentMainPossibleOrder: 0
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

  // Helper function to check if a number is valid in a cell
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

  // Initialize possible numbers based on starting grid
  const initializePossibleNumbers = (grid) => {
    const possibles = Array(9).fill().map(() => 
      Array(9).fill().map(() => Array(9).fill(false))
    );

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === '' || grid[row][col] === null) {
          // For empty cells, check each number 1-9
          for (let num = 1; num <= 9; num++) {
            possibles[row][col][num - 1] = isNumberPossible(row, col, num, grid);
          }
        }
      }
    }
    return possibles;
  };

  useEffect(() => {
    if (location.state) {
      // Set initial grid state
      const initialGrid = location.state.originalGrid.map((row, i) => 
        row.map((cell, j) => cell === '' ? null : cell)
      );
      setGrid(initialGrid);

      // Initialize possible numbers based on starting grid
      const initialPossibles = initializePossibleNumbers(location.state.originalGrid);
      console.log('Initial possibles:', initialPossibles);
      setPossibleNumbers(initialPossibles);
    }
  }, [location.state]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { originalGrid, startingNumbers, solution, metrics, changes } = location.state;

  const handleNext = () => {
    // TODO: Implement next change logic using changes array
  };

  const handlePrevious = () => {
    // TODO: Implement previous change logic
  };

  const handleReset = () => {
    setCurrentState({
      currentTotalChange: 0,
      currentChangeType: null,
      previousChangeType: null,
      currentMainChange: 0,
      currentPossibleChange: 0,
      currentPossibleChangeOrder: 0,
      currentMainPossibleChange: 0,
      currentMainPossibleOrder: 0
    });
    setGrid(originalGrid.map(row => [...row]));
    setPossibleNumbers(initializePossibleNumbers(originalGrid));
    setHighlightedCells(Array(9).fill().map(() => Array(9).fill(false)));
    setChangeDescription("Changes will be shown when you click 'Next'");
  };

  const handleBack = () => {
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
  };

  return (
    <div className="changes-page">
      <div className="changes-grid-container">
        <div className="sudoku-grid changes-grid">
          {grid.map((row, i) => (
            row.map((cell, j) => (
              <ChangesCell
                key={`${i}-${j}`}
                value={cell}
                possibleNumbers={possibleNumbers[i][j]}
                isHighlighted={highlightedCells[i][j]}
                isStartingNumber={startingNumbers[i][j]}
              />
            ))
          ))}
        </div>
        
        <div className="changes-controls">
          <button onClick={handleNext}>Next</button>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="changes-info">
        <div className="change-number">
          Change #{currentState.currentTotalChange}
        </div>
        <div className="change-type">
          Type: {currentState.currentChangeType || 'None'}
        </div>
        <div className="change-description">
          {changeDescription}
        </div>
      </div>

      <div className="changes-controls-bottom">
        <button 
          className="control-button back-button"
          onClick={handleBack}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ChangesPage; 