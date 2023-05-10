import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const weatherApi = {
    getWeatherByCity: async (city) => {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        return response.data;
    }
}