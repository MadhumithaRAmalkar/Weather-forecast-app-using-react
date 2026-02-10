import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = ({ data, unit }) => {
  if (!data) return null;

  const { main, wind, clouds, sys, visibility } = data;

  const details = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
      label: 'Humidity',
      value: `${main.humidity}%`,
      description: 'Moisture level'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
        </svg>
      ),
      label: 'Wind Speed',
      value: `${Math.round(wind.speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`,
      description: 'Current wind'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      label: 'Pressure',
      value: `${main.pressure} hPa`,
      description: 'Air pressure'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      label: 'Visibility',
      value: `${(visibility / 1000).toFixed(1)} km`,
      description: 'Visual range'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      label: 'Cloudiness',
      value: `${clouds.all}%`,
      description: 'Cloud coverage'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
      label: 'UV Index',
      value: 'Moderate',
      description: 'Sun exposure'
    }
  ];

  return (
    <div className="weather-details">
      <h3 className="details-title">Weather Details</h3>
      <div className="details-grid">
        {details.map((detail, index) => (
          <div key={index} className="detail-card" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
            <div className="detail-icon">{detail.icon}</div>
            <div className="detail-info">
              <p className="detail-label">{detail.label}</p>
              <h4 className="detail-value">{detail.value}</h4>
              <p className="detail-description">{detail.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;