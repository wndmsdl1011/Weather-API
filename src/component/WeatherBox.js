import React from 'react';
import './WeatherBox.css'; // 스타일 파일을 import
import { FaLocationDot } from "react-icons/fa6";

const WeatherBox = ({ weather, icon, date }) => {
  return (
    <div className='weather-box'>
      {weather ? (
        <>
          <h5>{date}</h5> {/* 날짜 표시 */}
          <h1><FaLocationDot />{weather.name}</h1>
          <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" /> {/* 아이콘 표시 */}
          <h1>{weather.main.temp}°C</h1>
          <h5>{weather.weather[0].description}</h5>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherBox;
