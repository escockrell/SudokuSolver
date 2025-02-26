import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import './ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to input page if there's no state
  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { metrics, solution, originalGrid, startingNumbers } = location.state;

  const handleBack = () => {
    navigate('/', {
      state: {
        grid: solution,
        startingNumbers,
        isSolved: true,
        solutionData: {
          originalGrid,
          startingNumbers,
          solution,
          metrics
        }
      }
    });
  };

  // Helper function to safely sum numbers that might be undefined
  const safeSum = (...numbers) => {
    return numbers.reduce((sum, num) => sum + (num || 0), 0);
  };

  return (
    <div className="results-page">
      <h1>Solving Statistics</h1>
      
      <div className="metrics-container">
        <MetricCard 
          title="Level 0 Changes" 
          value={metrics.levelZeroChanges}
          details={[
            {
              name: 'One in Row',
              value: metrics.oneInARowChanges
            },
            {
              name: 'One in Column',
              value: metrics.oneInAColumnChanges
            },
            {
              name: 'One in Group',
              value: metrics.oneInAGroupChanges
            },
            {
              name: 'One in Cell',
              value: metrics.oneInACellChanges
            }
          ]}
        />
        <MetricCard 
          title="Level 1 Changes"
          value={metrics.levelOneChanges}
          details={[
            {
              name: 'Phantom',
              value: metrics.phantomRowChanges + metrics.phantomColumnChanges + metrics.phantomGroupChanges,
              subDetails: [
                { name: 'Row', value: metrics.phantomRowChanges },
                { name: 'Column', value: metrics.phantomColumnChanges },
                { name: 'Group', value: metrics.phantomGroupChanges }
              ]
            },
            {
              name: 'Naked Pair',
              value: metrics.nakedPairRowChanges + metrics.nakedPairColumnChanges + metrics.nakedPairGroupChanges,
              subDetails: [
                { name: 'Row', value: metrics.nakedPairRowChanges },
                { name: 'Column', value: metrics.nakedPairColumnChanges },
                { name: 'Group', value: metrics.nakedPairGroupChanges }
              ]
            },
            {
              name: 'Hidden Pair',
              value: metrics.hiddenPairRowChanges + metrics.hiddenPairColumnChanges + metrics.hiddenPairGroupChanges,
              subDetails: [
                { name: 'Row', value: metrics.hiddenPairRowChanges },
                { name: 'Column', value: metrics.hiddenPairColumnChanges },
                { name: 'Group', value: metrics.hiddenPairGroupChanges }
              ]
            }
          ]}
        />
        <MetricCard 
          title="Level 2 Changes"
          value={metrics.levelTwoChanges}
          details={[
            {
              name: 'Naked Triple',
              value: safeSum(
                metrics.nakedTripleRowChanges,
                metrics.nakedTripleColumnChanges,
                metrics.nakedTripleGroupChanges
              ),
              subDetails: [
                { name: 'Row', value: metrics.nakedTripleRowChanges || 0 },
                { name: 'Column', value: metrics.nakedTripleColumnChanges || 0 },
                { name: 'Group', value: metrics.nakedTripleGroupChanges || 0 }
              ]
            },
            {
              name: 'Hidden Triple',
              value: safeSum(
                metrics.hiddenTripleRowChanges,
                metrics.hiddenTripleColumnChanges,
                metrics.hiddenTripleGroupChanges
              ),
              subDetails: [
                { name: 'Row', value: metrics.hiddenTripleRowChanges || 0 },
                { name: 'Column', value: metrics.hiddenTripleColumnChanges || 0 },
                { name: 'Group', value: metrics.hiddenTripleGroupChanges || 0 }
              ]
            },
            {
              name: 'Naked Quad',
              value: safeSum(
                metrics.nakedQuadRowChanges,
                metrics.nakedQuadColumnChanges,
                metrics.nakedQuadGroupChanges
              ),
              subDetails: [
                { name: 'Row', value: metrics.nakedQuadRowChanges || 0 },
                { name: 'Column', value: metrics.nakedQuadColumnChanges || 0 },
                { name: 'Group', value: metrics.nakedQuadGroupChanges || 0 }
              ]
            },
            {
              name: 'X Wing',
              value: safeSum(metrics.xwingRowChanges, metrics.xwingColumnChanges),
              subDetails: [
                { name: 'Row', value: metrics.xwingRowChanges || 0 },
                { name: 'Column', value: metrics.xwingColumnChanges || 0 }
              ]
            },
            {
              name: 'Y Wing',
              value: safeSum(
                metrics.ywingColumnGroupChanges,
                metrics.ywingRowGroupChanges,
                metrics.ywingRowColumnChanges
              ),
              subDetails: [
                { name: 'Column-Group', value: metrics.ywingColumnGroupChanges || 0 },
                { name: 'Row-Group', value: metrics.ywingRowGroupChanges || 0 },
                { name: 'Row-Column', value: metrics.ywingRowColumnChanges || 0 }
              ]
            }
          ]}
        />
        <MetricCard 
          title="Level 3 Changes"
          value={metrics.levelThreeChanges}
          details={[
            {
              name: 'Guess and Check',
              value: metrics.guessAndCheckChanges
            },
            {
              name: 'Brute Force',
              value: metrics.bruteForceChanges
            }
          ]}
        />
      </div>

      <div className="results-controls">
        <button 
          className="control-button back-button"
          onClick={handleBack}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ResultsPage; 