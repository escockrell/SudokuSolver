import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import ControlPanel from '../components/ControlPanel';
import PortfolioButton from '../components/PortfolioButton';
// import { solvePuzzle } from '../services/SolverService';
import { solvePuzzle} from '../components/Solver';
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

      // const response = await solvePuzzle(puzzleInput); // API call
      // console.log("response: ", response);

      const puzzleInputTemp1 = "000705030000040500057000240060300000080000000001009026005400070019070000708002019";
      const puzzleInputTemp2 = "050361000070002300036000900003605407600004000000008000700120003000879600061540800";
      const puzzleInputTemp3 = "815002000600500090700830000200000050490300007007080904300070648970000000000008009";
      const puzzleInputTemp4 = "031005204004300010500010000050700038007002000008500600800050003105400090063009100";
      const puzzleInputTemp5 = "350400780107390204090000100000207800000000940040981600900070510010529070000000000";
      const puzzleInputTemp6 = "304080501000009070086000490007050036903800010050000000000000000200075060630100057";
      const puzzleInputTemp7 = "308054000500930200906000500000000790005003000730100400070200006800000000000468000";
      const puzzleInputTemp8 = "040901030009072050700300019007200000230100075900080000602000007401007080503809100";
      const puzzleInputTemp9 = "070930000200140006000806000000009610010208409090010002904700030530004000108003760";
      const puzzleInputTemp10 = "800060740000000002020390010092000680013600000080000400008000120040285906200700004";
      const puzzleInputTemp11 = "030000080100000200705860039000002300000480010600005020004700102261000873000028906";
      const puzzleInputTemp12 = "010000009820513067007890002000070290200000000003040000900480603000035000130002980";
      const puzzleInputTemp13 = "490035028002401500005090360000006000100049070054000081000700042000160030000020800";
      const puzzleInputTemp14 = "000400003050020800000070050683051094700000608000800070961000000020697015500002006";
      const puzzles = [
        puzzleInputTemp1, 
        puzzleInputTemp2, 
        puzzleInputTemp3, 
        puzzleInputTemp4, 
        puzzleInputTemp5, 
        puzzleInputTemp6, 
        puzzleInputTemp7, 
        puzzleInputTemp8,
        puzzleInputTemp9,
        puzzleInputTemp10,
        puzzleInputTemp11,
        puzzleInputTemp12,
        puzzleInputTemp13,
        puzzleInputTemp14
      ];
      let response;
      puzzles.forEach(puzzle => {
        response = solvePuzzle(puzzle);
        // if (!response.metrics.solved) {
          console.log("Solving puzzle: ", puzzle);
          console.log("solved: ", response.metrics.solved);
          console.log(`Puzzle solved in ${response.metrics.solveTime.toFixed(2)} milliseconds`);
          console.log("response: ", response);
        // }
      });

      // *** Delete after testing ***
        // Set grid to starting values of last puzzle
        const startingGrid = [];
        const lastPuzzle = puzzles[puzzles.length - 1];
        for (let i = 0; i < 9; i++) {
          const row = lastPuzzle.slice(i * 9, (i + 1) * 9).split('').map(val => val === '0' ? '' : val);
          startingGrid.push(row);
        }
        setGrid(startingGrid);

        // Update starting numbers based on last puzzle
        const newStartingNumbers = startingGrid.map(row => 
          row.map(cell => cell !== '')
        );
        setStartingNumbers(newStartingNumbers);
      // ***Break***
      
      // Convert solution string to grid by splitting into chunks of 9
      const solutionGrid = [];
      for (let i = 0; i < 9; i++) {
        const row = response.solution.slice(i * 9, (i + 1) * 9).split('');
        solutionGrid.push(row);
      }
      
      // Create deep copy of original grid before setting solution
      const originalGridCopy = grid.map(row => [...row]);
      
      setGrid(solutionGrid);
      setIsSolved(true);
      
      // Store solution data for later use
      setSolutionData({
        // originalGrid: originalGridCopy,
        originalGrid: startingGrid, // delete and use above line after testing
        startingNumbers: startingNumbers.map(row => [...row]),
        solution: solutionGrid,
        metrics: response.metrics,
        changes: response.changes
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