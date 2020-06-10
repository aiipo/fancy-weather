import React, { createRef, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import CONFIG from '../config';
import './degreeToggle.scss';

function DegreeToggle({ updateForecastDegree, degreeTypes }) {
  const celsius = createRef();
  const fahrenheit = createRef();

  useEffect(() => {
    const checked = localStorage.getItem(CONFIG.localStorage.degreeType);
    if (checked) {
      if (checked === celsius.current.value) {
        celsius.current.classList.add('checked');
      } else {
        fahrenheit.current.classList.add('checked');
      }
    }
  }, []);

  function handleChange(e) {
    updateForecastDegree(e);
    if (e.target.value === degreeTypes.celsius) {
      celsius.current.classList.add('checked');
      fahrenheit.current.classList.remove('checked');
    } else {
      fahrenheit.current.classList.add('checked');
      celsius.current.classList.remove('checked');
    }
  }

  return (
    <div className="degree-toggle">
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="celsius" ref={celsius}>
          <input
            className="form-check-input"
            type="radio"
            name="degree-type"
            id="celsius"
            value={degreeTypes.celsius}
            onChange={handleChange}
          />
          °C
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="fahrenheit" ref={fahrenheit}>
          <input
            className="form-check-input"
            type="radio"
            name="degree-type"
            id="fahrenheit"
            value={degreeTypes.fahrenheit}
            onChange={handleChange}
          />
          °F
        </label>
      </div>
    </div>
  );
}

DegreeToggle.propTypes = {
  degreeTypes: PropTypes.objectOf(string),
  updateForecastDegree: PropTypes.func.isRequired,
};

DegreeToggle.defaultProps = {
  degreeTypes: {
    fahrenheit: 'fahrenheit',
    celsius: 'celsius',
  },
};

export default DegreeToggle;
