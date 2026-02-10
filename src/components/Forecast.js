import React from 'react';
import './Forecast.css';

const Forecast = ({ data, unit }) => {
  if (!data || !data.list) return null;

  // Get one forecast per day (at 12:00 PM)
  const getDailyForecasts = () => {
    const dailyData = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toLocaleDateString('en-US');
      const hour = date.getHours();
      
      // Get forecast around noon (12:00 PM)
      if (hour >= 11 && hour <= 13 && !dailyData[dateStr]) {
        dailyData[dateStr] = item;
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const forecasts = getDailyForecasts();

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

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        {forecasts.map((forecast, index) => (
          <div 
            key={index} 
            className="forecast-card"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <div className="forecast-day">
              <p className="day-name">{getDayName(forecast.dt)}</p>
              <p className="day-date">{getDate(forecast.dt)}</p>
            </div>
            
            <div className="forecast-icon">
              {getWeatherIcon(forecast.weather[0].icon)}
            </div>

            <div className="forecast-temps">
              <div className="temp-high">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14m7-7l-7-7-7 7" />
                </svg>
                <span>{Math.round(forecast.main.temp_max)}°</span>
              </div>
              <div className="temp-low">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 19V5m-7 7l7 7 7-7" />
                </svg>
                <span>{Math.round(forecast.main.temp_min)}°</span>
              </div>
            </div>

            <p className="forecast-description">
              {forecast.weather[0].description}
            </p>

            <div className="forecast-details">
              <div className="forecast-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span>{forecast.main.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2" />
                </svg>
                <span>{Math.round(forecast.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;