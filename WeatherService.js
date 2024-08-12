import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&cnt=40&appid=${API_KEY}`);
    const data = response.data.list;

    // Extract the first forecast record for each day
    const dailyForecasts = data.filter((item, index, arr) => {
      const date = new Date(item.dt * 1000).getDate();
      return index === arr.findIndex(i => new Date(i.dt * 1000).getDate() === date);
    });

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};

export default getWeatherByCity;
