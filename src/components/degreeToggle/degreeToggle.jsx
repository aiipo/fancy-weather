import React, { createRef } from 'react';
import PropTypes, { string } from 'prop-types';
import './degreeToggle.scss';

function DegreeToggle({ updateForecastDegree, degreeTypes }) {
  const celsius = createRef();
  const fahrenheit = createRef();

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
        <label className="form-check-label checked" htmlFor="celsius" ref={celsius}>
          <input
            className="form-check-input"
            type="radio"
            name="degree-type"
            id="celsius"
            value="celsius"
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
            value="fahrenheit"
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
