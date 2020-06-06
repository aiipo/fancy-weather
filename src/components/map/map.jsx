import React from 'react';
import PropTypes from 'prop-types';
import './map.scss';

function Map({ URL, apiKey, options }) {
  function initMap() {

  }

  return (
    <div className="map">
      <script
        async
        defer
        src={`${URL}key=${apiKey}callback=initMap`}
      />
    </div>
  );
}

Map.propTypes = {
};

Map.defaultProps = {
};

export default Map;
