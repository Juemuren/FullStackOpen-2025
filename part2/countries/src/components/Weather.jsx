const Weather = ({weather}) => {
  if (Object.keys(weather).length === 0) {
    return (
      <p>Can't get weather</p>
    )
  }
  else {
    return (
      <>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <p>Wind {weather.wind.speed} m/s</p>
      </>
    )
  }
}

export default Weather