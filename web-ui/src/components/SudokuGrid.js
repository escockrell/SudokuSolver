import React, { useRef } from 'react';
import SudokuCell from './SudokuCell';
import './SudokuGrid.css';

const SudokuGrid = ({ grid, onCellChange, startingNumbers, isReadOnly }) => {
  const cellRefs = useRef(Array(9).fill().map(() => Array(9).fill(null)));

  const handleNavigate = (row, col) => {
    // Ensure row and col are within bounds
    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
      cellRefs.current[row][col]?.focus();
    }
  };

  const handleCellChange = (row, col, value) => {
    if (isReadOnly) return; // Prevent changes if grid is read-only
    
    // Only allow numbers 1-9 and empty string
    if (value === '' || (value.length === 1 && /[1-9]/.test(value))) {
      onCellChange(row, col, value);
    }
  };

  return (
    <div className="sudoku-grid">
      {Array(9).fill().map((_, row) => (
        <div key={row} className="grid-row">
          {Array(9).fill().map((_, col) => (
            <SudokuCell
              key={`${row}-${col}`}
              ref={el => cellRefs.current[row][col] = el}
              value={grid[row][col]}
              isStartingNumber={startingNumbers[row][col]}
              isReadOnly={isReadOnly}
              onChange={(value) => onCellChange(row, col, value)}
              row={row}
              col={col}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid; 