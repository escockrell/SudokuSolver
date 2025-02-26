import React, { useState } from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderDetail = (detail) => (
    <div key={detail.name} className="detail-item">
      <div className="detail-header">
        <span>{detail.name}:</span>
        <span className="detail-value">{detail.value}</span>
      </div>
      {detail.subDetails && (
        <div className="sub-details">
          {detail.subDetails.map(subDetail => (
            <div key={subDetail.name} className="sub-detail-item">
              <span>{subDetail.name}:</span>
              <span className="detail-value">{subDetail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="metric-card" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="metric-header">
        <h3>{title}</h3>
        <span className="metric-value">{value}</span>
      </div>
      {isExpanded && (
        <div className="metric-details">
          {details.map(detail => renderDetail(detail))}
        </div>
      )}
      <div className="expand-indicator">
        {isExpanded ? '▼' : '▲'}
      </div>
    </div>
  );
};

export default MetricCard; 