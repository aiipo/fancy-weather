import React from 'react';
import PropTypes from 'prop-types';
import './today.scss';

function Today({ DATA, convertTemperature }) {
  const {
    temp,
    condition,
    feels_like: feelsLike,
    wind_gust: windGust,
    humidity,
    icon,
  } = DATA;

  return (
    <div className="today">
      <div className="today__degree">
        <span className="degree">{convertTemperature(temp)}</span>
      </div>
      <div className="today__details details">
        <div className="details__icon">
          <div className="icon">
            <img
              className="icon__condition"
              src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${icon}.svg`}
              alt=""
            />
          </div>
        </div>
        <div className="details__forecast forecast">
          <div className="forecast__condition">
            {condition}
          </div>
          <div className="forecast__feels-like">
            {`FEELS LIKE: ${convertTemperature(feelsLike)}°`}
          </div>
          <div className="forecast__wind wind">
            {`WIND: ${windGust} `}<span className="wind__gust">m/s</span>
          </div>
          <div className="details__humidity">
            {`HUMIDITY: ${humidity}`}
          </div>
        </div>
      </div>
    </div>
  );
}

Today.propTypes = {
  convertTemperature: PropTypes.func.isRequired,
};

export default Today;
