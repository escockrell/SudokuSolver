import React from 'react';
import './PortfolioButton.css';

const PortfolioButton = () => {
  return (
    <div className="portfolio-nav">
      <a 
        href="/"
        className="control-button portfolio-button"
      >
        ← Back to Ethan's Portfolio
      </a>
    </div>
  );
};

export default PortfolioButton; 