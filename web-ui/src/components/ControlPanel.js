import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onReset, onSolve, onViewResults, onViewChanges, isSolved, disabled }) => {
  return (
    <div className="control-panel">
      <button 
        className={`control-button reset-button ${disabled ? 'disabled' : ''}`}
        onClick={onReset}
        disabled={disabled}
      >
        {isSolved ? 'New Puzzle' : 'Reset'}
      </button>
      {!isSolved && (
        <button 
          className={`control-button solve-button ${disabled ? 'disabled' : ''}`}
          onClick={onSolve}
          disabled={disabled}
        >
          Solve
        </button>
      )}
      {isSolved && (
        <>
          <button 
            className={`control-button details-button ${disabled ? 'disabled' : ''}`}
            onClick={onViewResults}
            disabled={disabled}
          >
            View Results
          </button>
          <button 
            className={`control-button changes-button ${disabled ? 'disabled' : ''}`}
            onClick={onViewChanges}
            disabled={disabled}
          >
            View Changes
          </button>
        </>
      )}
    </div>
  );
};

export default ControlPanel; 