import axios from 'axios';

const API_KEY = '5c294d4c17f8f6f38251c1d57ade016e';

const isCoordinate = (location) => {
  return typeof location === 'string' && location.includes(',');
};

const getCurrentWeather = async (location) => {
    try {
      let url = '';
      if (isCoordinate(location)) {
        const [lat, lon] = location.split(',');
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
      }
  
      const response = await axios.get(url);
      
      const currentTemp = Math.round(response.data.main.temp);
  
      return { ...response.data, main: { ...response.data.main, temp: currentTemp } };
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw new Error("Fel vid hämtning av väderdata");
    }
  };

const getForecast = async (location) => {
  try {
    let url = '';
    if (isCoordinate(location)) {
      const [lat, lon] = location.split(',');
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;
    }

    const response = await axios.get(url);
    const groupedForecast = groupForecastByDay(response.data.list);
    return groupedForecast;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw new Error("Fel vid hämtning av prognosdata");
  }
};

const getWeatherByGeo = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather by geo:", error);
    throw new Error("Fel vid hämtning av väderdata med geolocation");
  }
};

const groupForecastByDay = (forecastData) => {
  const days = [];

  forecastData.forEach((dataPoint) => {
    const date = new Date(dataPoint.dt * 1000); 
    const day = date.toLocaleDateString();

    const dayIndex = days.findIndex((dayData) => dayData.date === day);


    if (date.getHours() === 12 || (date.getHours() >= 11 && date.getHours() <= 13)) {
      if (dayIndex === -1) {
        days.push({
          date: day,
          temp: [dataPoint.main.temp],
          icon: dataPoint.weather[0].icon,
          description: dataPoint.weather[0].description,
        });
      } else {
       
        days[dayIndex].temp.push(dataPoint.main.temp);
      }
    }
  });

  return days.slice(0, 5);
};

export { getCurrentWeather, getForecast, getWeatherByGeo };