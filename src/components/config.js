const CONFIG = {
  proxyURL: 'https://blooming-temple-88289.herokuapp.com/',

  API: {
    geocoding: {
      yandex: {
        url: 'https://geocode-maps.yandex.ru/1.x/?',
      },
    },
    weather: {
      yandex: {
        url: 'https://api.weather.yandex.ru/v1/forecast?',
      },
    },
    maps: {
      yandex: {
        url: 'https://maps.googleapis.com/maps/api/js?',
      },
    },
    images: {
      unsplash: {
        url: 'https://api.unsplash.com/photos/random?',
      },
    },
  },

  languages: {
    ru: 'Russian',
    en: 'English',
    be: 'Belarusian',
  },

  degreeTypes: {
    fahrenheit: 'fahrenheit',
    celsius: 'celsius',
  },

  localStorage: {
    location: 'location',
    lang: 'language',
    degreeType: 'degreeType',
  },

  errorCodes: {
    1: 'location is not find',
  },
};

export default CONFIG;
