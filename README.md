# ☀️ Weather Dashboard

A stunning, production-ready React weather application with real-time weather data, 5-day forecasts, and dynamic theming. Perfect for interviews and learning React fundamentals!

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Axios](https://img.shields.io/badge/Axios-1.6.0-5A29E4)
![OpenWeather API](https://img.shields.io/badge/OpenWeather-API-orange)

## ✨ Features

### 🌤️ **Weather Information**
- **Current Weather** - Real-time temperature, conditions, and weather icons
- **5-Day Forecast** - Daily forecasts with high/low temperatures
- **Detailed Metrics** - Humidity, wind speed, pressure, visibility, cloudiness
- **Dynamic Theming** - Background colors change based on weather conditions

### 🔍 **Search & Location**
- **City Search** - Search any city worldwide
- **Geolocation** - Automatic location detection on load
- **Current Location Button** - Quick access to local weather

### 🎨 **User Interface**
- **Modern Design** - Glassmorphism with bold typography
- **Smooth Animations** - Loading states and transitions
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Temperature Toggle** - Switch between Celsius (°C) and Fahrenheit (°F)

### ⚡ **Performance**
- **Fast Loading** - Optimized API calls
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during data fetch

---

## 🚀 Technologies Used

### Core Stack
- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API requests
- **OpenWeather API** - Real-time weather data

### Key React Concepts
- **useState Hook** - State management
- **useEffect Hook** - Side effects and lifecycle
- **Component Composition** - Modular architecture
- **Props** - Parent-to-child data flow
- **Event Handling** - User interactions
- **Conditional Rendering** - Dynamic UI
- **API Integration** - Async/await patterns

---

## 📁 Project Structure

```
weather-dashboard/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── SearchBar.js        # Search & location component
│   │   ├── SearchBar.css       # Search styles
│   │   ├── CurrentWeather.js   # Main weather display
│   │   ├── CurrentWeather.css  # Current weather styles
│   │   ├── WeatherDetails.js   # Additional metrics
│   │   ├── WeatherDetails.css  # Details card styles
│   │   ├── Forecast.js         # 5-day forecast
│   │   └── Forecast.css        # Forecast card styles
│   ├── App.js                  # Main application logic
│   ├── App.css                 # Main app styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies
└── README.md                   # Documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key (free tier available)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get API Key** (Optional - demo key included)
   - Visit [OpenWeather API](https://openweathermap.org/api)
   - Sign up for free account
   - Generate API key
   - Replace in `src/App.js` line 10

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

---

## 📝 How to Use

1. **On Load** - App automatically detects your location and shows weather
2. **Search City** - Type city name and click "Search"
3. **Use Location** - Click "Current Location" button for local weather
4. **Toggle Units** - Click °C/°F button to switch temperature units
5. **View Forecast** - Scroll through 5-day forecast cards
6. **Check Details** - See humidity, wind, pressure, and more

---
    const weatherResponse = await axios.get(`${API_BASE}/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
    setWeatherData(weatherResponse.data);
    
    const forecastResponse = await axios.get(`${API_BASE}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
    setForecastData(forecastResponse.data);
 



## 🤝 Contributing

Feel free to fork and improve! Suggestions welcome.

---

## 📝 License

This project is open source and available for learning purposes.

---

**Built with ☀️ using React and OpenWeather API**

