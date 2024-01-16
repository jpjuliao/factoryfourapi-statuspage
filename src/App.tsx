import React, { useState, useCallback } from 'react';
import CountdownTimer from './components/CountdownTimer';
import DarkModeToggle from './components/DarkModeToggle';
import StatusCardGrid from './components/StatusCardGrid';
import useHealthChecker from './hooks/useHealthChecker';
import { ApiStatusData } from './types';
import './StatusPage.css';

// Health check time interval in milliseconds
const HEALTH_CHECK_INTERVAL = 15000;

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
  
  // Use the useHealthChecker hook
  useHealthChecker({
    onStatusChange: setApiStatus,
    onLoadingChange: setLoading,
    interval: HEALTH_CHECK_INTERVAL,
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
            <StatusCardGrid apiStatus={apiStatus} />
            <CountdownTimer interval={HEALTH_CHECK_INTERVAL} />
            <DarkModeToggle darkMode={darkMode} 
              onDarkModeChange={handleDarkModeChange} />  
          </>
        )}
      </div>
    </div>
  );
};

export default StatusPage;