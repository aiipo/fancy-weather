import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Today from '../today/today';
import FollowingDay from '../followingDay/followingDay';
import * as helperTime from '../../helpers/helperTime';
import './weather.scss';
import MapContainer from '../map/map';

function Weather({
  DATA,
  mapToken,
  degreeType,
  degreeTypes,
  LOCATION,
  isForecastLoaded,
  updateWeather,
}) {
  const {
    city,
    country_name: countryName,
    latitude,
    longitude,
  } = LOCATION;
  const {
    now_dt,
    fact,
    forecasts,
    info: {
      tzinfo: {
        name: timeZone,
      },
    },
  } = DATA;
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
    if (isForecastLoaded) {
      setCurLocation(getCurrentLocation(countryName, city));
    }
  }, [isForecastLoaded, countryName, city]);

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
          DATA={forecasts[i]}
          convertTemperature={convertTemperature}
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

  return (
    <div className="weather">
      <div className="weather__details details">
        <div className="details__title">
          <div className="weather__city">
            {curLocation}
          </div>
          <div className="weather__current-date">{helperTime.getCurrentTime(curTime)}</div>
        </div>
        <div className="details__forecast forecast">
          <div className="forecast__data days">
            <Today DATA={fact} convertTemperature={convertTemperature} />
            <div className="days__following">
              {renderFollowingDays()}
            </div>
          </div>
        </div>
        <div className="details__updated-date">
          <span>Updated: {helperTime.getUpdatedTime(updatedTime)}</span>
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
          <div className="coordinates__latitude">{`latitude: ${latitude}`}</div>
          <div className="coordinates__longitude">{`longitude: ${longitude}`}</div>
        </div>
      </div>
    </div>
  );
}

Weather.propTypes = {
  degreeTypes: PropTypes.objectOf(PropTypes.string).isRequired,
  updateWeather: PropTypes.func.isRequired,
};


export default Weather;
