import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, getCurrentLocation }) => {
  return (
    <div className='weather-button'>
      <Button variant="warning" onClick={getCurrentLocation}>Current Location</Button>
      
      {cities.map((item, index) => (
        <Button key={index} variant='warning' onClick={() => setCity(item)}>{item}</Button>
      ))}
    </div>
  );
};

export default WeatherButton;
