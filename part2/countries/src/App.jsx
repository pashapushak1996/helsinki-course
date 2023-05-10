import { useEffect, useState } from "react";
import axios from "axios";

import { Countries } from "./components/Countries.jsx";
import { CountryDetail } from "./components/CountryDetail.jsx";

const BASE_URL = 'https://restcountries.com/v3.1/all';

function App() {
    const [value, setValue] = useState('');
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState(null);

    useEffect(() => {
        axios.get(BASE_URL).then((res) => {
            const countriesFromServer = res.data;

            console.log(countriesFromServer);

            const normalizedCountries = countriesFromServer.map(country => normalizeCountryObject(country));

            setCountries(normalizedCountries)
        });
    }, []);

    const onClickShow = (name) => {
        setCountryName(name);
    }

    const handleInputChange = (value) => {
        setValue(value);
    };

    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(value.toLowerCase()));

    let selectedCountry = null;

    if (countryName) {
        selectedCountry = filteredCountries.find((country) => country.name === countryName);
    }

    if (filteredCountries.length === 1) {
        selectedCountry = filteredCountries[0];
    }


    const countriesToRender = filteredCountries.length < 10
        ? <Countries onClickShow={ onClickShow } countries={ filteredCountries }/>
        : <div>Too many matches, specify another filter</div>;


    return (
        <>
            <input value={ value }
                   onChange={ (e) => handleInputChange(e.target.value) }/>
            {
                selectedCountry
                    ? <CountryDetail country={ selectedCountry }/>
                    : countriesToRender
            }
        </>
    )
}

// Transfer this object
const normalizeCountryObject = (country) => {
    const { name, capital, area, languages, flags } = country;

    return ({
        name: name.common,
        capital: capital ? capital[0] : null,
        area,
        languages: languages ? Object.values(languages) : [],
        flag: { src: flags.png, alt: flags.alt }
    });
}

export default App;
