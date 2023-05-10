import { useEffect, useState } from "react";

import { Weather } from "./Weather.jsx";
import { LanguagesList } from "./LanguagesList.jsx";
import { weatherApi } from "../services/weather.api.js";


export const CountryDetail = ({ country }) => {
    const { name, area, capital, flag, languages } = country;

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherApi.getWeatherByCity(capital)
            .then((weatherObject) => {
                setWeather(weatherObject);
            });
    }, []);

    return (
        <div>
            <h2>{ name }</h2>
            <p>capital: { capital }</p>
            <p>area: { area }</p>
            <h3>Languages</h3>
            <LanguagesList languages={ languages }/>
            <h3>Weather in { capital }</h3>
            <Weather weather={ weather }/>
            <img src={ flag.src } alt={ flag.alt }/>
        </div>
    );
}