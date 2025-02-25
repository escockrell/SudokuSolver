import React, { useLocation } from 'react';
import SudokuGrid from '../components/SudokuGrid';
import MetricCard from '../components/MetricCard';
import StepsList from '../components/StepsList';

const ResultsPage = () => {
  const location = useLocation();
  const { originalGrid, startingNumbers, solution, steps, metrics } = location.state;

  return (
    <div className="results-page">
      <h1>Solution</h1>
      
      {/* Display grids */}
      <div className="grid-comparison">
        <div>
          <h2>Original</h2>
          <SudokuGrid grid={originalGrid} startingNumbers={startingNumbers} />
        </div>
        <div>
          <h2>Solution</h2>
          <SudokuGrid grid={convertSolutionToGrid(solution)} />
        </div>
      </div>

      {/* Display solving metrics */}
      <div className="solving-metrics">
        <h2>Solving Statistics</h2>
        <div className="metrics-grid">
          <MetricCard 
            title="Level 0 Changes" 
            value={metrics.levelZeroChanges}
            details={[
              `One in Row: ${metrics.oneInARowChanges}`,
              `One in Column: ${metrics.oneInAColumnChanges}`,
              `One in Group: ${metrics.oneInAGroupChanges}`,
              `One in Cell: ${metrics.oneInACellChanges}`
            ]}
          />
          {/* Add more MetricCard components for other levels */}
        </div>
      </div>

      {/* Display solving steps */}
      <div className="solving-steps">
        <h2>Solving Steps</h2>
        <StepsList steps={steps} />
      </div>
    </div>
  );
};

export default ResultsPage; 