import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiStatus, ApiStatusData } from './types';
import CountdownTimer from './CountdownTimer';
import './StatusPage.css';

// List of API names to query for status
const API_NAMES = [
  'accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 
  'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients', 
  'relationships', 'rules', 'templates', 'users', 'workflows'
];

const StatusPage: React.FC = () => {

  // State to store the status of each API
  const [apiStatus, setApiStatus] = useState<ApiStatusData>({});
  
  // Interval duration for fetching API status (in milliseconds)
  const intervalDuration = 15000;

  // Function to construct API URL based on the API name
  const getApiUrl = (apiName: string) => `
    https://api.factoryfour.com/${apiName}/health/status
  `;

  // Function to update the status of a specific API
  const updateApiStatus = (apiName: string, status: ApiStatus) => {
    setApiStatus((prevStatus) => ({
      ...prevStatus,
      [apiName]: { ...status, time: Date.now() },
    }));
  };

  // Function to format time or display 'N/A' if time is not available
  const formatTime = (time?: number) => (
    time ? new Date(time).toLocaleTimeString() : 'N/A'
  );

  useEffect(() => {

    // Function to fetch API status for each API in the list
    const fetchApiStatus = async () => {
      for (const serviceName of API_NAMES) {
        try {

          // Fetch API status using axios
          const response = await axios.get<ApiStatus>(getApiUrl(serviceName));
          
          // Update the status for the specific API
          updateApiStatus(serviceName, response.data);
        } catch (error: any) {

          // Handle errors, mark API as deprecated if necessary
          if (apiStatus[serviceName]?.message === 'API deprecated') {
            updateApiStatus(serviceName, { success: false, message: 'API deprecated', hostname: '' });
          } else {
            updateApiStatus(serviceName, { 
              success: false, message: 'ERROR', hostname: '' 
            });
          }
        }
      }
    };

    // Initial fetch of API status
    fetchApiStatus();

    // Set up interval to fetch API status at regular intervals
    const intervalId = setInterval(fetchApiStatus, intervalDuration);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [apiStatus]);

  // Function to render the status card for a specific API
  const renderApiStatus = (serviceName: string) => (
    <div key={serviceName} className="card">
      <p className="label">{serviceName}</p>
      <p>{apiStatus[serviceName]?.success ? 'HEALTHY' : 'ERROR'}</p>
      <p>Hostname: {apiStatus[serviceName]?.hostname}</p>
      <p>{formatTime(apiStatus[serviceName]?.time)}</p>
    </div>
  );

  // Component rendering
  return (
    <div className="container">
      <h1 className="title">FactoryFour API Status</h1>
      <CountdownTimer interval={intervalDuration} />
      <div className="grid">{API_NAMES.map(renderApiStatus)}</div>
    </div>
  );
};

export default StatusPage;
