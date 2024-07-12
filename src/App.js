import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import { WiDayCloudy } from "react-icons/wi";

function App() {
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null); // 아이콘 상태 추가
  const cities = ['Paris', 'New York', 'Tokyo', "Seoul"];
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY = "06c86b306be5bf0a4796dc774a9fc0d1&units=metric";

  const todayData = () => {
    const week = ['월','화','수','목','금','토','일'];
    let now = new Date();
    let todayMonth = (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    let dayOfWeek = week[now.getDay()];
    return todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일';
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setIcon(data.weather[0].icon); // 아이콘 상태 설정
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setIcon(data.weather[0].icon); // 아이콘 상태 설정
    setLoading(false);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <header className='page-name'>Weather Notification<WiDayCloudy /></header>
      <div>
        {loading ? (
          <div className='container'>
            <ClipLoader color="#f88c6b" loading={loading} size={150} />
          </div>
        ) : (
          <div className='container'>
            <WeatherBox 
              weather={weather} 
              icon={icon} // 아이콘 전달
              date={todayData()} // 날짜 전달
            />
            <WeatherButton 
              cities={cities} 
              setCity={setCity} 
              getCurrentLocation={getCurrentLocation} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
