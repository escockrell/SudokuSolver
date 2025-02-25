import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import ControlPanel from '../components/ControlPanel';
import { solvePuzzle } from '../services/SolverService';
import './InputPage.css';

const InputPage = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [startingNumbers, setStartingNumbers] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  const [isSolved, setIsSolved] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to check if array has duplicates (ignoring empty cells)
  const hasDuplicates = (arr) => {
    const numbers = arr.filter(val => val !== '');
    return new Set(numbers).size !== numbers.length;
  };

  // Check for duplicates in row
  const hasRowDuplicates = (rowIndex) => {
    return hasDuplicates(grid[rowIndex]);
  };

  // Check for duplicates in column
  const hasColumnDuplicates = (colIndex) => {
    const column = grid.map(row => row[colIndex]);
    return hasDuplicates(column);
  };

  // Check for duplicates in 3x3 group
  const hasGroupDuplicates = (groupRow, groupCol) => {
    const numbers = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = grid[groupRow * 3 + i][groupCol * 3 + j];
        if (value !== '') {
          numbers.push(value);
        }
      }
    }
    return new Set(numbers).size !== numbers.length;
  };

  // Count total given digits
  const countGivenDigits = () => {
    return grid.flat().filter(cell => cell !== '').length;
  };

  // Validate entire puzzle
  const validatePuzzle = () => {
    // Check for minimum 17 digits
    if (countGivenDigits() < 17) {
      setError('Invalid puzzle: Must have at least 17 given digits');
      return false;
    }

    // Check rows for duplicates
    for (let i = 0; i < 9; i++) {
      if (hasRowDuplicates(i)) {
        setError(`Invalid puzzle: Row ${i + 1} has duplicate numbers`);
        return false;
      }
    }

    // Check columns for duplicates
    for (let i = 0; i < 9; i++) {
      if (hasColumnDuplicates(i)) {
        setError(`Invalid puzzle: Column ${i + 1} has duplicate numbers`);
        return false;
      }
    }

    // Check 3x3 groups for duplicates
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (hasGroupDuplicates(i, j)) {
          setError(`Invalid puzzle: Group at position ${i + 1},${j + 1} has duplicate numbers`);
          return false;
        }
      }
    }

    setError(null);
    return true;
  };

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);

    const newStartingNumbers = startingNumbers.map(r => [...r]);
    newStartingNumbers[row][col] = value !== '';
    setStartingNumbers(newStartingNumbers);

    // Clear any existing error when user makes changes
    setError(null);
  };

  const handleReset = () => {
    setGrid(Array(9).fill().map(() => Array(9).fill('')));
    setStartingNumbers(Array(9).fill().map(() => Array(9).fill(false)));
    setIsSolved(false);
    setError(null);
  };

  const handleSolve = async () => {
    // Validate puzzle before sending to API
    if (!validatePuzzle()) {
      return; // Stop if validation fails
    }

    try {
      const puzzleInput = grid.map(row => 
        row.map(cell => cell === '' ? '0' : cell).join('')
      ).join('');

      console.log("Sending puzzle:", puzzleInput);
      const response = await solvePuzzle(puzzleInput);
      console.log("Received solution:", response);
      
      const solutionGrid = [];
      for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          row.push(response.solution[i * 9 + j]);
        }
        solutionGrid.push(row);
      }
      setGrid(solutionGrid);
      setIsSolved(true);
    } catch (error) {
      console.error('Error solving puzzle:', error);
      setError('Error solving puzzle. Please try again.');
    }
  };

  return (
    <div className="input-page">
      <h1>Sudoku Solver</h1>
      {error && <div className="error-message">{error}</div>}
      <SudokuGrid 
        grid={grid}
        onCellChange={handleCellChange}
        startingNumbers={startingNumbers}
        isReadOnly={isSolved}
      />
      <ControlPanel 
        onReset={handleReset}
        onSolve={handleSolve}
        isSolved={isSolved}
      />
    </div>
  );
};

export default InputPage; 