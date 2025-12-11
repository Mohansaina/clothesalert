# Clothes Dry Alert

A React web application that helps you decide when to bring your clothes in from the line based on weather forecasts.

## Features

- Uses browser geolocation to get your current location
- Fetches 5-day weather forecast from OpenWeatherMap API
- Analyzes forecast to predict if rain is expected soon
- Displays weather cards with time, temperature, and description
- Provides a refresh button to update weather data
- Responsive design that works on mobile and desktop

## Tech Stack

- Vite + React (latest stable versions)
- Functional components and React Hooks
- CSS Modules for styling
- OpenWeatherMap API

## Folder Structure

```
/src
  /components
    WeatherCard.jsx
  /services
    weather.js
  App.jsx
  main.jsx
  index.css
vite.config.js
package.json
README.md
```

## How to Install and Run

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

## How to Build

1. Build for production:
   ```
   npm run build
   ```

2. Preview the production build:
   ```
   npm run preview
   ```

## API Key Configuration

For demo purposes, the code includes a placeholder API key `"OPENWEATHER_API_KEY"`.

To use a real API key:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the project root with:
   ```
   VITE_OPENWEATHER_KEY=your_actual_api_key_here
   ```
3. Replace the placeholder in `src/services/weather.js` with:
   ```javascript
   const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || "OPENWEATHER_API_KEY";
   ```

## Implementation Details

### Service Layer Separation
The `weather.js` service separates API logic from UI components for better testability and maintainability.

### Forecast Sampling
The app samples every 8th forecast entry (every 24 hours) to reduce noise and focus on daily summaries. OpenWeatherMap provides forecasts every 3 hours, so 8 entries = 24 hours.

### Error Handling
- Geolocation permissions and errors are handled gracefully
- API errors are caught and displayed to the user
- Loading states provide visual feedback during data fetching

## Potential Improvements

1. **TypeScript**: Add type safety to all components and services
2. **Unit Tests**: Implement tests for components and services
3. **Caching**: Add caching mechanism to reduce API calls
4. **Background Jobs**: Implement a backend scheduler for real alerts
5. **CI/CD**: Set up continuous integration and deployment pipeline
6. **Push Notifications**: Add service workers for real-time alerts

## Commit History

For the interview code walkthrough, the commit history would show:

1. `feat: init vite react app and scaffold App`
2. `feat: add weather service and api integration`
3. `feat: add WeatherCard and rain-alert UI`

## Interview Presentation Script

1. **App Running**: Show the live application detecting location and displaying weather alerts
2. **Folder Structure**: Explain the separation of concerns with components, services, and styling
3. **Weather Service & Logic**: Walk through the API integration and rain detection logic
4. **Commit History**: Demonstrate the incremental development approach with small, focused commits

## Accessibility Considerations

- Buttons are focusable and keyboard navigable
- Sufficient color contrast for readability
- Semantic HTML structure
- Responsive design for various screen sizes