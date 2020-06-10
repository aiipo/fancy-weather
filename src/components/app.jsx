import React from 'react';

import ErrorBoundary from './errorBoundary/errorBoundary';
import NotificationContainer from './notificationContainer/notificationContainer';
import Control from './control/control';
import Weather from './weather/weather';
import Loader from './loader/loader';
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
      lang: helperInit.initLanguage(),
      location: {},
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
    const search = event.target.getElementsByClassName('search-input')[0];
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

  render() {
    const {
      degreeType,
      isError,
      errors,
      isInitForecast,
      isForecastLoaded,
      isBackgroundLoaded,
      fullData,
      location,
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
                    />
                    <Weather
                      DATA={fullData}
                      mapToken={process.env.REACT_APP_MAPS_YANDEX}
                      LOCATION={location}
                      degreeType={degreeType}
                      degreeTypes={CONFIG.degreeTypes}
                      isForecastLoaded={isForecastLoaded}
                      updateWeather={this.updateWeather}
                    />
                  </>
                )
            }
            {
              (!isBackgroundLoaded && <Loader />)
                || (!isForecastLoaded && <Loader />)
            }
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
