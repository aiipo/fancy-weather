import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherIconURL } from '../../helpers/helper';
import { getDayOfWeekFull } from '../../helpers/helperTime';
import './followingDay.scss';

function FollowingDay({ DATA, convertTemperature, language }) {
  const { day_short: dayShort, night_short: nightShort } = DATA.parts;
  const currentDate = new Date(DATA.date);

  function getAverageTemperature() {
    return Math.round((dayShort.temp + nightShort.temp) / 2);
  }

  return (
    <div className="following-day">
      <div className="following-day__day-of-week">
        <span className="degree">{getDayOfWeekFull(currentDate.getDay(), language)}</span>
      </div>
      <div className="following-day__degree">
        {`${convertTemperature(getAverageTemperature())}°`}
        <div className="following-day__icon">
          <img
            className="icon__condition"
            src={getWeatherIconURL(dayShort.icon)}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

FollowingDay.propTypes = {
  convertTemperature: PropTypes.func.isRequired,
  DATA: PropTypes.object.isRequired,
};

export default FollowingDay;
