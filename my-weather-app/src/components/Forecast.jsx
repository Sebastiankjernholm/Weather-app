import React from 'react';

const Forecast = ({ forecast, getWeatherIcon }) => {
  return (
    <div className="forecast-container">
      <h2>Väderprognos (de kommande 5 dagarna)</h2>
      <div className="forecast-row">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <h4>{day.date}</h4>
            <img
              src={getWeatherIcon(day.icon)}
              alt={`Väderikon för ${day.description}`}
              className="weather-icon"
            />
            <p>{day.description}</p>
            <p>Temperatur: {Math.round(day.temp[0])}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;