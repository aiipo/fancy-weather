import React from 'react';
import PropTypes from 'prop-types';
import './search.scss';

function Search({ search, searchPlaceholder }) {
  return (
    <div className="search-container">
      <input type="text" className="search-input" onChange={search} placeholder={searchPlaceholder} />
      <button type="submit" className="search-button">SEARCH</button>
    </div>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
};

Search.defaultProps = {
  searchPlaceholder: 'Search',
};

export default Search;
