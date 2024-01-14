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