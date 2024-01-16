import React from 'react';
import { StatusCardGridProps } from '../types';

const StatusCardGrid: React.FC<StatusCardGridProps> = ({ apiStatus }) => {

  // Function to render the status card for a specific API
  const renderApiStatus = (serviceName: string) => (
    <div key={serviceName} className={`
      card ${apiStatus[serviceName]?.success ? 'healthy' : 'error'}
    `}>
      <p className="label">{serviceName}</p>
      <p className="status">
        {apiStatus[serviceName]?.success ? 'HEALTHY' : 'ERROR'}</p>
      {!apiStatus[serviceName]?.success ? (
        <span>OUTAGE<br />403<br />Forbidden</span>
      ) : (
        <p className="hostname">Hostname: {apiStatus[serviceName]?.hostname}</p>
      )}
      <p className="format-time">{formatTime(apiStatus[serviceName]?.time)}</p>
    </div>
  );

  // Function to format time or display 'N/A' if time is not available
  const formatTime = (time?: number) => (
    time ? new Date(time).toLocaleTimeString() : 'N/A'
  );

  // Render the grid of API status cards
  return <div className="grid">{Object.keys(apiStatus).map(renderApiStatus)}</div>;
};

export default StatusCardGrid;
