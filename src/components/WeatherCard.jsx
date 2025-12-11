import React from 'react';

/**
 * Stateless WeatherCard component that displays weather information
 * @param {Object} props - Component props
 * @param {string} props.time - Time of the forecast
 * @param {number} props.temp - Temperature in Celsius
 * @param {string} props.description - Weather description
 */
const WeatherCard = ({ time, temp, description }) => {
  return (
    <div className="weather-card">
      <div className="weather-time">{time}</div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-description">{description}</div>
    </div>
  );
};

export default WeatherCard;