import React from 'react';
import PropTypes from 'prop-types';

import Search from '../search/search';
import DegreeToggle from '../degreeToggle/degreeToggle';
import UpdateButton from '../updateButton/updateButton';
import DropdownList from '../dropdownMenu/dropdown';
import { getTranslate, languages, translationKeys } from '../translation';
import './control.scss';

function Control({
  CONFIG,
  searchCity,
  updateBackground,
  updateForecastDegree,
  degreeType,
  changeLanguage,
  language,
}) {
  const searchPlaceholder = getTranslate(translationKeys.searchPlaceholder, language);

  function handleChangeLanguage({ target }) {
    if (target.value !== language) {
      changeLanguage(target.value);
    }
  }

  return (
    <div className="control-buttons">
      <div className="control-buttons__settings">
        <UpdateButton update={updateBackground} />
        <DropdownList items={languages} callback={handleChangeLanguage} defaultValue={language} />
        <DegreeToggle
          degreeType={degreeType}
          updateForecastDegree={updateForecastDegree}
          degreeTypes={CONFIG.degreeTypes}
        />
      </div>
      <Search
        search={searchCity}
        searchPlaceholder={searchPlaceholder}
        language={language}
      />
    </div>
  );
}

Control.propTypes = {
  updateForecastDegree: PropTypes.func.isRequired,
  updateBackground: PropTypes.func.isRequired,
  searchCity: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  degreeType: PropTypes.string.isRequired,
  CONFIG: PropTypes.object.isRequired,
};

export default Control;
