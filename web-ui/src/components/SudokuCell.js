import React, { forwardRef } from 'react';
import './SudokuCell.css';

const SudokuCell = forwardRef(({ value, onChange, isStartingNumber, row, col, onNavigate }, ref) => {
  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent default for all keys
    
    // Navigation keys
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        onNavigate(row - 1, col);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        onNavigate(row + 1, col);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        onNavigate(row, col - 1);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        onNavigate(row, col + 1);
        break;
      case 'Backspace':
      case 'Delete':
        onChange('');
        break;
      default:
        // If key is a number 1-9, immediately set it
        if (/^[1-9]$/.test(e.key)) {
          onChange(e.key);
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