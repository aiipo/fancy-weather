import CONFIG from '../components/config';

function initDegreeType() {
  const localType = localStorage.getItem(CONFIG.localStorage.degreeType);
  return localType && CONFIG.degreeTypes[localType]
    ? localType
    : CONFIG.degreeTypes.celsius;
}

function initLanguage() {
  const localLang = localStorage.getItem(CONFIG.localStorage.lang);
  return localLang && CONFIG.languages[localLang]
    ? localLang
    : CONFIG.languages.en;
}

export {
  initDegreeType,
  initLanguage,
};
