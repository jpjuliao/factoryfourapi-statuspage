import React, { useState, useCallback } from 'react';
import CountdownTimer from './components/CountdownTimer';
import DarkModeToggle from './components/DarkModeToggle';
import CardsGrid from './components/CardsGrid';
import useApiChecker from './hooks/useApiChecker';
import { ApiStatusData } from './types';
import './StatusPage.css';

// Health check time interval in milliseconds
const API_CHECK_INTERVAL = 15000;

// List of API names to query for status
const API_NAMES = [
  'accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents',
  'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients',
  'relationships', 'rules', 'templates', 'users', 'workflows'
];

const StatusPage: React.FC = () => {

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Callback to handle dark mode change
  const handleDarkModeChange = useCallback((newDarkMode: boolean) => {
    setDarkMode(newDarkMode);
  }, []);

  // State to store the status of each API
  const [apiStatus, setApiStatus] = useState<ApiStatusData>({});
  
  // Use the useApiChecker hook
  useApiChecker({
    url: 'https://api.factoryfour.com/',
    urlParams: '/health/status',
    endpoints: API_NAMES,
    onStatusChange: setApiStatus,
    onLoadingChange: setLoading,
    interval: API_CHECK_INTERVAL,
  });

  // Component render
  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <h1 className="title">FactoryFour API Status</h1>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            <CardsGrid cards={apiStatus} />
            <CountdownTimer interval={API_CHECK_INTERVAL} />
            <DarkModeToggle darkMode={darkMode} 
              onDarkModeChange={handleDarkModeChange} />  
          </>
        )}
      </div>
    </div>
  );
};

export default StatusPage;