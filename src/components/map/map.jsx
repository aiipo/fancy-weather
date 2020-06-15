import React from 'react';
import PropTypes from 'prop-types';
import {
  YMaps,
  Map,
  Placemark
} from 'react-yandex-maps';
import TYPES from './types';
import './map.scss';

function MapContainer({ apiKey, options }) {
  return (
    <YMaps enterprise query={{ apikey: apiKey }}>
      <Map
        className="map__yandex"
        state={options}
      >
        <Placemark
          geometry={{ type: TYPES.Geometry.Point, coordinates: options.center }}
        />
      </Map>
    </YMaps>
  );
}

MapContainer.propTypes = {
  apiKey: PropTypes.string.isRequired,
  options: PropTypes.object,
};

MapContainer.defaultProps = {
  options: {
    center: [56.85, 53.2],
    zoom: 8,
  },
};

export default MapContainer;
