import React from 'react';

import ErrorBoundary from './errorBoundary/errorBoundary';
import NotificationContainer from './notificationContainer/notificationContainer';
import Control from './control/control';
import Weather from './weather/weather';
import Loader from './loader/loader';

import { languages } from './translation';
import CONFIG from './config';
import * as helper from '../helpers/helper';
import * as helperInit from '../helpers/helperInit';
import * as helperTime from '../helpers/helperTime';

import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degreeType: helperInit.initDegreeType(),
      prevLang: helperInit.initLanguage(),
      lang: helperInit.initLanguage(),
      location: {},
      isSentenceTranslated: true,
      isInitForecast: false,
      isForecastLoaded: false,
      isBackgroundLoaded: false,
      imagePage: 1,
      isError: false,
      errors: [],
      fullData: {},
    };
    this.appRef = React.createRef();
  }

  componentDidMount() {
    this.initLocation();
    this.updateWeather();
    this.updateBackgroundImage();
  }

  setErrors(error) {
    const { errors } = this.state;
    errors.push(error);
    this.setState({
      errors,
      isError: true,
    });
  }

  initLocation = () => {
    const getLocation = async () => {
      const location = await helper.getInitialLocation();
      this.setState({
        location,
      });
    };
    getLocation();
  }

  setBackgroundImage = imageUrl => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      this.appRef.current.classList.add('app__background');
      this.appRef.current.style.backgroundImage = `url(${img.src})`;
      const { imagePage } = this.state;
      this.setState({
        isBackgroundLoaded: true,
        imagePage: imagePage + 1,
      });
    };
    img.onerror = () => {
      this.setState({
        isBackgroundLoaded: true,
      });
    };
  }

  updateLocation = location => {
    if (location) {
      const update = async () => {
        const foundLocation = await helper.findLocation(location);
        if (foundLocation.ok) {
          const getLocation = helper.getLocation(foundLocation.data);
          if (getLocation.ok) {
            this.setState({
              isForecastLoaded: false,
              location: getLocation.data,
            }, () => this.updateWeather());
          } else {
            this.setErrors(getLocation);
          }
        } else {
          this.setErrors(foundLocation);
        }
      };
      update();
    }
  }

  searchCity = event => {
    event.preventDefault();
    const search = event.target.getElementsByClassName('search__input')[0];
    if (search && search.value) {
      this.updateLocation(search.value);
    }
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value,
    }, () => localStorage.setItem(CONFIG.localStorage.degreeType, this.state.degreeType));
  }

  getImageURL = () => {
    const date = new Date();
    const { imagePage } = this.state;
    const options = {
      query: {
        season: helperTime.getSeason(date.getMonth()),
        time: helperTime.getTimeOfDay(date.getHours()),
      },
      page: imagePage,
      key: process.env.REACT_APP_IMAGES_UNSPLASH,
    };
    return helper.getImageURL(options);
  }

  updateBackgroundImage = () => {
    this.setState({
      isBackgroundLoaded: false,
    });
    fetch(this.getImageURL())
      .then(res => res.json())
      .then(
        ({ urls: { regular } }) => {
          this.setBackgroundImage(regular);
        },
        error => {
          this.setState({
            isBackgroundLoaded: true,
            error,
          });
        }
      );
  }

  updateWeather = () => {
    const { location: { latitude, longitude } } = this.state;

    this.setState({
      isForecastLoaded: false,
    });

    fetch(CONFIG.proxyURL + helper.getWeatherURL(latitude, longitude), {
      headers: {
        'Access-Control-Allow-Origin': CONFIG.API.weather.yandex.url,
        'X-Yandex-API-Key': process.env.REACT_APP_WEATHER_YANDEX,
      },
    })
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            fullData: data,
            isForecastLoaded: true,
            isInitForecast: true,
          });
        },
        error => {
          this.setState({
            isForecastLoaded: true,
            error,
          });
        }
      );
  }

  changeLanguage = lang => {
    if (languages[lang]) {
      this.setState(state => ({
        prevLang: state.lang,
        lang,
      }), () => localStorage.setItem(CONFIG.localStorage.lang, lang));
    }
  }

  translateSentence = async (sentence) => {
    const { prevLang, lang } = this.state;
    if (sentence && prevLang !== lang) {
      this.setState({
        isSentenceTranslated: false,
      });
      const query = `?key=${process.env.REACT_APP_TRANSLATE_YANDEX}&text=${sentence}&lang=${prevLang}-${lang}`;
      const response = await fetch(CONFIG.API.translate.yandex.url + query);
      const result = await response.json();

      this.setState({
        isSentenceTranslated: true,
      });

      if (result.code === 200) {
        return result.text;
      }
      this.setErrors({
        code: 4,
        text: result.message,
      });
    }
    return sentence;
  }

  render() {
    const {
      degreeType,
      isError,
      errors,
      isSentenceTranslated,
      isInitForecast,
      isForecastLoaded,
      isBackgroundLoaded,
      fullData,
      location,
      lang,
    } = this.state;

    return (
      <div className="app" ref={this.appRef}>
        <ErrorBoundary>
          {
            isError
            && (
              <NotificationContainer
                notifications={errors.map(error => CONFIG.errorCodes[error.code])}
                seconds={7}
              />
            )
          }
          <div className="app__container">
            {
              (isForecastLoaded || isInitForecast)
                && (
                  <>
                    <Control
                      CONFIG={CONFIG}
                      updateForecastDegree={this.updateForecastDegree}
                      updateBackground={this.updateBackgroundImage}
                      searchCity={this.searchCity}
                      degreeType={degreeType}
                      changeLanguage={this.changeLanguage}
                      language={lang}
                    />
                    <Weather
                      DATA={fullData}
                      mapToken={process.env.REACT_APP_MAPS_YANDEX}
                      LOCATION={location}
                      degreeType={degreeType}
                      degreeTypes={CONFIG.degreeTypes}
                      isForecastLoaded={isForecastLoaded}
                      updateWeather={this.updateWeather}
                      language={lang}
                      translateSentence={this.translateSentence}
                    />
                  </>
                )
            }
            {
              ((!isBackgroundLoaded
                || !isForecastLoaded
                || !isSentenceTranslated) && <Loader />)
            }
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
