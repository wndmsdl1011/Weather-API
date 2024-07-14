import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import { WiDayCloudy } from "react-icons/wi";

function App() {
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [forecast, setForecast] = useState(null); // forecast 상태 추가
  const cities = ['Paris', 'New York', 'Tokyo', "Seoul"];
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY = "06c86b306be5bf0a4796dc774a9fc0d1";

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
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=3&appid=${API_KEY}&units=metric`; // forecast API 수정
    setLoading(true);

    try {
      let [weatherResponse, forecastResponse] = await Promise.all([
        fetch(url),
        fetch(forecastUrl),
      ]);

      let weatherData = await weatherResponse.json();
      let forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setIcon(weatherData.weather[0].icon);
      setForecast(forecastData.list.slice(1, 3)); // 다음날과 모레의 예보 설정
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=${API_KEY}&units=metric`; // forecast API 수정
    setLoading(true);

    try {
      let [weatherResponse, forecastResponse] = await Promise.all([
        fetch(url),
        fetch(forecastUrl),
      ]);

      let weatherData = await weatherResponse.json();
      let forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setIcon(weatherData.weather[0].icon);
      setForecast(forecastData.list.slice(1, 3)); // 다음날과 모레의 예보 설정
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
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
              icon={icon}
              forecast={forecast} // forecast prop 전달
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
