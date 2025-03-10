import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick, text = "Back to Ethan's Portfolio" }) => {
  return (
    <button 
      className="back-button"
      onClick={onClick}
    >
      ← {text}
    </button>
  );
};

export default BackButton; 