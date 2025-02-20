import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import ControlPanel from '../components/ControlPanel';
import { solvePuzzle } from '../services/SolverService';

const InputPage = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [startingNumbers, setStartingNumbers] = useState(Array(9).fill().map(() => Array(9).fill(false)));

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);

    const newStartingNumbers = startingNumbers.map(r => [...r]);
    newStartingNumbers[row][col] = value !== '';
    setStartingNumbers(newStartingNumbers);
  };

  const handleReset = () => {
    setGrid(Array(9).fill().map(() => Array(9).fill('')));
    setStartingNumbers(Array(9).fill().map(() => Array(9).fill(false)));
  };

  const handleSolve = async () => {
    try {
      // Convert grid to format expected by solver
      const puzzleInput = grid.map(row => 
        row.map(cell => cell === '' ? '0' : cell).join('')
      ).join('');

      console.log("Puzzle Input: ", puzzleInput);

      const response = await solvePuzzle(puzzleInput);
      
      // Navigate to results page with the solution
      navigate('/results', { 
        state: { 
          originalGrid: grid,
          startingNumbers,
          solution: response.solution,
          steps: response.steps 
        } 
      });
    } catch (error) {
      console.error('Error solving puzzle:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="input-page">
      <h1>Sudoku Solver</h1>
      <SudokuGrid 
        grid={grid}
        onCellChange={handleCellChange}
        startingNumbers={startingNumbers}
      />
      <ControlPanel 
        onReset={handleReset}
        onSolve={handleSolve}
      />
    </div>
  );
};

export default InputPage; 