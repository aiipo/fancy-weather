import React from 'react';
import PropTypes from 'prop-types';

import Search from '../search/search';
import DegreeToggle from '../degreeToggle/degreeToggle';
import UpdateButton from '../updateButton/updateButton';
import DropdownList from '../dropdownMenu/dropdown';
import './control.scss';

function Control({
  CONFIG,
  searchCity,
  updateBackground,
  updateForecastDegree,
  degreeType,
}) {
  const searchPlaceholder = 'Search city';

  return (
    <div className="control-buttons">
      <div className="control-buttons__settings">
        <UpdateButton update={updateBackground} />
        <DropdownList items={CONFIG.languages} />
        <DegreeToggle
          degreeType={degreeType}
          updateForecastDegree={updateForecastDegree}
          degreeTypes={CONFIG.degreeTypes}
        />
      </div>
      <Search search={searchCity} searchPlaceholder={searchPlaceholder} />
    </div>
  );
}

Control.propTypes = {
  updateForecastDegree: PropTypes.func.isRequired,
  updateBackground: PropTypes.func.isRequired,
  searchCity: PropTypes.func.isRequired,
  degreeType: PropTypes.string.isRequired,
  CONFIG: PropTypes.object.isRequired,
};

export default Control;
