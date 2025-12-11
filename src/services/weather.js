/**
 * Weather service module
 * Separates API logic from UI components for better testability and maintainability
 * This module handles all interactions with the OpenWeatherMap API
 */

// Placeholder API key - in production, use environment variables
const API_KEY = "OPENWEATHER_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetches 5-day weather forecast from OpenWeatherMap API
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 * @returns {Promise<Array>} Array of simplified forecast objects
 */
export async function fetchFiveDayForecast(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Process the forecast data to extract relevant information
    // We sample every 8th entry (every 24 hours) to reduce noise and focus on daily summaries
    // OpenWeatherMap provides forecasts every 3 hours, so 8 entries = 24 hours
    const sampledForecasts = data.list
      .filter((_, index) => index % 8 === 0) // Sample every 8th entry for daily summaries
      .slice(0, 5) // Take only the first 5 days
      .map(forecast => ({
        dt: forecast.dt, // Unix timestamp
        time: new Date(forecast.dt * 1000).toLocaleString(), // Convert to readable date/time
        temp: Math.round(forecast.main.temp), // Round temperature to nearest integer
        description: forecast.weather[0].description.toLowerCase(), // Lowercase for easier comparison
        icon: forecast.weather[0].icon // Weather icon code
      }));

    return sampledForecasts;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}