import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Today from '../today/today';
import FollowingDay from '../followingDay/followingDay';
import * as helperTime from '../../helpers/helperTime';
import './weather.scss';

function Weather({
  DATA,
  degreeType,
  degreeTypes,
  LOCATION,
  isForecastLoaded,
}) {
  const { city, country_name: countryName } = LOCATION;
  const { now_dt, fact, forecasts } = DATA;
  const updatedTime = new Date(Date.parse(now_dt));
  const [curTime, setCurTime] = useState(new Date());
  const [curLocation, setCurLocation] = useState();

  useEffect(() => {
    setInterval(() => setCurTime(new Date()), 1000);
  }, []);

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

  return (
    <div className="weather">
      <div className="weather__title">
        <div className="weather__city">
          {curLocation}
        </div>
        <div className="weather__current-date">{helperTime.getCurrentTime(curTime)}</div>
      </div>
      <div className="weather__forecast">
        <Today DATA={fact} convertTemperature={convertTemperature} />
        <div className="following__days">
          {renderFollowingDays()}
        </div>
      </div>
      <div className="weather__updated-date">Updated: {helperTime.getUpdatedTime(updatedTime)}</div>
    </div>
  );
}

Weather.propTypes = {
  degreeTypes: PropTypes.objectOf(PropTypes.string).isRequired,
};


export default Weather;
