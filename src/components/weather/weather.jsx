import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Today from '../today/today';
import FollowingDay from '../followingDay/followingDay';
import * as helperTime from '../../helpers/helperTime';
import './weather.scss';
import MapContainer from '../map/map';
import { getTranslate, translationKeys } from '../translation';

function Weather({
  data,
  mapToken,
  degreeType,
  degreeTypes,
  location,
  isForecastLoaded,
  updateWeather,
  language,
  translateSentence,
}) {
  const {
    city,
    country_name: countryName,
    latitude,
    longitude,
  } = location;
  const {
    now_dt,
    fact,
    forecasts,
    info: {
      tzinfo: {
        name: timeZone,
      },
    },
  } = data;
  const updatedTime = new Date(Date.parse(now_dt));
  const [curLocation, setCurLocation] = useState();

  const dateLocal = new Date().toLocaleString('en-US', { timeZone });
  const [curTime, setCurTime] = useState(new Date(dateLocal));

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const setCurrentTime = () => setCurTime(new Date(dateLocal));

  useInterval(setCurrentTime, 1000);

  function getCurrentLocation(country, place) {
    return country !== place ? `${place}, ${country}` : country;
  }

  useEffect(() => {
    const translate = async () => {
      const location = await translateSentence(getCurrentLocation(countryName, city));
      setCurLocation(location);
    };
    translate();
  }, [language, location]);

  function convertTemperature(degree) {
    const result = degreeType !== degreeTypes.fahrenheit ? degree : (degree * 9) / 5 + 32;
    return Math.round(result);
  }

  function renderFollowingDays() {
    const result = [];
    const followingDayStartsFrom = 1;
    for (let i = followingDayStartsFrom; i < forecasts.length; i += 1) {
      result.push(
        <FollowingDay
          key={forecasts[i].date_ts}
          data={forecasts[i]}
          convertTemperature={convertTemperature}
          language={language}
        />
      );
    }
    return result;
  }

  function getMapOptions() {
    return {
      center: [latitude, longitude],
      zoom: 7,
    };
  }

  function getMinutesDMS(coordinate) {
    return Math.trunc((Math.abs(coordinate) - Math.floor(coordinate)) * 60);
  }

  function renderLatitude() {
    const degrees = Math.trunc(latitude);
    return `${getTranslate(translationKeys.latitude, language)}: ${degrees}°${getMinutesDMS(latitude)}'`;
  }

  function renderLongitude() {
    const degrees = Math.trunc(longitude);
    return `${getTranslate(translationKeys.longitude, language)}: ${degrees}°${getMinutesDMS(longitude)}'`;
  }

  return (
    <div className="weather">
      <div className="weather__details details">
        <div className="details__title">
          <div className="weather__city">
            {curLocation}
          </div>
          <div className="weather__current-date">{helperTime.getCurrentTime(curTime, language)}</div>
        </div>
        <div className="details__forecast forecast">
          <div className="forecast__data days">
            <Today data={fact} convertTemperature={convertTemperature} language={language} />
            <div className="days__following">
              {renderFollowingDays()}
            </div>
          </div>
        </div>
        <div className="details__updated-date">
          <span>
            {`${getTranslate(translationKeys.updated, language)}: ${helperTime.getUpdatedTime(updatedTime, language)}`}
          </span>
          <span role="presentation" className="update__icon" onClick={updateWeather} />
        </div>
      </div>
      <div className="weather__map map">
        <div className="map__container">
          <MapContainer
            options={getMapOptions()}
            apiKey={mapToken}
          />
        </div>
        <div className="map__coordinates">
          <div className="coordinates__latitude">
            {renderLatitude()}
          </div>
          <div className="coordinates__longitude">
            {renderLongitude()}
          </div>
        </div>
      </div>
    </div>
  );
}

Weather.propTypes = {
  degreeTypes: PropTypes.objectOf(PropTypes.string).isRequired,
  updateWeather: PropTypes.func.isRequired,
  translateSentence: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};


export default Weather;
