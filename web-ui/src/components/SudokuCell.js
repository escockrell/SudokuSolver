import React, { forwardRef } from 'react';
import './SudokuCell.css';

const SudokuCell = forwardRef(({ 
  value, 
  isStartingNumber, 
  isReadOnly,
  onChange, 
  row, 
  col, 
  onNavigate 
}, ref) => {
  const handleKeyDown = (e) => {
    if (isReadOnly) return; // Prevent navigation if read-only

    e.preventDefault(); // Prevent default for all keys

    // Navigation keys
    switch(e.key) {
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
        break;
    }
  };

  const handleChange = (e) => {
    if (isReadOnly) return; // Prevent changes if read-only
    
    const value = e.target.value;
    if (value === '' || (value.length === 1 && /[1-9]/.test(value))) {
      onChange(value);
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      className={`sudoku-cell ${isStartingNumber ? 'starting-number' : ''} ${isReadOnly ? 'read-only' : ''}`}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength="1"
      readOnly={isReadOnly}
    />
  );
});

export default SudokuCell; 