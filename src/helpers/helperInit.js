import Core from '../components/core';
import { languages } from '../components/translation';

function initDegreeType() {
  const localType = localStorage.getItem(Core.localStorage.degreeType);
  return localType && Core.degreeTypes[localType]
    ? localType
    : Core.degreeTypes.celsius;
}

function initLanguage() {
  const localLang = localStorage.getItem(Core.localStorage.lang);
  return localLang && languages[localLang]
    ? localLang
    : Object.keys(languages)[0];
}

export {
  initDegreeType,
  initLanguage,
};
