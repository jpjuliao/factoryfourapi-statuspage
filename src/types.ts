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

export interface CardsGridProps {
  cards: ApiStatusData;
}

export interface ApiCheckerOptions {
  url: string;
  urlParams: string,
  endpoints: string[];
  onStatusChange: Dispatch<SetStateAction<ApiStatusData>>;
  onLoadingChange: Dispatch<SetStateAction<boolean>>;
  interval: number; 
}