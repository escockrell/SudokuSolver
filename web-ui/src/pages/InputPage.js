import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import ControlPanel from '../components/ControlPanel';
import { solvePuzzle } from '../services/SolverService';

const InputPage = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [startingNumbers, setStartingNumbers] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  const [isSolved, setIsSolved] = useState(false);

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
      const puzzleInput = grid.map(row => 
        row.map(cell => cell === '' ? '0' : cell).join('')
      ).join('');

      console.log("Sending puzzle:", puzzleInput);
      const response = await solvePuzzle(puzzleInput);
      console.log("Received solution:", response);
      
      // Convert solution string back to 2D array and update grid
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
      
      // Store metrics for later use
      // You can either navigate to results page or show metrics in a different way
    } catch (error) {
      console.error('Error solving puzzle:', error);
    }
  };

  return (
    <div className="input-page">
      <h1>Sudoku Solver</h1>
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