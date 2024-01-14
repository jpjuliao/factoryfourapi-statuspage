import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ApiStatus, ApiStatusData} from './types'
import CountdownTimer from './CountdownTimer';
import './StatusPage.css';

const API_NAMES = [
  'accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients', 'relationships', 'rules', 'templates', 'users', 'workflows'
];

const StatusPage: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatusData>({});
  const intervalDuration = 15000;

  useEffect(() => {

    const fetchApiStatus = async () => {
      for (const apiName of API_NAMES) {
        try {
          
          const response = await axios.get<ApiStatus>(
            `https://api.factoryfour.com/${apiName}/health/status`
          );
          
          const { success, message, hostname, time } = response.data;
          
          setApiStatus(
            prevStatus => (
              { ...prevStatus, [apiName]: { 
                success, message, hostname, time 
              } }
            )
          );

        } catch (error: any) {

          if (error.response && error.response.status === 503) {
            
            setApiStatus(
              prevStatus => (
                { ...prevStatus, [apiName]: { 
                  success: false, 
                  message: 'API deprecated', 
                  hostname: '', time: Date.now() 
                } }
              ));

          } else {

            setApiStatus(prevStatus => (
              { ...prevStatus, [apiName]: { 
                success: false, 
                message: 'ERROR', 
                hostname: '', 
                time: Date.now() 
              } }
            ));

          }

        }
      }
    };

    fetchApiStatus();

    const intervalId = setInterval(fetchApiStatus, intervalDuration);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <h1 className="title">FactoryFour API Status</h1>
      <CountdownTimer interval={intervalDuration} />
      <div className="grid">
        {Object.keys(apiStatus).map(apiName => (
          <div key={apiName} className="card">
            <p className="label">{apiName}</p>
            <p>{apiStatus[apiName]?.success ? 'HEALTHY' : 'ERROR'}</p>
            {/* <p>{apiStatus[apiName]?.message}</p> */}
            <p>Hostname: {apiStatus[apiName]?.hostname}</p>
            <p>{new Date(apiStatus[apiName]?.time).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPage;
