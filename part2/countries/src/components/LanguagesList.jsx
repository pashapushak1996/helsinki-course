export const LanguagesList = ({ languages }) => {
    return (
        <ul>
            { languages.map((language) => <li key={ language }>{ language }</li>) }
        </ul>
    )
};