import React from 'react';

const CurrentWeather = ({ weather, getWeatherIcon }) => {
  return (
    <div className="current-weather">
      <div className="current-header">
        <h2>{weather.name}</h2>
        <img
          src={getWeatherIcon(weather.weather[0].icon)}
          alt="weather icon"
          className="weather-icon"
        />
      </div>
      <div className="current-details">
        <p>Temperatur: {Math.round(weather.main.temp)}°C</p>
        <p>Väder: {weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;