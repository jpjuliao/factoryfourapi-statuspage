import React from 'react';
import { CardsGridProps } from '../types';

const CardsGrid: React.FC<CardsGridProps> = ({ cards }) => {

  // Function to render the status card for a specific API
  const rendercards = (serviceName: string) => (
    <div key={serviceName} className={`
      card ${cards[serviceName]?.success ? 'healthy' : 'error'}
    `}>
      <p className="label">{serviceName}</p>
      <p className="status">
        {cards[serviceName]?.success ? 'HEALTHY' : 'ERROR'}</p>
      {!cards[serviceName]?.success ? (
        <span>OUTAGE<br />403<br />Forbidden</span>
      ) : (
        <p className="hostname">Hostname: {cards[serviceName]?.hostname}</p>
      )}
      <p className="format-time">{formatTime(cards[serviceName]?.time)}</p>
    </div>
  );

  // Function to format time or display 'N/A' if time is not available
  const formatTime = (time?: number) => (
    time ? new Date(time).toLocaleTimeString() : 'N/A'
  );

  // Render the grid of API status cards
  return <div className="grid">{Object.keys(cards).map(rendercards)}</div>;
};

export default CardsGrid;
