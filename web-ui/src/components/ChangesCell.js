import React from 'react';
import './ChangesCell.css';

const ChangesCell = ({ value, possibleNumbers, highlightedPossibles, isHighlighted, isStartingNumber }) => {
  return (
    <div className={`changes-cell ${isHighlighted ? 'highlighted' : ''} ${isStartingNumber ? 'starting-number' : ''}`}>
      {value ? (
        <div className="cell-value">{value}</div>
      ) : (
        <div className="possible-numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div 
              key={num} 
              className={`possible-number ${!possibleNumbers[num - 1] ? 'hidden' : ''} ${highlightedPossibles[num - 1] ? 'highlighted' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangesCell; 