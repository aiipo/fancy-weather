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

function getLocationURL(geocode) {
  return `${CONFIG.API.geocoding.yandex.url}format=json&results=1&apikey=${CONFIG.API.geocoding.yandex.key}&geocode=${geocode}`;
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

function findLocation(location) {
  return fetch(getLocationURL(location))
    .then(res => res.json())
    .then(result => {
      const data = result.response.GeoObjectCollection.featureMember[0];
      if (data) {
        return {
          ok: true,
          data,
        };
      }
      return {
        code: 1,
        text: location,
      };
    })
    .catch(() => ({
      code: 1,
      text: location,
    }));
}

function getLocation(location) {
  try {
    const {
      GeoObject: {
        Point: { pos },
        metaDataProperty: {
          GeocoderMetaData: {
            Address: {
              Components,
            },
          },
        },
      },
    } = location;
    if (pos) {
      const position = pos.split(' ');
      return {
        ok: true,
        data: {
          latitude: position[1],
          longitude: position[0],
          country_name: Components[0].name,
          city: Components[Components.length - 1].name,
        },
      };
    }
  } catch (e) {
  }
  return {
    code: 1,
    text: location,
  };
}

export {
  getWeatherURL,
  getWeatherIconURL,
  getImageURL,
  getInitialLocation,
  findLocation,
  getLocation,
};
