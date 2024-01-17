# FactoryFour Status Page

## Overview

FactoryFour Status Page is a React-based web application designed to monitor the health status of various FactoryFour APIs. The application provides a real-time display of API statuses, allowing users to stay informed about the health of critical services.

## Architecture and Design

### Components

#### StatusPage Component (App.tsx)

The `StatusPage` component serves as the main application component. It manages the loading status, dark mode, and API status. Key features include:

- Loading Status: It displays a loading spinner when the application is fetching API statuses.
- Dark Mode: Users can toggle between light and dark modes for a personalized viewing experience.
- API Status Display: The `CardsGrid` component renders the health status of each API, and the `CountdownTimer` ensures periodic updates.
- Dark Mode Toggle: The `DarkModeToggle` component provides a button to switch between light and dark modes.

#### useApiChecker Hook

The `useApiChecker` hook encapsulates the logic for fetching and updating API statuses. Key functionalities include:

- Asynchronous Fetching: It fetches the status of each API asynchronously using Axios.
- Periodic Updates: The hook employs `useEffect` to periodically update API statuses at a configurable interval.
- Error Handling: Handles API deprecation and general errors gracefully, updating the status accordingly.

### Design Patterns

- Custom Hooks: The application utilizes custom hooks, such as `useApiChecker`, to encapsulate logic and enhance reusability.
- Functional Components: React functional components are employed for a more modular and concise code structure.

## Development Details

- API Names: The list of API names to query for status is stored in the `API_NAMES` constant.
- State Management: React `useState` is used for managing loading, dark mode, and API status states.
- Fetch Timeout Interval: The interval for updating API statuses is defined as a constant (`HEALTH_CHECK_INTERVAL`) in `App.tsx` and passed to the `useApiChecker` hook.

## Testing

Testing is implemented using the `@testing-library/react` library. Test cases include:

- Renders API Status After Loading: Verifies that API statuses are rendered after the loading phase.
- Toggles Dark Mode: Checks whether dark mode toggles correctly when the `DarkModeToggle` component is clicked.


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
