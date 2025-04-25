import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Search from './components/Search';
import { getCurrentWeather, getForecast } from './api/weatherApi';

const getWeatherIcon = (iconId) => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [favorites, setFavorites] = useState([]);

  const fetchWeather = async (location) => {
    try {
      const weatherData = await getCurrentWeather(location);
      const forecastData = await getForecast(location); 

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      fetchWeather(location);
    }
  }, [location]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = (location) => {
    setLocation(location);
  };

  const handleAddToFavorites = (location) => {
    if (!favorites.includes(location)) {
      const updatedFavorites = [...favorites, location];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };


  const handleRemoveFromFavorites = (location) => {
    const updatedFavorites = favorites.filter(fav => fav !== location);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Väderapp</h1>

      {}
      <Search onSearch={handleSearch} />

      {}
      <div>
        <h2>Favoriter</h2>
        <ul>
          {favorites.map((fav, index) => (
            <li key={index}>
              {fav}
              <button onClick={() => handleRemoveFromFavorites(fav)}>Ta bort</button>
            </li>
          ))}
        </ul>

        {}
        <button onClick={() => handleAddToFavorites(location)}>Lägg till i favoriter</button>
      </div>

      {}
      {currentWeather && (
        <CurrentWeather 
          weather={currentWeather} 
          getWeatherIcon={getWeatherIcon} 
        />
      )}

      {}
      {forecast.length > 0 && (
        <Forecast 
          forecast={forecast} 
          getWeatherIcon={getWeatherIcon} 
        />
      )}
    </div>
  );
};

export default App;