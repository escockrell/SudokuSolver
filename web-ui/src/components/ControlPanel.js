import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onReset, onSolve, isSolved }) => {
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
        <button 
          className="control-button details-button" 
          onClick={() => window.location.href = '/results'}
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default ControlPanel; 