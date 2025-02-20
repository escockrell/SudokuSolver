import React, { forwardRef } from 'react';
import './SudokuCell.css';

const SudokuCell = forwardRef(({ value, onChange, isStartingNumber, row, col, onNavigate }, ref) => {
  const handleKeyDown = (e) => {
    // Navigation keys
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        onNavigate(row - 1, col);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        onNavigate(row + 1, col);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        onNavigate(row, col - 1);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        onNavigate(row, col + 1);
        break;
      case 'Backspace':
      case 'Delete':
        e.preventDefault();
        onChange('');
        break;
      default:
        // Only allow numbers 1-9
        if (!/^[1-9]$/.test(e.key)) {
          e.preventDefault();
        }
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      className={`sudoku-cell ${isStartingNumber ? 'starting-number' : ''}`}
      value={value || ''}
      onChange={(e) => {
        const val = e.target.value;
        // Only update if empty or single digit 1-9
        if (val === '' || /^[1-9]$/.test(val)) {
          onChange(val);
        }
      }}
      onKeyDown={handleKeyDown}
      maxLength={1}
    />
  );
});

export default SudokuCell; 