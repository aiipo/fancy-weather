import React from 'react';
import PropTypes from 'prop-types';
import './today.scss';
import { getTranslate, translationKeys, weatherConditions } from '../translation';

function Today({ data, convertTemperature, language }) {
  const {
    temp,
    condition,
    feels_like: feelsLike,
    wind_gust: windGust,
    humidity,
    icon,
  } = data;

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
            {weatherConditions[condition][language]}
          </div>
          <div className="forecast__feels-like">
            {`${getTranslate(translationKeys.feelsLike, language)}: ${convertTemperature(feelsLike)}°`}
          </div>
          <div className="forecast__wind wind">
            {`${getTranslate(translationKeys.wind, language)}: ${windGust} `}
            <span className="wind__gust">{getTranslate(translationKeys.metrePerSecond, language)}</span>
          </div>
          <div className="details__humidity">
            {`${getTranslate(translationKeys.humidity, language)}: ${humidity}`}
          </div>
        </div>
      </div>
    </div>
  );
}

Today.propTypes = {
  convertTemperature: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default Today;
