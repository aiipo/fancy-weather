import CONFIG from '../components/config';

function getWeatherURL(latitude = 56.852676, longitude = 53.206891) {
  return `${CONFIG.API.weather.yandex.url}lat=${latitude}&lon=${longitude}&limit=4&hours=false`;
}

function getWeatherIconURL(icon) {
  return `https://yastatic.net/weather/i/icons/blueye/color/svg/${icon}.svg`;
}

function getImageURL(options) {
  const query = Object.values(options.query).join('+');
  const result = `${CONFIG.API.images.unsplash.url}
      orientation=${options.orientation ? options.orientation : 'landscape'}
      &page=${options.page}
      &query=${query}
      &client_id=${options.key}`;
  console.log(`Image: page=${options.page}&query=${query}`);
  return `${result}`;
}

function getLocationByIp() {
  return fetch('https://freegeoip.app/json/')
    .then(response => response.json())
    .catch(err => console.error(err));
}

function getInitialLocation() {
  return new Promise(resolve => {
    if (navigator.geolocation && window.location.protocol === 'https:') {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve(`(${pos.coords.latitude},${pos.coords.longitude})`);
      }, () => resolve(getLocationByIp()));
    } else {
      resolve(getLocationByIp());
    }
  });
}

export {
  getWeatherURL,
  getWeatherIconURL,
  getImageURL,
  getInitialLocation,
};
