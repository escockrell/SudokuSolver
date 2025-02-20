import React, { useRef } from 'react';
import SudokuCell from './SudokuCell';
import './SudokuGrid.css';

const SudokuGrid = ({ grid, onCellChange, startingNumbers }) => {
  const cellRefs = useRef(Array(9).fill().map(() => Array(9).fill(null)));

  const handleNavigate = (row, col) => {
    // Ensure row and col are within bounds
    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
      cellRefs.current[row][col]?.focus();
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