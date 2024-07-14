import React from 'react';
import './WeatherBox.css'; // 스타일 파일을 import
import { FaLocationDot } from "react-icons/fa6";

const WeatherBox = ({ weather, icon, forecast }) => {
  // 섭씨와 화씨 계산
  const celsius = Math.round(weather?.main.temp);
  const fahrenheit = Math.round((weather?.main.temp * 9 / 5) + 32);

  return (
    <div className='weather-box'>
      {weather ? (
        <>
          <h1><FaLocationDot />{weather.name}</h1>
          <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" /> {/* 아이콘 표시 */}
          <h1>{celsius}°C / {fahrenheit}°F</h1> {/* 섭씨와 화씨 표시 */}
          <h4>{weather.weather[0].description}</h4>
          <div className='forecast-container'>
            {forecast && forecast.slice(1, 3).map((day, index) => (
              <div key={index} className='forecast'>
                <div>{index === 0 ? 'Tomorrow' : 'Day after tomorrow'}</div> 
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" className='forecast-icon' /> 
                <div>{Math.round(day.main.temp)}°C</div>
                
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherBox;
