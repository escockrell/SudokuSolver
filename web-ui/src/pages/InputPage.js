import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
//import ControlPanel from '../components/ControlPanel';

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

  const handleSolve = () => {
    // TODO: Call Java solver service
    // For now, just navigate to results page with current grid
    navigate('/results', { state: { grid, startingNumbers } });
  };

  return (
    <div className="input-page">
      <h1>Sudoku Solver</h1>
      <SudokuGrid 
        grid={grid}
        onCellChange={handleCellChange}
        startingNumbers={startingNumbers}
      />
      {/*<ControlPanel onSolve={handleSolve} />*/}
    </div>
  );
};

export default InputPage; 