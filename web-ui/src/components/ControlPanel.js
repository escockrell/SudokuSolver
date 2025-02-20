import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onReset, onSolve }) => {
  return (
    <div className="control-panel">
      <button 
        className="control-button reset-button" 
        onClick={onReset}
      >
        Reset
      </button>
      <button 
        className="control-button solve-button" 
        onClick={onSolve}
      >
        Solve
      </button>
    </div>
  );
};

export default ControlPanel; 