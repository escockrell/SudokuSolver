import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onReset, onSolve, onViewResults, onViewChanges, isSolved }) => {
  return (
    <div className="control-panel">
      <button 
        className="control-button reset-button" 
        onClick={onReset}
      >
        {isSolved ? 'New Puzzle' : 'Reset'}
      </button>
      {!isSolved && (
        <button 
          className="control-button solve-button" 
          onClick={onSolve}
        >
          Solve
        </button>
      )}
      {isSolved && (
        <>
          <button 
            className="control-button details-button" 
            onClick={onViewResults}
          >
            View Results
          </button>
          <button 
            className="control-button changes-button" 
            onClick={onViewChanges}
          >
            View Changes
          </button>
        </>
      )}
    </div>
  );
};

export default ControlPanel; 