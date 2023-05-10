import { Country } from "./Country.jsx";

export const Countries = ({ countries, onClickShow }) => {
    if (countries === null) {
        return null;
    }

    const countriesToRender =
        countries.map((country) =>
            <Country key={ country.name }
                     onShowClick={ ()=>onClickShow(country.name) }
                     country={ country }/>);

    return (
        <div>
            { countriesToRender }
        </div>
    );
};