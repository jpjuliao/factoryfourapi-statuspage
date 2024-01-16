import { Dispatch, SetStateAction } from 'react';

export interface ApiStatus {
  success: boolean;
  message: string;
  hostname: string;
  time?: number;
}

export interface ApiStatusData {
  [key: string]: ApiStatus;
}

export interface CountdownTimerProps {
  interval: number;
}

export interface DarkModeToggleProps {
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
}

export interface StatusCardGridProps {
  apiStatus: ApiStatusData;
}

export interface HealthCheckerOptions {
  onStatusChange: Dispatch<SetStateAction<ApiStatusData>>;
  onLoadingChange: Dispatch<SetStateAction<boolean>>;
  interval: number; 
}