import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import ControlPanel from '../components/ControlPanel';
import PortfolioButton from '../components/PortfolioButton';
// import { solvePuzzle } from '../services/SolverService'; // API call
import { solvePuzzle } from '../components/Solver';
import { solvePuzzle as solvePuzzle_v2 } from '../components/Solver_v2';
import './InputPage.css';

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
    <div className="loading-text">Solving puzzle...</div>
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
    // if (!validatePuzzle()) {
    //   return;
    // }

    setIsLoading(true);
    setError(null);

    try {
      const puzzleInput = grid.map(row => 
        row.map(cell => cell === '' ? '0' : cell).join('')
      ).join('');

      const startPuzzle1 = "578001600160050003002609001006003000010008365003100924300762000080000030701000000";
      const startPuzzle2 = "900320050600085000800000060030000900000602003400090020304250000000007301160008000";
      const startPuzzle3 = "000705030000040500057000240060300000080000000001009026005400070019070000708002019";
      const startPuzzle4 = "000200005004705030000001270037500002000300640901020000800004300300800000005900806";
      const startPuzzle5 = "020708450058040207640259010000000100000567040004801000000000001209005080036900000";
      const startPuzzle6 = "200000630063000000450630200600180000300007905000900004901500000006001000080000140";
      const startPuzzle7 = "030600000007040000940080050000908500008003902000400083073050060209000010010204005";
      const startPuzzle8 = "200080000000070600497602001030100206140000009009000015060900100000005900005010708";
      const startPuzzle9 = "938701025250006103000003000570009000680015007010007508020100090145000300000000000";
      const startPuzzle10 = "140060000209040700500000040400080070900650003080020005002000507004008310000203000";

      const startPuzzles = [
        startPuzzle1, 
        // startPuzzle2, 
        // startPuzzle3, 
        // startPuzzle4, 
        // startPuzzle5,
        // startPuzzle6,
        // startPuzzle7,
        // startPuzzle8,
        // startPuzzle9,
        // startPuzzle10
      ];

      // const response = await solvePuzzle(puzzleInput); // API call
      // const response = solvePuzzle(puzzleInput); // local call

      let response;
      let response_v2;

      startPuzzles.forEach(puzzle => {
        response = solvePuzzle(puzzle);
        response_v2 = solvePuzzle_v2(puzzle);
        
        // console.log("Solving puzzle: ", puzzleInput);
        console.log("Solving puzzle: ", puzzle); // TODO: Remove after testing

        // console.log("Solver metrics");
        // console.log("solved: ", response.metrics.solved);
        console.log(`Solver: Puzzle solved in ${response.metrics.solveTime.toFixed(2)} milliseconds`);
        console.log("response: ", response);
        
        // console.log("Solver_v2 metrics");
        // console.log("solved: ", response_v2.metrics.solved);
        console.log(`Solver_v2: Puzzle solved in ${response_v2.metrics.solveTime.toFixed(2)} milliseconds`);
        console.log("response_v2: ", response_v2);

        const timeDiff = Math.abs(response_v2.metrics.solveTime - response.metrics.solveTime);
        const winner = response_v2.metrics.solveTime < response.metrics.solveTime ? "Solver_v2" : "Solver";
        console.log(`${winner} wins by ${timeDiff.toFixed(2)} milliseconds`);
      });

      // Convert solution string to grid by splitting into chunks of 9
      const solutionGrid = [];
      for (let i = 0; i < 9; i++) {
        const row = response_v2.solution.slice(i * 9, (i + 1) * 9).split('');
        solutionGrid.push(row);
      }
      
      // Create deep copy of original grid before setting solution
      // const originalGridCopy = grid.map(row => [...row]); // TODO: Uncomment after testing
      
      // Create test grid for debugging
      const originalGridCopy = [];
      for (let i = 0; i < 9; i++) {
        const row = startPuzzle1.slice(i * 9, (i + 1) * 9).split('').map(num => num === '0' ? '' : num);
        originalGridCopy.push(row);
      }
      
      setGrid(solutionGrid);
      setIsSolved(true);
      
      // Store solution data for later use
      setSolutionData({
        originalGrid: originalGridCopy,
        // startingNumbers: startingNumbers.map(row => [...row]), // TODO: Uncomment after testing
        startingNumbers: originalGridCopy,
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