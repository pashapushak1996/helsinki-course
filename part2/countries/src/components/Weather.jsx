export const Weather = ({ weather }) => {
    if (!weather) {
        return null;
    }

    const { weather: weatherDataArray, main, wind } = weather;

    return (
        <div>
            <img src={ `https://openweathermap.org/img/wn/${ weatherDataArray[0].icon }.png` } alt=""/>
            <div>temperature: { main.temp } Celsius</div>
            <div>wind: { wind.speed } m/s</div>
        </div>
    );
};