import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { ApiStatus, ApiStatusData, ApiCheckerOptions } from '../types';

// Custom hook for monitoring the health status of APIs
const useApiChecker = ({ endpoints, url, urlParams, onStatusChange, onLoadingChange, interval }: ApiCheckerOptions) => {
  // Ref to store the latest version of fetchApiStatus
  const fetchApiStatusRef = useRef<() => Promise<void>>();

  // Fetch the status of a single API
  const fetchSingleApiStatus = useCallback(async (serviceName: string): Promise<ApiStatus> => {
    try {
      const response = await axios.get<ApiStatus>(
        `${url}${serviceName}${urlParams}`);
      return { ...response.data, time: Date.now() };
    } catch (error: any) {
      if (error.response && error.response.status === 503) {
        return { success: false, message: 'API deprecated', hostname: '', 
        time: Date.now() };
      } else {
        return { success: false, message: 'ERROR', hostname: '', 
        time: Date.now() };
      }
    }
  }, [url, urlParams]);

  // Fetch the status of all APIs
  const fetchApiStatus = useCallback(async () => {
    try {
      // Fetch the status for all APIs concurrently
      const results = await Promise.all(
        endpoints.map((serviceName) => fetchSingleApiStatus(serviceName)));

      // Create an object to store the results
      const apiStatusResult: ApiStatusData = {};
      
      // Iterate through the results and populate the apiStatusResult object
      results.forEach((result, index) => {
        if (result) {
          apiStatusResult[endpoints[index]] = result;
        }
      });

      // Update the status state with the fetched results
      onStatusChange(apiStatusResult);
    } catch (error) {
      console.error('Error fetching API statuses:', error);
    } finally {
      // Set loading to false after fetching is complete
      onLoadingChange(false);
    }
  }, [endpoints, fetchSingleApiStatus, onLoadingChange, onStatusChange]);

  // Update the ref with the latest version of fetchApiStatus
  fetchApiStatusRef.current = fetchApiStatus;

  // Set up interval to fetch API status at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchApiStatusRef.current?.();
    }, interval);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [interval]);

  // Initial fetch of API status
  useEffect(() => {
    fetchApiStatusRef.current?.();
  }, [fetchApiStatusRef]);
};

export default useApiChecker;
