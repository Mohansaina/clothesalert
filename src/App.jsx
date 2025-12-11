import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import { fetchFiveDayForecast } from './services/weather';

/**
 * Main App component for Clothes Dry Alert
 * Handles geolocation, weather fetching, and UI rendering
 */
function App() {
  // State management
  const [location, setLocation] = useState(null); // User's location coordinates
  const [forecast, setForecast] = useState([]); // Weather forecast data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error messages
  const [willRainSoon, setWillRainSoon] = useState(false); // Rain prediction flag

  /**
   * Get user's current location using browser geolocation
   */
  const getLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      // Error callback
      (err) => {
        setError(`Unable to retrieve your location: ${err.message}`);
        setLoading(false);
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  };

  /**
   * Fetch weather forecast based on location
   */
  const fetchWeather = async () => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchFiveDayForecast(location.lat, location.lon);
      setForecast(data);
      
      // Check if rain is expected in the near future
      // We look for any forecast entry that contains "rain" in its description
      const rainExpected = data.some(forecastItem => 
        forecastItem.description.includes("rain")
      );
      
      setWillRainSoon(rainExpected);
    } catch (err) {
      setError(`Failed to fetch weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather when location changes
  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  // Initial load - get user location
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Clothes Dry Alert</h1>
      </header>
      
      <main>
        {/* Alert section */}
        <section className="alert-section">
          {loading ? (
            <div className="loading">Loading weather data...</div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button onClick={getLocation}>Retry</button>
            </div>
          ) : (
            <>
              <div className={`alert ${willRainSoon ? 'warning' : 'safe'}`}>
                {willRainSoon 
                  ? "⚠️ Rain expected soon — consider bringing clothes in." 
                  : "No rain in the near forecast."}
              </div>
              
              {/* Refresh button */}
              <div className="controls">
                <button onClick={fetchWeather} disabled={loading}>
                  Refresh
                </button>
              </div>
            </>
          )}
        </section>
        
        {/* Weather forecast cards */}
        {!loading && !error && forecast.length > 0 && (
          <section className="forecast-section">
            <h2>5-Day Forecast</h2>
            <div className="weather-cards">
              {forecast.map((item, index) => (
                <WeatherCard
                  key={item.dt}
                  time={item.time}
                  temp={item.temp}
                  description={item.description}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;