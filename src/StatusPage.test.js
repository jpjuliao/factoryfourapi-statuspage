import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StatusPage from './App';

// Mock the useApiChecker hook
jest.mock('./hooks/useApiChecker', () => {
  return {
    __esModule: true,
    default: ({ onStatusChange, onLoadingChange }) => {

      // Simulate asynchronous behavior
      setTimeout(() => {
        onStatusChange({ 
          accounts: { 
            success: true, message: 'OK', hostname: '', time: Date.now() 
          } 
        });
        onLoadingChange(false);
      }, 500);

      return {
        // Your mocked hook implementation
      };
    },
  };
});

test('renders API status after loading', async () => {
  render(<StatusPage />);
  
  // Loading spinner should be visible initially
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the loading to complete
  await screen.findByText(/FactoryFour API Status/i, {}, { timeout: 1000 });

  // After loading, check if the API status is rendered
  await waitFor(() => {
    expect(screen.getByText(/Accounts/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/HEALTHY/i)).toBeInTheDocument();
});

test('toggles dark mode when DarkModeToggle is clicked', async () => {
  render(<StatusPage />);
  
  // Wait for the loading to complete
  await screen.findByText(/FactoryFour API Status/i, {}, { timeout: 5000 });

  // Dark mode toggle button should exist
  let toggleButton = screen.getByText(/Switch to Light Mode/i);

  // Click the dark mode toggle button
  fireEvent.click(toggleButton);

  // Check if dark mode is toggled
  expect(document.body.classList.contains('dark-mode')).toBe(true);

  // Click the dark mode toggle button again
  fireEvent.click(toggleButton);

  // Check if dark mode is toggled off
  expect(document.body.classList.contains('dark-mode')).toBe(false);
});
