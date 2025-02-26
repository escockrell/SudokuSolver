import React from 'react';
import './ChangesCell.css';

const ChangesCell = ({ value, possibleNumbers, isHighlighted, isStartingNumber }) => {
  // Convert possibleNumbers array to array of actual numbers that are possible
  const actualPossibleNumbers = possibleNumbers
    .map((isPossible, index) => isPossible ? index + 1 : null)
    .filter(num => num !== null);

  return (
    <div className={`changes-cell ${isHighlighted ? 'highlighted' : ''} ${isStartingNumber ? 'starting-number' : ''}`}>
      {value ? (
        <div className="cell-value">{value}</div>
      ) : (
        <div className="possible-numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div 
              key={num} 
              className={`possible-number ${actualPossibleNumbers.includes(num) ? '' : 'hidden'}`}
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