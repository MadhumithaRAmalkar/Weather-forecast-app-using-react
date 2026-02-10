import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import axios from 'axios';

// NOTE: For production, use environment variables
// This is a free OpenWeather API key for demo purposes
const API_KEY = '895284fb2d2c50a520ea537456963d9c';
const API_BASE = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'

  // Get user's location on mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // Get user's current location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Fallback to default city
          fetchWeatherByCity('New York');
        }
      );
    } else {
      // Geolocation not supported, use default city
      fetchWeatherByCity('New York');
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `${API_BASE}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${API_BASE}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      setForecastData(forecastResponse.data);

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');
    setWeatherData(null);
    setForecastData(null);

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `${API_BASE}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${API_BASE}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setForecastData(forecastResponse.data);

      setLoading(false);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
      setLoading(false);
    }
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    
    // Re-fetch data with new unit if we have current weather
    if (weatherData) {
      fetchWeatherByCity(weatherData.name);
    }
  };

  // Update theme colors based on weather condition
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.weather[0].main.toLowerCase();
      updateTheme(condition);
    }
  }, [weatherData]);

  const updateTheme = (condition) => {
    const root = document.documentElement;
    
    const themes = {
      clear: {
        primary: '#F59E0B',
        secondary: '#D97706',
        accent: '#FBBF24',
        bgStart: '#1E3A8A',
        bgEnd: '#3B82F6'
      },
      clouds: {
        primary: '#6B7280',
        secondary: '#4B5563',
        accent: '#9CA3AF',
        bgStart: '#374151',
        bgEnd: '#6B7280'
      },
      rain: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#60A5FA',
        bgStart: '#1E293B',
        bgEnd: '#334155'
      },
      snow: {
        primary: '#E0F2FE',
        secondary: '#BAE6FD',
        accent: '#7DD3FC',
        bgStart: '#0C4A6E',
        bgEnd: '#0369A1'
      },
      thunderstorm: {
        primary: '#A78BFA',
        secondary: '#7C3AED',
        accent: '#C4B5FD',
        bgStart: '#1E1B4B',
        bgEnd: '#3730A3'
      },
      default: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#F59E0B',
        bgStart: '#0F172A',
        bgEnd: '#1E293B'
      }
    };

    const theme = themes[condition] || themes.default;

    Object.keys(theme).forEach(key => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, theme[key]);
    });
  };

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="logo">
              <span className="logo-icon">☀️</span>
              <span className="logo-text">Weather</span>
            </h1>
            <button onClick={toggleUnit} className="unit-toggle">
              {unit === 'metric' ? '°C' : '°F'}
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeatherByCity} onLocationClick={getUserLocation} />

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="loader"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {/* Weather Content */}
        {weatherData && !loading && (
          <>
            <CurrentWeather data={weatherData} unit={unit} />
            <WeatherDetails data={weatherData} unit={unit} />
            {forecastData && <Forecast data={forecastData} unit={unit} />}
          </>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>Powered by OpenWeather API • Built with React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;