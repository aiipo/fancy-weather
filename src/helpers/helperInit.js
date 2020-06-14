import CONFIG from '../components/config';
import { languages } from '../components/translation';

function initDegreeType() {
  const localType = localStorage.getItem(CONFIG.localStorage.degreeType);
  return localType && CONFIG.degreeTypes[localType]
    ? localType
    : CONFIG.degreeTypes.celsius;
}

function initLanguage() {
  const localLang = localStorage.getItem(CONFIG.localStorage.lang);
  return localLang && languages[localLang]
    ? localLang
    : languages.en;
}

export {
  initDegreeType,
  initLanguage,
};
