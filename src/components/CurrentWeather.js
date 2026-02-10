import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ data, unit }) => {
  if (!data) return null;

  const { main, weather, name, sys, wind } = data;
  const weatherCondition = weather[0];
  
  // Get weather icon
  const getWeatherIcon = (code) => {
    const icons = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return icons[code] || '🌤️';
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="current-weather">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {name}, {sys.country}
          </h2>
          <div className="date-time">
            <p className="date">{formatDate()}</p>
            <p className="time">{formatTime()}</p>
          </div>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="weather-icon-large">
            {getWeatherIcon(weatherCondition.icon)}
          </div>
          <div className="temperature-info">
            <h1 className="temperature">
              {Math.round(main.temp)}°
            </h1>
            <p className="feels-like">
              Feels like {Math.round(main.feels_like)}°
            </p>
          </div>
        </div>

        <div className="weather-description">
          <h3 className="condition">{weatherCondition.main}</h3>
          <p className="description">{weatherCondition.description}</p>
          <div className="temp-range">
            <span className="high">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m7-7l-7-7-7 7" />
              </svg>
              {Math.round(main.temp_max)}°
            </span>
            <span className="divider">•</span>
            <span className="low">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5m-7 7l7 7 7-7" />
              </svg>
              {Math.round(main.temp_min)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;