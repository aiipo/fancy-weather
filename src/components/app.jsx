import React from 'react';

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
      isForecastLoaded: false,
      isBackgroundLoaded: false,
      imagePage: 1,
      error: null,
      fullData: {},
    };
    this.appRef = React.createRef();
  }

  componentDidMount() {
    this.updateCurrentLocation();
    this.updateWeather();
    this.updateBackgroundImage();
  }

  updateCurrentLocation = () => {
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

  searchCity = () => {
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
      key: CONFIG.API.images.unsplash.key,
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
    fetch(CONFIG.proxyURL + helper.getWeatherURL(latitude, longitude), {
      headers: {
        'Access-Control-Allow-Origin': CONFIG.API.weather.yandex.url,
        'X-Yandex-API-Key': CONFIG.API.weather.yandex.key,
      },
    })
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            fullData: data,
            isForecastLoaded: true,
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
      isForecastLoaded,
      isBackgroundLoaded,
      fullData,
      location,
    } = this.state;

    return (
      <div className="app" ref={this.appRef}>
        <div className="app__container">
          {
            isForecastLoaded
              ? (
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
                    LOCATION={location}
                    degreeType={degreeType}
                    degreeTypes={CONFIG.degreeTypes}
                  />
                </>
              )
              : <Loader />
          }
          {
            !isBackgroundLoaded && <Loader />
          }
        </div>
      </div>
    );
  }
}

export default App;
