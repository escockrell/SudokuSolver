import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import ControlPanel from '../components/ControlPanel';
import PortfolioButton from '../components/PortfolioButton';
// import { solvePuzzle } from '../services/SolverService'; // API call
// import { solvePuzzle } from '../components/Solver'; // original solver logic
import { solvePuzzle as solvePuzzle_v2 } from '../components/Solver_v2'; // improved solver logic
import './InputPage.css';

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
    <div className="loading-text">Solving puzzle...</div>
  </div>
);

const MetricsDisplay = ({ difficulty, solveTime }) => (
  <div className="metrics-display">
    <div className="metric">
      <span className="metric-label">Difficulty:</span>
      <span className="metric-value">{difficulty}</span>
    </div>
    <div className="metric">
      <span className="metric-label">Solve Time:</span>
      <span className="metric-value">{solveTime ? `${solveTime.toFixed(2)} ms` : '-'}</span>
    </div>
  </div>
);

const InputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state with location state if available
  const [grid, setGrid] = useState(() => {
    return location.state?.grid || Array(9).fill().map(() => Array(9).fill(''));
  });
  
  const [startingNumbers, setStartingNumbers] = useState(() => {
    return location.state?.startingNumbers || Array(9).fill().map(() => Array(9).fill(false));
  });
  
  const [isSolved, setIsSolved] = useState(() => {
    return location.state?.isSolved || false;
  });
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solutionData, setSolutionData] = useState(() => {
    return location.state?.solutionData || null;
  });
  const [metrics, setMetrics] = useState(() => {
    return location.state?.solutionData ? {
      difficulty: location.state.solutionData.metrics.difficulty,
      solveTime: location.state.solutionData.metrics.solveTime
    } : {
      difficulty: null,
      solveTime: null
    };
  });

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
          setError(`Invalid puzzle: Group ${3*i + j + 1} has duplicate numbers`);
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
    if (!validatePuzzle()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const puzzleInput = grid.map(row => 
        row.map(cell => cell === '' ? '0' : cell).join('')
      ).join('');

      // Add a small delay to allow the loading state to render
      await new Promise(resolve => setTimeout(resolve, 0));

      // const response = await solvePuzzle(puzzleInput); // API call
      // const response = solvePuzzle(puzzleInput); // original solver logic
      const response_v2 = solvePuzzle_v2(puzzleInput); // improved solver logic
        
      console.log("Solving puzzle: ", puzzleInput);
      console.log("Solved: ", response_v2.metrics.solved);
      console.log("Difficulty: ", response_v2.metrics.difficulty);
      console.log(`Solver: Puzzle solved in ${response_v2.metrics.solveTime.toFixed(2)} milliseconds`);
      console.log("response: ", response_v2);
      
      // Convert solution string to grid by splitting into chunks of 9
      const solutionGrid = [];
      for (let i = 0; i < 9; i++) {
        const row = response_v2.solution.slice(i * 9, (i + 1) * 9).split('');
        solutionGrid.push(row);
      }
      
      // Create deep copy of original grid before setting solution
      const originalGridCopy = grid.map(row => [...row]);
      
      setGrid(solutionGrid);
      setIsSolved(true);
      
      // Update metrics
      setMetrics({
        difficulty: response_v2.metrics.difficulty,
        solveTime: response_v2.metrics.solveTime
      });
      
      // Store solution data for later use
      setSolutionData({
        originalGrid: originalGridCopy,
        startingNumbers: startingNumbers.map(row => [...row]),
        solution: solutionGrid,
        metrics: response_v2.metrics,
        changes: response_v2.changes
      });
    } catch (error) {
      console.error('Error solving puzzle:', error);
      setError('Unable to solve this puzzle. Please check if it is valid.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResults = () => {
    if (solutionData) {
      navigate('/results', { state: solutionData });
    }
  };

  const handleViewChanges = () => {
    if (solutionData) {
      navigate('/changes', { state: solutionData });
    }
  };

  return (
    <div className="input-page">
      <PortfolioButton />
      <h1>Sudoku Solver</h1>
      {error && <div className="error-message">{error}</div>}
      <div className={`content ${isLoading ? 'disabled' : ''}`}>
        {isSolved && (
          <MetricsDisplay 
            difficulty={metrics.difficulty}
            solveTime={metrics.solveTime}
          />
        )}
        <SudokuGrid 
          grid={grid}
          onCellChange={handleCellChange}
          startingNumbers={startingNumbers}
          isReadOnly={isSolved || isLoading}
        />
        <ControlPanel 
          onReset={handleReset}
          onSolve={handleSolve}
          onViewResults={handleViewResults}
          onViewChanges={handleViewChanges}
          isSolved={isSolved}
          disabled={isLoading}
        />
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default InputPage; 