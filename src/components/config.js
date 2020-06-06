const CONFIG = {
  proxyURL: 'https://blooming-temple-88289.herokuapp.com/',

  API: {
    geocoding: {
      yandex: {
        url: '',
        key: '',
      },
    },
    weather: {
      yandex: {
        url: 'https://api.weather.yandex.ru/v1/forecast?',
        key: '',
      },
    },
    maps: {
      google: {
        url: 'https://maps.googleapis.com/maps/api/js?',
        key: '',
      },
    },
    images: {
      unsplash: {
        url: 'https://api.unsplash.com/photos/random?',
        key: '',
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
};

export default CONFIG;
